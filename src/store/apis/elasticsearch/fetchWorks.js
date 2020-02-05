import { elastic, expressURL } from '../endpoints'

export default async args => {
    console.log('from fetchworks', args)
    let offset = args.offset ? args.offset : 0
    try {
        const data = await expressURL.get(elastic.fetchWorks, {
            params: { offset },
        })
        return { data: data.data }
    } catch (error) {
        console.error('there been fetchWorks error ', error)
        return error
    }
}
