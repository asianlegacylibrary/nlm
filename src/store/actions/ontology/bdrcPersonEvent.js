import { bdrPurlURL } from '../../actions'

export const unpackPersonEvent = (arr, lifeEvents = [], workEvents = []) => {
    let events = []
    if (arr == null) {
        return null
    } else if (Array.isArray(arr)) {
        arr.forEach(a => {
            if (typeof a === 'object') {
                return unpackPersonEvent(a, lifeEvents, workEvents)
            }
        })
    } else if (typeof arr === 'object') {
        if (arr.type === 'PersonBirth' || arr.type === 'PersonDeath') {
            const typeEvent = arr.type.includes('Birth') ? 'Born' : 'Died'
            if ('onYear' in arr) {
                lifeEvents.push(`${typeEvent} in ${arr.onYear}`)
            } else if (
                Object.keys(arr).some(k => {
                    return ~k.indexOf('not')
                })
            ) {
                lifeEvents.push(
                    `${typeEvent} between ${arr.notBefore} and ${arr.notAfter}`
                )
            }
        } else if (arr.type === 'PersonOccupiesSeat') {
            if ('eventWhere' in arr) {
                workEvents.push({
                    _id: arr.eventWhere.substring(4),
                    _url: `${bdrPurlURL}${arr.eventWhere.substring(4)}.ttl`,
                })
            }
        }
    }

    events.push(lifeEvents.sort())
    events.push(workEvents.sort())
    //log(events)
    return events
}

export const unpackPersonEventObj = (arr, lifeEvents = [], workEvents = []) => {
    if (arr.type === 'PersonBirth' || arr.type === 'PersonDeath') {
        const typeEvent = arr.type.includes('Birth') ? 'Born' : 'Died'
        if ('onYear' in arr) {
            lifeEvents.push(`${typeEvent} in ${arr.onYear}`)
        } else if (
            Object.keys(arr).some(k => {
                return ~k.indexOf('not')
            })
        ) {
            lifeEvents.push(
                `${typeEvent} between ${arr.notBefore} and ${arr.notAfter}`
            )
        }
    } else if (arr.type === 'PersonOccupiesSeat') {
        if ('eventWhere' in arr) {
            workEvents.push(arr.eventWhere)
        }
    }
}
