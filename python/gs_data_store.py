import gspread
from oauth2client.service_account import ServiceAccountCredentials


def authorize_gs(config):
    gc = None
    try:
        credentials = ServiceAccountCredentials.from_json_keyfile_name(
            config["json_creds"], config["scope"]
        )

        gc = gspread.authorize(credentials)
        print(f"Authorizing script for Google Sheets...")
    except IOError as e:
        print(e)

    return gc


def get_workbook(gc, key):
    workbook = gc.open_by_key(key)
    return workbook


def get_googlesheet_data(workbook, sheet):

    wks = workbook.worksheet(sheet)
    works = wks.col_values(1)

    return sorted(works[1:])


def write_googlesheet_data(workbook, config, data):
    current_ws = {}
    for item in workbook.worksheets():
        current_ws.update({item.title: item.id})

    print(current_ws)

    if config["write_sheet_name"] in current_ws:
        print("deleting worksheet", config["write_sheet_name"])
        sh = workbook.worksheet(config["write_sheet_name"])
        workbook.del_worksheet(sh)

    # recreate the worksheet
    print("Recreating worksheet. Data has length: ", len(data))
    workbook.add_worksheet(title=config["write_sheet_name"], rows=len(data), cols=2)

    # to add as a column, create for loop
    data.insert(0, "Works")
    workbook.values_append(
        config["write_sheet_name"],
        params={'valueInputOption': 'RAW'},
        body={'values': [data], 'majorDimension': 'COLUMNS'}
    )