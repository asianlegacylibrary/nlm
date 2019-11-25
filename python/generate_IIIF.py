import urllib
import json
import logging

from config.config import conf_bdrc


def get_manifest(doc):
    document = None
    doc_number = doc['workHasItemImageAsset'].split(":")[1] \
        if doc['workHasItemImageAsset'].split(":")[0] == "bdr" \
        else doc['workHasItemImageAsset']
    try:
        document = json.load(urllib.request.urlopen(
            conf_bdrc["endpoint"] + doc_number + conf_bdrc["file_type"])
        )
    except urllib.error.HTTPError as HTTP_error:
        logging.error(f"error during url request {HTTP_error.code}")
        pass
    except urllib.error.URLError as URL_error:
        logging.error(f"error during url request {URL_error}")
        pass

    if 'workNumberOfVolumes' in doc and document is not None:
        if doc['workNumberOfVolumes'] == 1:
            if 'itemHasVolume' in document:
                manifest = f"{conf_bdrc['presentation_endpoint']}/v:{document['itemHasVolume']}/manifest"
        elif doc['workNumberOfVolumes'] > 1:
            manifest = f"{conf_bdrc['presentation_endpoint']}/collection/i:{document['@id']}"

    return manifest


def get_first_image_url(manifest):
    req = urllib.request.Request(manifest)
    try:
        data = json.load(urllib.request.urlopen(req))
    except urllib.error.HTTPError as e:
        logging.error(f"{e.code}, {e.reason}, {manifest}")
        return "Not Found"
    except urllib.error.URLError as e:
        logging.error(f"{e.reason}, {manifest}")
        return "Not Found"

    # this logic taken directly from BDRC
    if 'sequences' not in data:
        if 'manifests' in data:
            return get_first_image_url(data['manifests'][0]['@id'])

    if 'sequences' in data and data['sequences'][0]['canvases']:
        for i in range(len(data['sequences'][0]['canvases'])):
            s = data['sequences'][0]['canvases'][i]
            if s['label'] == "tbrc-1":
                data['sequences'][0]['canvases'][2]
                if s['images'][0]:
                    return s['images'][0]['resource']['@id'].split("/full", 1)[0]

    if data['sequences'][0]['canvases'][0]:
        s = data['sequences'][0]['canvases'][0]
        if s['images'][0] and s['images'][0]['resource']['@id']:
            return s['images'][0]['resource']['@id'].split("/full", 1)[0]
