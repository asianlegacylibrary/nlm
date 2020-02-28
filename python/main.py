import os
from generate_acip_schema import ElasticSearch, GoogleSheets, GenerateDocument
from config.elasticsearch import conf_es
from config.gs import conf_gs
from config.bdrc import conf_bdrc
from config.ssh import conf_ssh
from _utils import get_listing_by_type, configure_logger, get_xml


configure_logger()

# Current Directory
current_dir = os.getcwd()

# ES #########################################
environment = "production"
es_instance = ElasticSearch(conf_es, environment)

# GS #########################################
# once we've indexed the data, we write the _resources (next branch) to GS for reference
# authorize GS and get workbook
gs = GoogleSheets(conf_gs)

# when Travis uploads, run the get_xml function from _utils to download from server
xml_path = get_xml(conf_ssh)
# xml_path = os.path.join(current_dir, 'data', 'synced-202002070015.xml')

which_collection = 5
# es_instance.recreate_indices(collection=which_collection)
# this returns listing of items NOT currently indexed in ES, and ES listing
[current_listing, es_collection] = get_listing_by_type('xml', es_instance,
                                                       file=xml_path, es_collection_version=which_collection)

# [current_listing, es_collection] = get_listing_by_type('resources', es_instance,
#                                                        es_collection_version=which_collection)

if len(current_listing) == 0:
    print("Nothing to index")
    quit()

print(f"current listing to be indexed, {len(current_listing)} {current_listing}")
distance = 0
index_json = True
full_listing = []
for i, d in enumerate(current_listing):
    document_instance = GenerateDocument(d, conf_bdrc, distance, which_collection, fetch_iiif=True)

    if document_instance.document is not None and document_instance.index_name is not 'invalid':
        if '_resources' in document_instance.document:
            full_listing.extend(document_instance.document['_resources'])
        if index_json:
            es_instance.direct_index(document_instance.document, document_instance.index_name)
            # printing on same line, replacing as it goes, \r goes at beginning
            print("\r Indexing document: {0}, with id: {1}".format(i, document_instance.id), flush=True, end="")

next_branch = f"Branch_{distance + 1}"
gs.write_listing(data=full_listing, ws=next_branch)  # write to GS, in case error
print(f"Next branch will have {len(full_listing)} leaves...")
