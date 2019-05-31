import { client } from '../connection'
import { searchParams, v1Indices, log } from '../actions'

export const searchResources = (ids) => {

	// const index = [
	// 	't_bdrc_work', 't_bdrc_topic', 't_bdrc_person', 
	// 	't_bdrc_item', 't_bdrc_geography'
	// ] 

	log('how many resources', ids.length)

	const index = [v1Indices]
	
	const body = {
		
		size: ids.length,
		query: {
            ids: {
                type: searchParams.type,
                values: ids
            }
        }
	}
	
	log('resource search body', body)

	return client.search({
			index,
			body
		})
}