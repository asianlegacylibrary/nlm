from generate_acip_schema import GenerateDocument, BXml
from paramiko import SSHClient, SSHConfig
from scp import SCPClient
from config.print_logger import Logger
from config.logging import conf_log
import os
import sys
import logging


def configure_logger():
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


# add try / catch to this!
def get_xml(config):
    current_dir = os.getcwd()
    local_path = os.path.join(current_dir, 'data', config['local_file_name'])
    ssh = SSHClient()
    ssh.load_system_host_keys()

    ssh_config = SSHConfig.from_path(config['config_path'])
    e = ssh_config.lookup(config['host'])
    ssh.connect(e['hostname'], username=e['user'])

    # SCPClient takes a paramiko transport as an argument
    scp = SCPClient(ssh.get_transport())
    scp.get(remote_path=config['remote_path'], local_path=local_path)
    scp.close()

    return local_path


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


def get_listing_by_type(get_type, elastic_instance, instance=None, file=None, gs_key=None, es_collection_version="v4"):

    new_listing = []

    if instance is None:
        instance = elastic_instance
    if get_type == 'xml':
        new_listing = BXml(file).get_listing()
    elif get_type == 'gs':
        new_listing = instance.get_listing(ws=gs_key)
    elif get_type == 'resources':
        new_listing = instance.get_collection(es_collection_version, node="_resources")

    print(f"New listings: {new_listing}")

    collection = elastic_instance.get_collection(es_collection_version)
    print(f"Current ElasticSearch index of {len(collection)} items, {collection}")

    # find new listings not already indexed in ES
    listing = [x for x in new_listing if x not in collection]

    if len(listing) > 0:
        print(f"To be indexed: {len(listing)} items, {listing}")

    return [listing, collection]
