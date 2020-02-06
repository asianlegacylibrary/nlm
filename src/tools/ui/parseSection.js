import React from 'react'

export const parseSection = items => {
    //console.log(items)
    // check for array, if not return null

    if (Array.isArray(items)) {
        return items.forEach(t => {
            //console.log(t)
            // straight from BDRC, @language / @value
            if ('@value' in t) {
                //return { key: t['@language'], value: t['@value'] }
                return (
                    <span key={`${t['@language']}_${t['@value']}`}>
                        {t['@value']}
                    </span>
                )
                // created during python processing, _id / _value
            } else if ('_value' in t) {
                return <span key={t._id}>{t._value}</span>
                //return { key: t['_id'], value: t['_value'] }
            }
        })
    }
    return null
}
