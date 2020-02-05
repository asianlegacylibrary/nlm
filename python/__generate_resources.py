from generate_acip_schema import GenerateDocument
from _utils import make_unique, get_json
import logging
from elasticsearch import helpers


# ####################
# 1. attempt loading BDRC document
# 2. if document, go through new BDRC graph structure (grab Notes, AgentAsCreator, and Root)
# 3. crawl the document, recursively adding additional nodes to _resources
# 4. if workHasItem, then attempt loading manifest to get URL and first image of series
# 5. finally, index recreated document to ElasticSearch
# ---- assign appropriate index based on BDRC type (W, I, G, P, T)
# RETURN
# ---- return unique listing of all _resources found during crawl (to be used for next iteration)
# ####################
def generate_listing(conf_bdrc, list_to_traverse, index_json=False, es_instance=None, level=None, collection=None):

    print("Creating recursive listing from ", list_to_traverse)
    full_listing = []

    # loop over initial works
    for i, d in enumerate(list_to_traverse):
        document_instance = GenerateDocument(d, conf_bdrc, level, collection, fetch_iiif=True)

        if len(document_instance.related_ids) > 0:
            full_listing.extend(document_instance.related_ids)

        if document_instance.document is not None and document_instance.index_name is not 'invalid':
            if index_json:
                es_instance.direct_index(document_instance.document, document_instance.index_name)
                # printing on same line, replacing as it goes, \r goes at beginning
                print("\r Indexing document: {0}".format(i+1), flush=True, end="")

    print("\n Successful completion of indexing...")
    unique_listing = make_unique(full_listing)

    return unique_listing


def bulk_index(conf_bdrc, list_to_traverse, index_json=False, client=None, level=None, collection=None, chunk=500):
    try:
        helpers.bulk(
            client,
            yield_listing(conf_bdrc, list_to_traverse, index_json, client, level, collection),
            chunk_size=chunk
        )
    except helpers.BulkIndexError as Bulk_Error:
        logging.error(f"Bulk error {Bulk_Error}")
        pass


def yield_listing(conf_bdrc, list_to_traverse, index_json=False, client=None, level=None, collection=None):
    print("Testing yield for performance", list_to_traverse)
    full_listing = []

    for document, doc_number, i in get_json(list_to_traverse):
        doc_instance = GenerateDocument(doc_number, conf_bdrc, level, collection, document=document, fetch_iiif=True)

        # print('generated index', doc_instance.metadata)
        # check_index(client, doc_instance.metadata["index"])

        if len(doc_instance.related_ids) > 0:
            full_listing.extend(doc_instance.related_ids)

        if i % 100 == 0:
            print("ABOUT TO YIELD ", i)

        if index_json:
            if doc_instance.document is not None:
                yield {
                    "_id": doc_instance.id_acip,
                    "_index": doc_instance.metadata['index'],
                    "_source": doc_instance.document
                }
