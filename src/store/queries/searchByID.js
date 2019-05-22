import { client, log } from '../connection'
import { searchParams } from '../../store/actions'

export const searchByID = (ids, size, code, allSource = false, collection = null) => {

    let sortValue = null
    let index
    let source = []
    let sort = "asc"
    let body
    //collection = 'YO'
    
    const id_filter = {
        type: searchParams.type,
        values: ids
    }

    const term_filter = {
        '_collection': {
            value: collection
        }
    }

    const agg_terms = {
        collections: {
            terms: {
                field: '_collection',
                order: { _count: 'desc' }
            }
        }
    }


    if(code === "P") {
        index = "v1_bdrc_person"
        source = ["personName", "skos:prefLabel", "_*"]

    } else if(code === "T") {
        index = ["v1_bdrc_person", "v1_bdrc_topic", "v1_bdrc_work"]
        source = [
            "personName", "@id", "note.noteText", "skos:prefLabel", 
            "workCreator", "workIsAbout",
            "_*"
        ]
    }
    
    else if(code === "W") {
        index = "v1_bdrc_work"
        sortValue = "skos:prefLabel.@value.keyword"
        source = [
            "@id", "note.noteText", "skos:prefLabel", 
            "workCreator", "workIsAbout",
            "_*"
        ]

    }
    
    if(collection == null) {
        body = {
            size: size,
            aggregations: agg_terms,
            query: {
                bool: {
                    filter: [
                        { ids: id_filter }
                    ]
                }
            }
        }
    } else {
        body = {
            size: size,
            aggregations: agg_terms,
            query: {
                bool: {
                    filter: [
                        { ids: id_filter },
                        { term: term_filter }
                    ]
                }
            }
        }
    }
	

    if(!allSource) { body._source = source }
    
    if(sortValue !== null) {
        // note the [] around variable in the value being appended...?
        body.sort = [ { [sortValue]: { "order" : sort } }]
    }

	log('search by id body', body)

	return client.search({ index: index, body })

}
