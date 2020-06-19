import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import { constants } from '../store/_constants'
let { sectionLinks } = constants

function convertSection(section) {
    return section.map(r => {
        let u = r._id.substring(0, 3) === 'bdr' ? r._id.substring(4) : r._id
        return { _id: u, _value: r._source._label }
    })
}
export const SectionLinks = ({ section, label, convert }) => {
    let icon = sectionLinks.find(l => l.key === label.toLowerCase())

    useEffect(() => {
        let elems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(elems)
    })
    let newSection = null
    if (convert) {
        newSection = convertSection(section)
        section = newSection
    }

    if (Array.isArray(section)) {
        let items = section.map(t => {
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
                    <Link
                        key={t._id}
                        to={{
                            pathname: `/en/archives/doc/bdr:${t._id}`, //${lang}
                            // this is the trick!
                            state: { label: t._value, modalID: t._id },
                        }}
                        className={`span-title card-item-link ${label}`}
                    >
                        <i className={icon.icon} />
                        {t._value}
                    </Link>
                )
            }
            return null
        })
        let l = items.length > 1 ? `${label}s` : label
        return (
            <React.Fragment>
                <ul className="collapsible details-sections">
                    <li className={`active ${label}`}>
                        <div className="collapsible-header">
                            {l}
                            <i className="fal fa-chevron-double-down right fade-up" />
                        </div>
                        <div className="collapsible-body">{items}</div>
                    </li>
                </ul>
            </React.Fragment>
        )
    }
    return null
}
