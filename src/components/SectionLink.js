import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchIDAction } from '../store/actions'

export const SectionLink = ({ section, label }) => {
    const dispatch = useDispatch()
    // check for array, if not return null
    if (Array.isArray(section)) {
        return section.map(t => {
            // straight from BDRC, @language / @value
            if ('@value' in t) {
                return (
                    <div key={`${t['@language']}_${t['@value']}`}>
                        {t['@value']}
                    </div>
                )
                // created during python processing, _id / _value
            } else if ('_value' in t) {
                return (
                    <div key={t._id}>
                        <span className="span-title">{label}</span>
                        <span>
                            <Link
                                to={{
                                    pathname: `/en/archives/doc/bdr:${t._id}`, //${lang}
                                    // this is the trick!
                                    state: { label: t._value },
                                }}
                                className="span-title card-item-link"
                                onClick={() =>
                                    dispatch(fetchIDAction(`bdr:${t._id}`))
                                }
                            >
                                {t._value}
                            </Link>
                        </span>
                    </div>
                )
            }
        })
    }
    return null
}
