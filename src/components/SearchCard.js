import '../assets/sass/nlm/card.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import { constants } from '../store/_constants'
let { searchTypeOptions, defaultColor } = constants

function getType(type) {
    let t = type === 'Topic' ? 'Subject' : type
    if (Array.isArray(t)) {
        if (t.includes('Work')) {
            return 'Work'
        } else {
            return 'Unknown'
        }
    }
    return t
}

function getColor(type) {
    let t = searchTypeOptions.find(c => c.key === type.toLowerCase())
    if (t) {
        return t.color
    }
    return defaultColor
}

const SearchCard = ({ data, idx, match, handleShowDetails }) => {
    let type = getType(data._source.type)
    let col = getColor(type)

    let lang = match.params.lng
    return (
        <Link
            to={{
                pathname: `/${lang}/archives/doc/${data._id}`,
                // this is the trick! check out RouteSwitch
                state: { label: data._source._label, modalID: data._id },
            }}
            className="item-title card-item-link"
            onClick={() => handleShowDetails(data._id)}
        >
            <div key={idx} className="card grey lighten-3 ">
                <div className="card-content blue-grey-text darken-4">
                    <p className="meta-items">
                        <span className={`card-type ${col} meta-item`}>
                            {type}
                        </span>{' '}
                        <span className="meta-item result-id">{data._id}</span>
                    </p>
                    <p className="result-label">{data._source._label}</p>
                </div>
            </div>
        </Link>
    )
}
export default SearchCard
