import json
import urllib
from itertools import groupby
from operator import itemgetter

import elasticsearch

# #######################################
# ELASTICSEARCH
# #######################################


# RECREATE INDEX
def recreate_index(doc_type, es, config):
    if es.indices.exists(config["indices"][doc_type]):
        print("Recreating INDEX", config["indices"][doc_type])
        es.indices.delete(config["indices"][doc_type])
        es.indices.create(config["indices"][doc_type])


# #######################################
# INDEX DATA
def index_document(index, es, document, doc_id, config):
    try:
        # urllib.request.urlopen(document)
        es.index(
            index=index,
            doc_type=config["_doc"],
            body=json.load(urllib.request.urlopen(document)),
            id=doc_id
        )
        print("Indexing", doc_id)
    except urllib.error.HTTPError as e:
        print("skipping ", doc_id, ". URL not found.")


# #######################################
# DATA PROCESSING
# #######################################


# #######################################
# GROUP TYPES AND INDEX
def process(data, client, conf_es, conf_bdrc):

    sorted_types = sorted(data, key=itemgetter("code"))
    for key, group in groupby(sorted_types, key=lambda x: x["code"]):
        for d in conf_es['indices']:
            if key in d['code']:
                # ok we've checked and there's a key!
                type_list = [d['item'] for d in list(group)]
                print(type_list)
                # set index
                index = d["name"]
                for item in type_list:
                    bdrc_url = conf_bdrc["endpoint"] + item + conf_bdrc["file_type"]
                    index_document(index, client, bdrc_url, item, conf_es)


# #######################################
# TRAVERSE JSON DOCUMENT
# Inputs:
# - node, json document
# - doc_listing, an empty list to add dictionaries { code, item } to
# #######################################
def walk(node, doc_listing):
    # if node is a dictionary
    if isinstance(node, dict):
        for key, item in node.items():
            if isinstance(item, (dict, list)):
                walk(item, doc_listing)
            else:
                # skip over the admin, adm
                if key[:3] != "adm":
                    # if we find a string that begins with bdr
                    if type(item) == str:
                        # ADD ability to alter document here.
                        if item.split(":")[0] == "bdr":
                            doc_listing.append(add_item(item, key))

    elif isinstance(node, list):
        for i, n in enumerate(node):
            if isinstance(n, (dict, list)):
                walk(n, doc_listing)
            else:
                if type(n) == str:
                    if n.split(":")[0] == "bdr":
                        doc_listing.append(add_item(n, node[i-1]))
    else:
        print("NOT ITERABLE", node)

    return doc_listing



def add_item(item, leaf_key):
    doc_number = item.split(":")[1]
    dic = {"code": doc_number[:1], "item": doc_number, "key": leaf_key}
    return dic


# #######################################
# CREATE INITIAL LISTING TO INDEX
def create_listing_recursive(listing, conf_bdrc):

    print("Creating recursive listing...")
    ll = []
    crawled = []

    # loop over initial works
    for d in listing:
        doc_number = d.split(":")[1] if d.split(":")[0] == "bdr" else d

        # load the json document
        # this requires json to be loaded twice, rewrite for final app
        document = json.load(urllib.request.urlopen(
            conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"])
        )
        # add doc to crawled list, list of docs that have been loaded
        crawled.append(doc_number)
        json_results_listing = []

        additional_listing = walk(document, json_results_listing)
        ll.extend(additional_listing)

    # temp_data = [i for n, i in enumerate(ll) if i not in ll[n + 1:]]
    temp_data = []
    for n, i in enumerate(ll):
        if i not in ll[n + 1:]:
            if i["item"][1].isdigit():
                temp_data.append(i)

    # TO CRAWL ENTIRETY #####################################
    # check if temp_data = data, convert both to set to check
    # if it does NOT then call create_listing again
    # when temp_data = data, then exit

    # compare 'crawled' vs. 'walked'

    data = sorted(temp_data, key=lambda k: k['item'])

    return data
