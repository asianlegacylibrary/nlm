import { elastic, expressURL } from '../endpoints'

export default async args => {
    console.log('from fetchworks', args, elastic.fetchWorks, expressURL)
    let offset = args.offset ? args.offset : 0
    try {
        const data = await expressURL.get(elastic.fetchWorks, {
            params: { offset },
        })
        console.log('data from fetchworks', data)
        return { data: data.data }
    } catch (error) {
        console.error('there been fetchWorks error ', error)
        return error
    }
}
