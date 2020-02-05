import '../assets/sass/nlm/sidebar.scss'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { withNamespaces } from 'react-i18next'
import M from 'materialize-css'

import {
    fetchResultsAction,
    setCurrentFilterTerm,
    clearFilterTerm,
} from '../store/actions'

const FilterItem = ({ listItem, type, filterTerm }) => {
    //console.log(active, listItem, filterTerm)
    //console.log(filterArray)
    const [active, setActive] = useState(false)
    const currentSearchTerm = useSelector(state => state.currentSearchTerm)
    const dispatch = useDispatch()

    return (
        <div
            className={`item-filter ${
                active && listItem.key === filterTerm ? 'active' : ''
            }`}
            onClick={() => {
                active && listItem.key
                    ? dispatch(
                          fetchResultsAction({ term: currentSearchTerm })
                      ) && dispatch(clearFilterTerm())
                    : dispatch(
                          fetchResultsAction({
                              term: currentSearchTerm,
                              //filterArray: [{ [type]: listItem.key }],
                              filterType: type,
                              filterTerm: listItem.key,
                          })
                      ) && dispatch(setCurrentFilterTerm(listItem.key))
                setActive(active => !active)
            }}
        >
            <span>{listItem.key}</span>
            <span> ({listItem.doc_count})</span>
            {active && listItem.key === filterTerm ? (
                <i className="fal fa-times-circle right fade-up" />
            ) : null}
        </div>
    )
}

const Filter = ({ title, filter, t, filterTerm }) => {
    if (filter.buckets.length === 0) {
        return null
    }

    //let activeTitle = title === 'author' ? 'active' : ''

    return (
        <ul className="collapsible">
            <li className={title}>
                <div className="collapsible-header">
                    {title}
                    <i className="fal fa-chevron-double-down right fade-up" />
                </div>
                <div className="collapsible-body">
                    {filter.buckets.map((b, i) => {
                        return (
                            <FilterItem
                                key={i}
                                listItem={b}
                                type={title}
                                filterTerm={filterTerm}
                            />
                        )
                    })}
                </div>
            </li>
        </ul>
    )
}

const SidebarFilters = ({ t }) => {
    const filters = useSelector(state => state.ES.results.aggregations)
    const filterTerm = useSelector(state => state.currentFilterTerm)
    const results = useSelector(state => state.ES.results.items.hits.hits)

    useEffect(() => {
        let elems = document.querySelectorAll('.collapsible')
        M.Collapsible.init(elems)
    })

    if (Object.entries(filters) === 0) {
        return null
    }

    let filterText
    if (filterTerm || results.length > 0) {
        filterText = (
            <React.Fragment>
                <p className="sidebar-filter-text">
                    {`${t('sidebar.results-filter')} `}
                    <i className="fal fa-filter" />
                </p>
                <p>{filterTerm}</p>
            </React.Fragment>
        )
    } else {
        filterText = (
            <React.Fragment>
                <p className="sidebar-text">
                    <i className="fal fa-unicorn fa-2x" />
                    To begin, use the Search Bar above....blah blaj...
                </p>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <div className="sidenav-title">{filterText}</div>
            {Object.entries(filters).map(([title, filter]) => {
                return (
                    <Filter
                        key={title}
                        title={title}
                        filter={filter}
                        t={t}
                        filterTerm={filterTerm}
                    />
                )
            })}
        </React.Fragment>
    )
}

const withN = new withNamespaces()(SidebarFilters)
export default withN

/* archive this code when component completed

const addFilter = filters => {
        const names = []

        for (let f of filters) {
            if (names.some(e => e.label === f.label)) {
                filters.delete(f)
            } else {
                names.push(f)
            }
        }

        //return names
        console.log(names)
        return addToFilterArray(names)
    }

    useEffect(() => {
        if (filterArray.length > 0) {
            console.log(filterArray)
            // this seems crazy...how does this get called?
            dispatch(
                fetchResultsAction({
                    term: currentSearchTerm,
                    filterArray: filterArray,
                })
            )
        }
    }, [filterArray])

const filterResults = f => {
    console.log(f, filterArray)
    if (!filterArray.some(arr => arr.label === f.label)) {
        addToFilterArray([...filterArray, f])
    }
    //console.log(filterArray)

    // dispatch(
    //     fetchResultsAction({
    //         term: currentSearchTerm,
    //         filterArray: filterArray,
    //     })
    // )
}

*/
