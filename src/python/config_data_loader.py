from elasticsearch import Elasticsearch
from data_functions import process, create_listing_recursive, index_document
from data_processing import create_and_alter_recursive, query_es

# #######################################
# Starting point for data processing
# We're traversing BDRC endpoints
# and creating our own Elasticsearch indices
# #############################################
# Currently a 2 step process
# Step 1
# Create a listing of all items of interest
# Index each item as is into respective indices
# based on type P, W, T, I, G
# bdrc_person, bdrc_work, bdrc_topic, bdrc_item, bdrc_geography
# #############################################
# Step 2
# create an altered FRONTEND index only to be used for UI
# #############################################

# CONFIG OBJECT for elasticsearch
conf_es = {
    "_doc": "_doc",
    "indices": [
        {"type": "work", "name": "bdrc_work", "code": "W"},
        {"type": "item", "name": "bdrc_item", "code": "I"},
        {"type": "topic", "name": "bdrc_topic", "code": "T"},
        {"type": "person", "name": "bdrc_person", "code": "P"},
        {"type": "place", "name": "bdrc_geography", "code": "G"}
    ],
    "development": {
        'host': 'localhost',
        'port': 9200
    },
    "production": {
        'host': None,
        'port': 9200
    }
}
# CONFIG OBJECT for BDRC
conf_bdrc = {
    "endpoint": "http://purl.bdrc.io/resource/",
    "file_type": ".jsonld",
    "works": [
        "bdr:W22677",
        "bdr:W1GS135873",
        "bdr:W1KG5200",
        "bdr:W22344",
        "bdr:W1GS135531",
        "bdr:W1KG1132",
        "bdr:W1KG10720",
        "bdr:W1KG1279",
        "bdr:W1KG14700"
    ],
    "test_works": [
        "bdr:W1KG10720"
    ]
}

# TO BE AUTOMATED
# these are the items retreived from recursive endpoint search
new_persons = [
    'P1631', 'P176', 'P179', 'P276', 'P302', 'P396', 'P4257', 'P431', 'P65', 'P7326', 'P7588', 'P8213'
]
new_topics = [
    'T132', 'T1342', 'T208', 'T2423', 'T3', 'T36', 'T617', 'T819'
]
new_items = [
    'I1GS135531', 'I1GS135873', 'I1KG10720', 'I1KG1132', 'I1KG1279', 'I1KG14700', 'I1KG5200', 'I22344', 'I22677'
]
new_works = ['W19716', 'W23909', 'W2623']
new_work_parts = ['W1GS135531_0001', 'W1GS135531_0002', 'W1GS135531_0003', 'W1GS135531_0004', 'W1GS135531_0005', 'W1GS135531_0006', 'W1GS135531_0007', 'W1GS135531_0008', 'W1GS135531_0009', 'W1GS135531_0010', 'W1GS135531_0011', 'W1GS135531_0012', 'W1GS135531_0013', 'W1GS135531_0014', 'W1GS135531_0015', 'W1GS135531_0016', 'W1GS135531_0017', 'W1GS135531_0018', 'W1GS135531_0019', 'W1GS135531_0020', 'W1GS135531_0021', 'W1GS135531_0022', 'W1GS135873_0001', 'W1GS135873_0016', 'W1KG10720_0001', 'W1KG10720_0025', 'W1KG10720_0047', 'W1KG10720_0068', 'W1KG10720_0089', 'W1KG10720_0115', 'W1KG1132_0001', 'W1KG1132_0008', 'W1KG1132_0022', 'W1KG1132_0039', 'W1KG1132_0051', 'W1KG1132_0073', 'W1KG1132_0081', 'W1KG1132_0096', 'W1KG1132_0102', 'W1KG1132_0106', 'W1KG1132_0111', 'W1KG14700_S0001', 'W1KG14700_S0002', 'W1KG14700_S0003', 'W1KG14700_S0004', 'W1KG14700_S0005', 'W1KG14700_S0006', 'W1KG14700_S0007', 'W1KG14700_S0008', 'W1KG14700_S0009', 'W1KG14700_S0010'
]

# create ES client
env = "production"
client = Elasticsearch(
    [conf_es[env]],
    sniff_on_start=True,
    # refresh nodes after a node fails to respond
    sniff_on_connection_fail=True,
    # and also every 60 seconds
    sniffer_timeout=60
)


# STEP 1, create the as-is indices
# create listing of all json documents and referenced documents
# all_listing = create_listing_recursive(new_topics, conf_bdrc)
# print(all_listing)
# load data
# process(all_listing, client, conf_es, conf_bdrc)

# STEP 2, create the frontend index for UI
update_index = "frontend"
if client.indices.exists(update_index):
    client.indices.delete(update_index)
indexed_list = []
all_listing, indexed_list, diff = create_and_alter_recursive(conf_bdrc, new_items, indexed_list, client)


# print("NEW LIST TO INDEX", all_listing)
# print("AND INDEXED!", indexed_list)
# print("DIFF!", diff)
