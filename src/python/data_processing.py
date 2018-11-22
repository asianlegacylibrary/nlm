import json
import urllib.request as url
import elasticsearch
import copy # for deep copy

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
def index_document(direct, index, es, document, doc_id, config):
    if direct:
        es.index(
            index=index,
            doc_type=config["_doc"],
            body=json.load(url.urlopen(document)),
            id=doc_id
        )
    else:
        es.index(
            index=index,
            doc_type="_doc",
            body=json.dumps(document),
            id=doc_id
        )

    print("Indexing", doc_id)


# #######################################
# DATA PROCESSING
# #######################################
def list_item(item):
    doc_number = item.split(":")[1] if item.split(":")[0] == "bdr" else item
    dic = {
        "code": doc_number[:1],
        "item": doc_number
    }
    return dic


def create_item(item, leaf_key=None, resp=None):
    doc_number = item.split(":")[1] if item.split(":")[0] == "bdr" else item
    if resp is None and leaf_key is None:
        dic = {
            "code": doc_number[:1],
            "item": doc_number
        }
    else:
        dic = {
            "code": doc_number[:1],
            "item": doc_number,
            "key": leaf_key,
            "data": resp
        }
    return dic


# #######################################
# CREATE INITIAL LISTING TO INDEX
def create_and_alter_recursive(conf_bdrc, current_list, indexed_list, client):

    print("Creating recursive listing and updating json...")
    full_listing = []

    # loop over initial works
    for d in current_list:
        doc_number = d.split(":")[1] if d.split(":")[0] == "bdr" else d

        # load the json document
        document = json.load(url.urlopen(
            conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"])
        )

        # new empty list to send to traverse
        json_results_listing = []

        # traverse the json, update it, and create new listings to be traversed
        additional_listing, updated_document = walk_and_update(document,
                                                           json_results_listing,
                                                           orig=document,
                                                           client=client,
                                                           doc_number=doc_number)
        full_listing.extend(additional_listing)

        # print("to add", to_add)
        print(doc_number, "UPDATED DOCUMENT", updated_document)

        # 1. index the updated json
        update_index = "bdrc_item"
        index_document(False, update_index, client, updated_document, doc_number, "_doc")
        # 2. add item to 'indexed' listing
        indexed_list.append(list_item(d))

    # check if listing item is already in the list
    # temp_data = [i for n, i in enumerate(ll) if i not in ll[n + 1:]] // LIST COMPREHENSION
    unique_listing = []
    # full_listing = sorted(full_listing, key=lambda k: k['item'])
    for n, i in enumerate(full_listing):
        if i["item"][1].isdigit():
            if i not in full_listing[n + 1:]:
                unique_listing.append(i)

    new_list = sorted(unique_listing, key=lambda k: k['item'])
    indexed_list = sorted(indexed_list, key=lambda k: k['item'])
    print("CURRENT INDEX", indexed_list)
    diff = [x for x in new_list if x not in indexed_list]
    diff = [d['item'] for d in diff if 'item' in d]
    # if len(diff) > 1:
    #     new_list, indexed_list, diff = create_and_alter_recursive(conf_bdrc, diff, indexed_list, client)

    return new_list, indexed_list, diff


# #######################################
# TRAVERSE JSON DOCUMENT
# Inputs:
# - node, json document
# - doc_listing, an empty list to add dictionaries { code, item } to
# #######################################
def walk_and_update(node, doc_listing, previous_key=None, orig=None, client=None, doc_number=None):
    # if node is a dictionary
    node = copy.deepcopy(node)
    if isinstance(node, dict):
        for key, item in node.items():
            if isinstance(item, (dict, list)):
                walk_and_update(item, doc_listing, key, orig, client, doc_number)
            else:
                # skip over the admin, adm
                if key[:3] != "adm":
                    # if we find a string that begins with bdr
                    if type(item) == str:
                        # ADD ability to alter document here.
                        if item.split(":")[0] == "bdr":
                            if item[4] in ["W", "T", "P", "G", "I"]:

                                resp = query_es(item, client)
                                # print(key)
                                new_item_data = create_item(item, key, resp)
                                new_item = list_item(item)
                                doc_listing.append(new_item)
                                # ALTER ORIGINAL DOC
                                # new_list.append(new_item)
                                orig[key] = new_item_data

    elif isinstance(node, list):
        for i, n in enumerate(node):
            if isinstance(n, (dict, list)):
                walk_and_update(n, doc_listing, n, orig, client, doc_number)
            else:
                if type(n) == str:
                    if n.split(":")[0] == "bdr":
                        if n[4] in ["W", "T", "P", "G", "I"]:

                            # print(previous_key)
                            resp = query_es(n, client)
                            new_item_data = create_item(n, previous_key, resp)
                            new_item = list_item(n)
                            doc_listing.append(new_item)
                            # ALTER ORGINAL DOC
                            # new_list.append(new_item)
                            orig[previous_key] = new_item_data
    else:
        print("NOT ITERABLE", node)

    return doc_listing, orig

# must add the other items of interest here
# G, geography // I, items
def query_es(item, client):
    item = item.split(":")[1] if item.split(":")[0] == "bdr" else item
    # d = create_item(item)
    doc_type = item[:1]
    source = None

    index = "bdrc_"
    if doc_type == "W":
        # WORK
        index = index + "work"
        source = ["@id"]
    if doc_type == "T":
        # TOPIC
        index = index + "topic"
        source = ["skos:prefLabel"]
    elif doc_type == "P":
        # PERSON
        index = index + "person"
        source = ["personName", "personEvent", "personGender"]
    try:
        response = client.get(index=index, id=item, doc_type="_doc", _source=source)
        return response["_source"]
    except elasticsearch.TransportError as e:
        # print('error', item)
        return None
