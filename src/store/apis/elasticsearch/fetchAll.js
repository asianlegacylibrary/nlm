import { elastic, expressURL } from '../endpoints'

export default async () => {
    try {
        const data = await expressURL.get(elastic.fetchAll)
        return { data: data.data }
    } catch (error) {
        console.error('there been fetchAll error ', error)
        return error
    }
}
