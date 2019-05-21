import { client } from '../connection'
import { searchParams } from '../actions/index'

export const searchIDSbyTerm = (qterm, searchField, qids, index) => {
	//log(qterm, index, qids)
	const body = {
		size: 18,
		query: {
			bool: {
				must: {
					term: {
						[searchField]: {
							value: qterm
						}
					}
				},
				filter: {
					ids: {
						type: searchParams.type,
						values: qids
					}
				}
			}
		}
	}
	
	return client.search({ index, body })
	
}