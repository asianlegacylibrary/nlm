import { elastic, expressURL } from '../endpoints'

export default async doc_id => {
    const code = doc_id.charAt(4)
    let ids = JSON.stringify([doc_id])
    let lengthIDs = 1
    try {
        const data = await expressURL.get(elastic.fetchID, {
            params: { ids, lengthIDs, code },
        })

        ids = data.data.hits.hits[0]._source._resources
        ids.splice(ids.indexOf(doc_id), 1) // remove itself from list
        lengthIDs = ids.length // get length before stringify
        ids = JSON.stringify(ids)

        const resources = await expressURL.get(elastic.fetchID, {
            params: { ids, lengthIDs },
        })
        return { data: data.data, resources: resources.data }
    } catch (error) {
        console.error('fetch ID error! ', error)
        return error
    }
}
