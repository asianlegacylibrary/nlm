import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { handleFilters } from '../store/actions'

export default () => {
    const dispatch = useDispatch()
    const filterArray = useSelector(state => state.filterArray)
    const results = useSelector(state => state.ES.search.items.hits.hits)

    if (filterArray.length === 0 || results.length === 0) {
        return null
    }

    const f = filterArray.map(f => {
        return (
            <p
                key={`list-${f.label}`}
                className={`filter-${f.type} with-border`}
                onClick={() => dispatch(handleFilters(f, false))}
            >
                {f.label}
                <i className="fa fa-times-circle valign-wrapper" />
            </p>
        )
    })
    return <div className="current-filters">{f}</div>
}
