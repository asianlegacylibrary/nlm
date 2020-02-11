import { elastic, expressURL } from '../endpoints'

export default async args => {
    let term = args.term ? args.term : ''
    let offset = args.offset ? args.offset : 0
    // let filterType = args.filterType ? args.filterType : null
    // let filterTerm = args.filterTerm ? args.filterTerm : null
    let filterArray = args.filterArray ? args.filterArray : null
    try {
        const data = await expressURL.get(elastic.searchAll, {
            params: { term, offset, filterArray }, //params: { term, offset },
        })
        return { data: data.data }
    } catch (error) {
        console.error('there been fetchResults error ', error)
        return error
    }
}
