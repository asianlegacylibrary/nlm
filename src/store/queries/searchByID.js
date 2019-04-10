import { client, log } from '../connection'
import { searchParams } from '../../store/actions'

export const searchByID = (ids, size, code, allSource = false) => {

    let sortValue = null
    let index
    let source = []
    let sort = "asc"

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
        
		query: {
            ids: {
                type: searchParams.type,
                values: ids
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
