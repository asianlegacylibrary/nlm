
from generate_acip_schema import GoogleSheets
from config.gs import conf_gs
from config.elasticsearch import conf_es

# GOOGLE SHEETS
g = GoogleSheets(conf_gs)

# wkb = g.get_workbook()
# print(g.data)
# g.write_data()
# wkb2 = g.credentials.open_by_key("1P99VMc_61PNm9FCOSZo1sQvXQNUanJozV4ZTm3kxhWo").worksheet("Mapping")
# if g.workbook_key is not None and g.worksheet_name is not None:
#     d = g.get_column_data()
#     print(d)
# print(g, wkb, wkb2)
# g.set_workbook_key("1P99VMc_61PNm9FCOSZo1sQvXQNUanJozV4ZTm3kxhWo")
# print(g.workbook_key)
