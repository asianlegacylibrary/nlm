import { elastic, expressURL } from '../endpoints'

export default async args => {
    let offset = args.offset ? args.offset : 0
    try {
        const data = await expressURL.get(elastic.fetchPlaces, {
            params: { offset },
        })

        return { data: data.data }
    } catch (error) {
        console.error('there been fetchPlaces error ', error)
        return error
    }
}
