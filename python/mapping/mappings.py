import time
import datetime
from collections import OrderedDict
from mysql.connector import connect
from config.config import conf_gs, conf_mysql
from gs_data_store import authorize_gs, get_workbook
from es_indexing import create_es_client_no_sniffer, index_mysql_item
from mapping.mapping_functions import create_new_map, create_leaf, map_document, add_constants_to_document


key = conf_gs["key_mappings"]
sheet = conf_gs["read_mapping"]
mysql_table = "MongoliaCombined"
environment = "production"
connect_es = True

# authorize GS and get workbook
gs_cred = authorize_gs(conf_gs)
workbook = get_workbook(gs_cred, key)

wks = workbook.worksheet(sheet)
mappings = wks.get_all_records()

active_mappings = [item for item in mappings
                   if item["Status"] == "Active" and item["Source"] == mysql_table
                   ]

new_map = create_new_map(active_mappings)

print(f"Number of ACTIVE fields: {len(active_mappings)}")
print(f"Quick view of active mappings: {active_mappings}")

category_list = []
for x in new_map.values():
    category_list.append(x["Category"])
categories = list(filter(None, set(category_list)))

# MYSQL CONNECTION
# ### in the real deal, this script will run on the acip-mysql server
cnx = connect(**conf_mysql)
cur = cnx.cursor(buffered=True, dictionary=True)
cur.execute("use `MongoliaCatalog_2.0`")
cur.execute(
    """
    SELECT catNoNorm, 
    convert(colophon using utf8) as colophon, 
    ttlEng, ttlSkt, ttlTib, ttlTibBrf, 
    priAuthEng, priAuthTib, 
    pageNumbers, sizePages, sizePrtArea,
    textFmt, volNdx, volume, 
    recID, NLMCatNo, notes, collection, lang, copyrightOwner 
    FROM mongoliaCombinedCatalog
    ORDER BY recID
    """
)
data_mysql = cur.fetchall()
cur.close()
cnx.close()
# close db connection, we've got our mySQL data

if connect_es:
    client = create_es_client_no_sniffer(environment)


# get json-ld template file? BDRC ontology core > work
# ### save as a json file locally
start_time = time.time()
for i, d in enumerate(data_mysql):
    new_dict = {}

    for k in d.copy():
        if k in new_map:
            if d[k] == "":
                continue
            new_leaf = create_leaf(k, new_map[k], d)
            # print(new_leaf)
            if new_map[k]["Category"] in categories:
                new_dict.setdefault(new_map[k]["Category"], []).append(new_leaf)
            else:
                new_dict.update(new_leaf)

    final_map = {}
    for c in new_dict:
        final_map.update(map_document(c, new_dict))
    final_map.update(add_constants_to_document())
    final_map = OrderedDict(sorted(final_map.items(), key=lambda t: t[0]))
    if i % 1000 == 0:
        elapsed_time = str(datetime.timedelta(seconds=(time.time() - start_time))).split('.')[0]
        print(f"Indexing document {i}, elapsed time: {elapsed_time}")
    index_mysql_item(final_map, client)
