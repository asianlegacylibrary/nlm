import { client } from '../connection'
import { searchParams, log } from '../../store/actions'

export const searchByID = (ids, size, code, allSource = false, collection = null) => {

    let sortValue = null
    let index
    let source = []
    let sort = "asc"
    
    const id_filter = {
        type: searchParams.type,
        values: ids
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
    
    const body = {
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
	

    if(!allSource) { body._source = source }
    
    if(sortValue !== null) {
        // note the [] around variable in the value being appended...?
        body.sort = [ { [sortValue]: { "order" : sort } }]
    }

	log('search by id body', code, body)

	return client.search({ index: index, body })

}
