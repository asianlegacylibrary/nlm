export * from './bdrcNotes'
export * from './bdrcPerson'
export * from './bdrcPersonEvent'

export const unpackOntology = (arr, stringArray = []) => {
    //log('unpacking ontology', arr)
    if (arr == null) {
        return null
    } else if (Array.isArray(arr)) {
        arr.forEach(a => {
            if (typeof a === 'object') {
                return unpackOntology(a, stringArray)
            } else if (a.substring(0, 3) === 'bdr') {
                stringArray.push(a)
            } else {
                stringArray.push(a)
            }
        })
        return stringArray
    } else if (typeof arr === 'object') {
        if ('@value' in arr) {
            return arr['@value']
        }
    } else if (typeof arr === 'string') {
        if (arr.substring(0, 3) === 'bdr') {
            return arr
        } else {
            return arr
        }
    }
}
