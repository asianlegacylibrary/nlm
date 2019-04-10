import { client } from '../connection'
import { searchParams } from '../../store/actions'

export const initialTopicsSearch = (ids) => {

	const body = {

        // aggregations.uniqueAuthors.buckets.map()
        aggregations: {
            uniqueTopics: {
                terms: {
                    field: "workIsAbout.keyword",
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
