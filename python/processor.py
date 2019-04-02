# from collections import defaultdict
import logging
import sys
from config.print_logger import Logger
from config.config import conf_bdrc, conf_gs, conf_log
from generate_resources import generate_listing
from gs_data_store import get_googlesheet_data, authorize_gs, write_googlesheet_data, get_workbook
from es_indexing import create_es_client, bulk_index, recreate_indices

# #######################################
# Starting point for data processing
# We're traversing BDRC endpoints
# and creating our own Elasticsearch indices
# #############################################
#
# STEP 0, INITIAL WORKS
# get list of bdrc items from google sheet
# this sheet maintained by Gordon
#
# STEP 1, GENERATE LEAF LISTING (2 'branches' deep?)
# generate listing of nested endpoints from google sheet list
# create listing of all selected documents and referenced documents within them
#
# STEP 2, INDEX ALL LEAVES
# index the new listing into respective indices
# currently accepting G, I, P, T, W
# these are indices that copy the BDRC schema for each entity type
#
# STEP 3, FLATTENED VERSION OF INDICES
# create a flattened version of each index
# this is to test whether this will work for a frontend index
# if not we can create our own schema, specific for the UI
#
# STEP 4, FRONTEND
# how will frontend deal with so many calls to ES?
# #############################################

# configure the logger
sys.stdout = Logger()
# levels: debug, info, warning, error, critical
# example --> logging.warning('This will get logged to a file')
logging.basicConfig(
    # level=logging.DEBUG,
    filename=conf_log["filename"],
    filemode=conf_log["mode"],
    format=conf_log["formatter"]
)

# settings on run
environment = "production"
bulk_chunk_size = 40
branches = 2
current_listing = conf_bdrc["test_works"]
use_existing_gs_data = False  # use a previously generated list, now stored at GS
index_altered_json = True  # while generating a list, alter document and index that document

# booleans for each step, for testing purposes
step_0 = False  # Google Sheets data
step_1 = True  # list generation
step_2 = False  # ElasticSearch indexing
step_3 = False  # ??

delete_indices = False

client = None
if index_altered_json or step_2:
    print(f"Creating ElasticSearch client for {environment}")
    client = create_es_client(environment)
    if delete_indices:
        Del = input('Would you like to delete and recreate the target indices?').lower()
        if Del.startswith('y'):
            recreate_indices(client)

# authorize GS and get workbook
gs_cred = authorize_gs(conf_gs)
workbook = get_workbook(gs_cred, conf_gs)

# STEP 0, get list of bdrc items from google sheet ##################
# authorize, specify workbook, grab original listing
if step_0:
    works = get_googlesheet_data(workbook, conf_gs, use_existing_list=use_existing_gs_data)
    current_listing = works
    print("Generating list / Using existing list from Google Sheets ", works)
else:
    use_existing_gs_data = False

# STEP 1, Generate list ##################################
# create listing of all selected documents and referenced documents within them
if step_1 and not use_existing_gs_data:
    # if we're not using an existing list, then generate one
    # keep track of growth of leaves
    # write back to GS for documentation, or to use later as index list
    branch_size = dict()
    branch_size["branch_0"] = len(current_listing)
    for i in range(1, branches + 1):
        current_branch = generate_listing(conf_bdrc, current_listing, index_json=index_altered_json, client=client)
        branch_size["branch_{0}".format(i)] = len(current_branch)
        current_listing = current_branch

    print("Growth during recursion", branch_size)

    write_googlesheet_data(workbook, conf_gs, current_listing)


# STEP 2, create the as-is index
if step_2:
    # create the as-is indices for the bdrc items
    print("Bulk indexing as is...", current_listing[1:])
    bulk_index(client, current_listing[1:], chunk=bulk_chunk_size)


# OPTIONAL STEP
# Split out the listing by type (G, I, P, T, W)
# final_listing = defaultdict(list)
# for item in level_2_listing:
#     final_listing[item[4]].append(item)
#
# print(final_listing)

# set sys.stdout back to no duplication of print method
