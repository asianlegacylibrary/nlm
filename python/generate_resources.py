import json
import urllib
from socket import timeout
from http.client import IncompleteRead
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
    for i, d in enumerate(list_to_traverse):
        document = None
        doc_number = d.split(":")[1] if d.split(":")[0] == "bdr" else d
        making_some_attempts = 0
        while making_some_attempts < 10:
            try:
                document = json.load(urllib.request.urlopen(
                    conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"])
                )
                making_some_attempts = 10
            except IncompleteRead as Incomplete_error:
                logging.error(f"error during chunk read {Incomplete_error}")
                making_some_attempts += 1
                continue
            except timeout as Timeout_error:
                logging.error(f"socket timeout {Timeout_error}")
                making_some_attempts += 1
                continue
            except urllib.error.HTTPError as HTTP_error:
                logging.error(f"error during url request {HTTP_error.code}")
                making_some_attempts += 1
                continue
            except urllib.error.URLError as URL_error:
                logging.error(f"error during url request {URL_error}")
                making_some_attempts += 1
                continue
            break

        # new empty list to send to traverse
        endpoint_results_listing = []

        if document is not None:
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

                if 'skos:prefLabel' in document:
                    document['_label'] = inject_pref_label(document['skos:prefLabel'])

                if 'workHasItemImageAsset' in document:
                    manifest = get_manifest(document)
                    first_image = get_first_image_url(manifest)
                    document['_manifestURL'] = manifest
                    document['_firstImageURL'] = first_image

                direct_index(document, client, collection)

            # printing on same line, replacing as it goes, \r goes at beginning
            print("\r Indexing document: {0}".format(i+1), flush=True, end="")

    print("\n Successful completion of indexing...")
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


# ####################
# Test for bdr prefix
# and schema type
# ####################
def test_for_identifier(s):
    if type(s) == str:
        if s.split(":")[0] == "bdr":
            if s[4] in ["W", "T", "P", "I", "G"]:
                if s[5].isdigit():
                    return True


# ####################
# Add label to document using skos:prefLabel
# ####################
def inject_pref_label(node):
    label = None
    # if node is a dictionary
    if isinstance(node, dict):
        for key, value in node.items():
            if key == '@value':
                label = value
    elif isinstance(node, list):
        for item in node:
            if isinstance(item, dict):
                label = next((item["@value"] for k, v in item.items() if v == "en" or "bo-x-ewts"), None)

    return label
