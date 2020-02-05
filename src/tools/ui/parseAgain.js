import React from 'react'
export default function(items) {
    let j = []
    if (Array.isArray(items)) {
        if (items.length === 1) {
            let t = items[0]
            if ('@value' in items[0]) {
                //return { key: items[0]['@language'], value: items[0]['@value'] }
                return (
                    <span key={`${t['@language']}_${t['@value']}`}>
                        {t['@value']}
                    </span>
                )
            } else if ('_value' in items[0]) {
                //return { key: items[0]['_id'], value: items[0]['_value'] }
                return <span key={t._id}>{t._value}</span>
            }
        }
        // items.forEach(p => {
        //     if ('@value' in p) {
        //         j.push({ key: p['@language'], value: p['@value'] })
        //     } else if ('_value' in p) {
        //         j.push({ key: p['_id'], value: p['_value'] })
        //     }
        // })
    }
    return null
}
