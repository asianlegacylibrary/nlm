import { elastic, expressURL } from '../endpoints'

export default async doc_id => {
    const code = doc_id.charAt(4)
    let ids = JSON.stringify([doc_id])
    let lengthIDs = 1
    try {
        const data = await expressURL.get(elastic.fetchID, {
            params: { ids, lengthIDs, code },
        })
        return { data: data.data }
    } catch (error) {
        console.error('fetch ID error! ', error)
        return error
    }
}
