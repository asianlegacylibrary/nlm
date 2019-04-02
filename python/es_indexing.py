import json
import urllib
import logging
from elasticsearch import Elasticsearch, helpers, RequestError, TransportError  # , NotFoundError
from config.config import conf_es, conf_bdrc


def create_es_client(env):
    return Elasticsearch(
        [conf_es[env]],
        sniff_on_start=True,
        # refresh nodes after a node fails to respond
        sniff_on_connection_fail=True,
        # and also every 60 seconds
        sniffer_timeout=60
    )


def check_index(client, i):
    if not client.indices.exists(i):
        print("Creating INDEX", i)
        client.indices.create(i)


def get_json(current_listing):
    for i, d in enumerate(current_listing):

        doc_number = d.split(":")[1] if d.split(":")[0] == "bdr" else d
        # print(conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"])

        try:
            yield json.load(
                urllib.request.urlopen(
                    conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"]
                )
            ), doc_number, i
        except urllib.error.HTTPError as e:
            logging.error(f"error HTTP {e.code}")
            pass
        except urllib.error.URLError as e:
            logging.error(f"error during url request {e}")
            pass
        except urllib.error.ProtocolError as e:
            logging.error(f"error, probably while receiving data {e}")
            pass
        except urllib.error.ReadTimeoutError as e:
            logging.error(f"error, reading from server {e}")
            pass


def indexing_items(current_listing, client):
    for f, doc_number, i in get_json(current_listing):

        index_name = assign_index(doc_number, conf_es["index_prefix"])
        # print("indexing document to:", index_name, doc_number, f)
        check_index(client, index_name)

        if i % 100 == 0:
            print("ABOUT TO YIELD ", i)

        yield {
            "_id": doc_number,
            "_index": index_name,
            "_type": conf_es["type"],
            "_source": f
        }


def bulk_index(client, current_listing, chunk):
    try:
        helpers.bulk(client, indexing_items(current_listing, client), chunk_size=chunk)
    except helpers.BulkIndexError as Bulk_Error:
        logging.error(f"Bulk error {Bulk_Error}")
        pass


# example of switch case in python
def assign_index(x, index_prefix):
    key = x[0]
    index_name = index_prefix
    return {
        'W': index_name + "work",
        'I': index_name + "item",
        'P': index_name + "person",
        'G': index_name + "geography",
        'T': index_name + "topic"
    }.get(key, "invalid")


# ####################
# Direct index of main works to a FrontEnd index specifically for the UI
# need to work on how to create this, but for now there's a _resources leaf
# with all bdr: ID's that resource needs
# ####################
def direct_index(doc, client):
    # print('DIRECT INDEX of', doc['@id'])
    doc_number = doc['@id'].split(":")[1] if doc['@id'].split(":")[0] == "bdr" else doc['@id']
    index_name = assign_index(doc_number, conf_es["index_prefix"])
    try:
        client.index(
                    index=index_name,
                    doc_type=conf_es["type"],
                    body=json.dumps(doc),
                    id=doc['@id']
                )
    except RequestError as e:
        logging.error(f"Request Error during index {e}")
        pass
    except TransportError as e:
        logging.error(f"Transport Error during index {e}")
        pass


def recreate_indices(client):
    wild_card_indices = conf_es["index_prefix"] + "*"
    target_indices = client.indices.get_alias(wild_card_indices)
    for i in target_indices:
        print("Deleting index", i)
        client.indices.delete(i)
