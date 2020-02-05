// NOTES *********************************************
export const unpackNotes = (arr, notesArray = [], possibleIDs = []) => {
    if (arr == null) {
        return null
    } else if (Array.isArray(arr)) {
        arr.forEach(a => {
            if (typeof a === 'object') {
                return unpackNotes(a, notesArray, possibleIDs)
            }
        })
    } else if (typeof arr === 'object') {
        //if ('noteText' in arr) {
        //log('note object', arr.noteText)
        if ('@value' in arr) {
            //log(arr.noteText['@value'].toLowerCase().includes('nlmid'), arr.noteText['@value'])
            if (arr['@value'].toLowerCase().includes('nlmid')) {
                //grabNLMID(arr.noteText['@value'])
                possibleIDs.push(arr['@value'])
            } else {
                notesArray.push(arr['@value'])
            }
        }
        //}
    } else if (typeof arr === 'string') {
        //log('notes string', arr)
    }
    //log('the notes array', notesArray)
    let id = possibleIDs.find(a => a.toLowerCase().includes('nlmid'))
    return { parsedNotes: notesArray.sort(), nlmIDs: id == null ? null : id }
}
