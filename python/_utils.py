import json
from urllib import error, request
import logging
from config.bdrc import conf_bdrc


def get_json(current_listing):
    for i, d in enumerate(current_listing):

        doc_number = d.split(":")[1] if d.split(":")[0] == "bdr" else d
        # print(conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"])

        try:
            yield json.load(
                request.urlopen(
                    conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"]
                )
            ), doc_number, i
        except error.HTTPError as e:
            logging.error(f"error HTTP {e.code}")
            pass
        except error.URLError as e:
            logging.error(f"error during url request {e}")
            pass
        except error.ProtocolError as e:
            logging.error(f"error, probably while receiving data {e}")
            pass
        except error.ReadTimeoutError as e:
            logging.error(f"error, reading from server {e}")
            pass


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


def gen_dict_extract(key, var):
    try:
        g = var.iteritems()
    except AttributeError:
        pass
    else:
        for k, v in g:
            if k == key:
                yield v
            if isinstance(v, dict):
                for result in gen_dict_extract(key, v):
                    yield result
            elif isinstance(v, list):
                for d in v:
                    for result in gen_dict_extract(key, d):
                        yield result


def find(key, value):
    for k, v in (value.iteritems()
    if isinstance(value, dict) else enumerate(value) if isinstance(value, list) else []):
        if k == key:
            yield v
        elif isinstance(v, (dict, list)):
            for result in find(key, v):
                yield result
