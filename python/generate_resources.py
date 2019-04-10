import json
import urllib
import copy
import logging
from es_indexing import direct_index

from generate_IIIF import get_manifest, get_first_image_url


# ####################
# Crawl the document, recursively
# ####################
def generate_listing(conf_bdrc, list_to_traverse, index_json=False, client=None, level=None, collection=None):

    print("Creating recursive listing from ", list_to_traverse)
    full_listing = []

    # loop over initial works
    for d in list_to_traverse:
        doc_number = d.split(":")[1] if d.split(":")[0] == "bdr" else d

        try:
            document = json.load(urllib.request.urlopen(
                conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"])
            )
        except urllib.error.HTTPError as HTTP_error:
            logging.error(f"error during url request {HTTP_error.code}")
            continue
        except urllib.error.URLError as URL_error:
            logging.error(f"error during url request {URL_error}")
            continue

        # new empty list to send to traverse
        endpoint_results_listing = []

        additional_listing = walk(document,
                                  endpoint_results_listing,
                                  doc_number=doc_number,
                                  previous_key=None)

        full_listing.extend(additional_listing)

        if index_json:
            # add leaf of all linked resources
            document['_resources'] = make_unique(additional_listing)
            document['_distance'] = level
            # if level == 0:
            document['_collection'] = collection

            if 'workHasItemImageAsset' in document:
                manifest = get_manifest(document)
                first_image = get_first_image_url(manifest)
                document['_manifestURL'] = manifest
                document['_firstImageURL'] = first_image

            direct_index(document, client, collection)

    unique_listing = make_unique(full_listing)

    return unique_listing


# ####################
# take an array, sort and unique-fy
# ####################
def make_unique(listing):
    full_listing = sorted(listing)
    unique_listing = []
    for n, item in enumerate(full_listing):
        if item not in full_listing[n + 1:]:
            unique_listing.append(item)

    return unique_listing


# ####################
# Crawl the document, recursively
# ####################
def walk(document, results_listing, previous_key=None, doc_number=None):
    # make a copy, this might not be necessary anymore since not altering document
    node = copy.deepcopy(document)
    # if node is a dictionary
    if isinstance(node, dict):
        for key, item in node.items():
            # if value is also a dict or list, recurse
            if isinstance(item, (dict, list)):
                walk(item, results_listing, previous_key=key, doc_number=doc_number)
            else:
                if test_for_identifier(item):
                    results_listing.append(item)

    # if node is a list
    elif isinstance(node, list):
        for i, n in enumerate(node):
            # if value is a dict or list, recurse
            if isinstance(n, (dict, list)):
                walk(n, results_listing, previous_key=n, doc_number=doc_number)
            else:
                if test_for_identifier(n):
                    results_listing.append(n)

    else:
        logging.error(f"Not Iterable {node}")

    return results_listing


def test_for_identifier(s):
    if type(s) == str:
        if s.split(":")[0] == "bdr":
            if s[4] in ["W", "T", "P", "I", "G"]:
                if s[5].isdigit():
                    return True
