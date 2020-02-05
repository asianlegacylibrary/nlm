//import injectSinglePrefLabel from '../ui/injectSinglePrefLabel'

function buildType(item) {
    const source = item._source
    const id = item._id
    const { type } = source
    let label = ''
    // if (source['skos:prefLabel']) {
    //     label = injectSinglePrefLabel(source['skos:prefLabel'])
    // }
    return { type, id, label }
}

// TOPIC (subject)

// WORK

// WORK ITEM (title in volume?)
export function bdrcResources(arr) {
    //console.log('RESOURCES YO!', arr.length, arr)
    //extract what we need
    // return in type packages (topic, work items...)
    let People = {}
    let Topics = {}
    let Works = {}
    arr.forEach(item => {
        let { type, id, label } = buildType(item)
        // PERSON

        switch (type) {
            case 'Person':
                People[id] = label
                break
            case 'Topic':
                Topics[id] = label
                break
            case 'Work':
                Works[id] = label
                break
            default:
                break
        }
    })

    return {
        People,
        Topics,
        Works,
    }
}
