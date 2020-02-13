import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleFilters } from '../store/actions'

class SidebarFilterList extends Component {
    render() {
        let { filterArray, results } = this.props
        if (filterArray.length === 0 || results.length === 0) {
            return null
        }

        const f = filterArray.map(f => {
            return (
                <p
                    key={`list-${f.label}`}
                    className={`filter-${f.type} with-border`}
                    onClick={() => this.props.dispatch(handleFilters(f, false))}
                >
                    {f.label}
                    <i className="fal fa-times-circle valign-wrapper" />
                </p>
            )
        })
        return <div className="current-filters">{f}</div>
    }
}
const mapStateToProps = state => ({
    filterArray: state.filterArray,
    results: state.ES.search.items.hits.hits,
    currentSearchTerm: state.currentSearchTerm,
})
export default connect(mapStateToProps)(SidebarFilterList)
