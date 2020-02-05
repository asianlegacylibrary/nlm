import '../assets/sass/nlm/card.scss'
import React from 'react'
import { Link } from 'react-router-dom'

const SubItems = ({ related, handleShowModal, match }) => {
    if (related == null) {
        return null
    }

    const lang = match.params.lng

    const relatedItems = related.hits.hits.map((d, i) => {
        return (
            <Link
                key={i}
                to={{
                    pathname: `/${lang}/archives/doc/${d._id}`,
                    // this is the trick!
                    state: { label: d._label },
                }}
                className="subitems card-item-link"
                onClick={() => handleShowModal(d._id)}
            >
                {d._label}
            </Link>
        )
    })

    return <div>{relatedItems}</div>
}

export default SubItems
