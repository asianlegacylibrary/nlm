import { client } from '../connection'
import { searchParams } from '../../store/actions'

export const initialAuthorSearch = (ids) => {

	const body = {

        // aggregations.uniqueAuthors.buckets.map()
        


        aggregations: {
            uniqueAuthors: {
                terms: {
                    field: "workCreator.keyword",
                    size: ids.length
                }
            }
        },
        
		query: {
            ids: {
                type: searchParams.type,
                values: ids
            }
        }

	}

	return client.search({ index: searchParams.initialIndex, body })

}
