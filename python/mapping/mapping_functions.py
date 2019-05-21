def create_new_map(active_mappings):
    new_map = {}
    for i in active_mappings:
        # new_map[i["Target"]] = i["Field"]
        if i["TargetLangEncoding"] == "":
            new_map[i["Field"]] = {
                "Target": i["Target"],
                "Category": i["Category"]
            }
        else:
            new_map[i["Field"]] = {
                "Target": i["Target"],
                "TargetLang": i["TargetLangEncoding"],
                "Category": i["Category"]
            }
    return new_map


def create_leaf(old_key, new_key, data):
    if data[old_key] == "":
        return None
    if "TargetLang" in new_key:
        return {
            "@language": new_key["TargetLang"],
            "@value": data[old_key]
        }
    else:
        return {
            new_key["Target"]: data[old_key]
        }


def map_document(c, dictionary):
    # print(dictionary[c])
    if c == "Author":
        return {
            "creatorMainAuthor": {
                "personName": [
                  {
                    "type": "PersonPrimaryName",
                    "rdfs:label": dictionary[c]
                  }
                ]
            }
        }
    if c == "Title":
        return {
            "skos:prefLabel": dictionary[c]
        }
    if c == "Colophon":
        return {
            "bdo:workColophon": dictionary[c]
        }
    return {c: dictionary[c]}


def add_constants_to_document():
    return {
        "@context": "http://purl.bdrc.io/context.jsonld",
        "type": "Work",
        "adm:license": "bdr:LicensePublicDomain",
        "adm:status": "bdr:StatusReleased",
        "workBiblioNote": [
            {
                "@language": "en",
                "@value": "Scanned at the National Library of Mongolia "
                          "in collaboration with Asian Classics Input Project "
                          "and with generous support from Khyentse Foundation."
            }
        ]
    }