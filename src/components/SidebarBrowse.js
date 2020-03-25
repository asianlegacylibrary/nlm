import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { constants } from '../store/_constants'
import { getTotal } from '../store/selectors'
let { browseTypes } = constants

const BrowseItem = ({ item }) => {
    let dispatch = useDispatch()
    const currentBrowse = useSelector(state => state.selectedBrowse)
    const total = useSelector(state => getTotal(item, 'browse', state))
    console.log('total from selector', total)
    let active = !!(currentBrowse === item)
    return (
        <div
            className={`flex item-filter ${active ? 'active' : ''}`}
            onClick={() => {
                dispatch({ type: 'SET_BROWSE', payload: item })
            }}
        >
            <div>{`${item} (${total})`}</div>
        </div>
    )
}

export default () => {
    const types = browseTypes.map(b => {
        return <BrowseItem key={b} item={b} />
    })

    return (
        <li className="active">
            <div className="collapsible-header">
                Browse By
                <i className="fal fa-chevron-double-down right fade-up" />
            </div>
            <div className="collapsible-body">{types}</div>
        </li>
    )
}
