import logging
import sys
import numpy as np

from config.config import conf_gs, conf_log, conf_mysql, p_keys_gs
from config.print_logger import Logger
from gs_data_store import authorize_gs, get_workbook
from gspread_dataframe import get_as_dataframe
from sqlalchemy import create_engine
from sqlalchemy.engine.url import URL
from sqlalchemy.exc import SQLAlchemyError


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

# using sql alchemy to create engine for mySQL connection
# first param is 'drivername'
db_url = URL(
    'mysql+mysqlconnector',
    username=conf_mysql['user'],
    password=conf_mysql['password'],
    host=conf_mysql['host'],
    port=conf_mysql['port'],
    database=conf_mysql['database']
)

# 1. CREATE CONNECTIONS ##################################
# connect to MySQL
try:
    engine = create_engine(db_url, echo=False)
    print(f"Creating connection to MySQL at {conf_mysql['host']}")
except SQLAlchemyError as e:
    print(f"Error on connecting to MySQL, {str(e.__dict__['orig'])}")

# authorize GS and get workbook
gs_cred = authorize_gs(conf_gs)

# ########################################################

# 2. GET INPUT DATA ######################################
workbook = get_workbook(gs_cred, conf_gs["key_mappings"])
sheet_listing = workbook.worksheets()

# create a list of data frames to hold each GS
new_listing = []
for i, w in enumerate(sheet_listing):
    new_listing.append(get_as_dataframe(w, header=0, evaluate_formulas=True))
    new_listing[i].name = w.title  # name each df
# #########################################################

# 3. CLEAN UP INPUT DATA AND OUTPUT TO MySQL ##############
for df in new_listing:
    print("===================================")
    print(f"Cleaning data frame: {df.name}")
    # drop 'Unnamed' columns
    df.drop(df.columns[df.columns.str.contains('unnamed', case=False)], axis=1, inplace=True)
    # replace empty with np.nan and drop rows where all columns are NaN
    df.replace('', np.nan, inplace=True)
    df.dropna(how='all', inplace=True)
    # clean up column names
    df.columns = df.columns.str.strip()
    df.columns = df.columns.str.replace(' ', '_')
    df.columns = df.columns.str.replace(',', '')
    df.columns = df.columns.str.replace('(', '_')
    df.columns = df.columns.str.replace(')', '')

    # clean up string columns, strip of leading and trailing white space
    df_obj = df.select_dtypes(['object'])  # select df dtypes object (which is string?)
    df[df_obj.columns] = df_obj.apply(lambda x: x.str.strip())  # strip strings

    # THE SUBSET OPTION DOESN'T SEEM TO BE WORKING....
    # if we consider table to have primary key then delete rows without the p key
    for key, value in p_keys_gs.items():
        if key.lower() in df.name.lower():
            df.dropna(subset=[value], how='all', inplace=True)

    print(f"Writing table to MySQL: {df.name} ({len(df)} records)")
    # write the data frame to MySQL, using replace if table exists
    df.to_sql(df.name, con=engine, if_exists='replace', index=False)
# #########################################################

