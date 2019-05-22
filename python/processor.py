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
how_many_levels = 2
current_listing = conf_bdrc["test_works"]
current_gs_key = conf_gs["key_mappings"]
current_gs_sheet = conf_gs["read_NLM_2"]
which_collection = 2
index_altered_json = True  # while generating a list, alter document and index that document

delete_indices = False

# booleans for each step, for testing purposes
step_0 = True  # Google Sheets data
step_1 = True  # list generation
step_2 = False  # ElasticSearch indexing

client = None
if index_altered_json or step_2:
    print(f"Creating ElasticSearch client for {environment}")
    client = create_es_client(environment)
    if delete_indices:
        Del = input('Would you like to delete and recreate the target indices?').lower()
        if Del.startswith('y'):
            recreate_indices(client, collection=which_collection)

# authorize GS and get workbook
gs_cred = authorize_gs(conf_gs)
workbook = get_workbook(gs_cred, current_gs_key)

# STEP 0, get list of bdrc items from google sheet ##################
# authorize, specify workbook, grab original listing
if step_0:
    works = get_googlesheet_data(workbook, current_gs_sheet)
    current_listing = works
    print(f"Generating list / Using existing list from Google Sheets {works}")


# STEP 1, Generate list ##################################
# create listing of all selected documents and referenced documents within them
if step_1:
    # if we're not using an existing list, then generate one
    # keep track of growth of leaves
    # write back to GS for documentation, or to use later as index list
    branches = dict()
    current_level = 0
    branches["level_0"] = len(current_listing)
    print(f"Branch 0 has {len(current_listing)} leaves...")
    for i in range(1, how_many_levels + 1):
        current_branch = generate_listing(conf_bdrc,
                                          current_listing,
                                          index_json=index_altered_json,
                                          client=client,
                                          level=current_level,
                                          collection=which_collection)
        branches["level_{0}".format(i)] = len(current_branch)
        print(f"Branch {i} has {len(current_branch)} leaves...")
        current_listing = current_branch
        current_level = i

    print(f"Growth during recursion {branches}")

    # link to a new workbook to write
    write_workbook = get_workbook(gs_cred, conf_gs["key_collections"])
    write_googlesheet_data(write_workbook, conf_gs, current_listing)


# STEP 2, create the as-is index
if step_2:
    # create the as-is indices for the bdrc items
    print(f"Bulk indexing as is...{current_listing[1:]}")
    bulk_index(client, current_listing[1:], chunk=bulk_chunk_size)


# OPTIONAL STEP
# Split out the listing by type (G, I, P, T, W)
# final_listing = defaultdict(list)
# for item in level_2_listing:
#     final_listing[item[4]].append(item)
#
# print(final_listing)

# set sys.stdout back to no duplication of print method
