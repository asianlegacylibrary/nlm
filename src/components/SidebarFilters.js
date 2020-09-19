import '../assets/sass/nlm/sidebar.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'
import M from 'materialize-css'

import SidebarFilterItem from './SidebarFilterItem'

import { getTotal } from '../store/selectors'

class SidebarFilters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sidenavOptions: {
                edge: 'left',
                inDuration: 250,
            },
            collapsibleOptions: {
                accordion: false,
            },
            screenWidth: 0,
        }
    }

    componentDidMount = () => {
        const sidenavElems = document.querySelectorAll('.sidenav')
        const collapsibleElems = document.querySelectorAll('.collapsible')
        M.Sidenav.init(sidenavElems, this.state.sidenavOptions)
        M.Collapsible.init(collapsibleElems, this.state.collapsibleOptions)
    }

    componentDidUpdate = () => {
        const sidenavElems = document.querySelectorAll('.sidenav')
        M.Sidenav.init(sidenavElems, this.state.sidenavOptions)
    }

    buildFilters = (title, filter) => {
        if (filter.buckets.length === 0) {
            return null
        }

        return (
            <li key={title} className={title}>
                <div className="collapsible-header">
                    {title}
                    <i className="fa fa-chevron-double-down right fade-up" />
                </div>
                <div className="collapsible-body">
                    {filter.buckets.map((b, i) => {
                        return (
                            <SidebarFilterItem
                                key={b.key}
                                listItem={b}
                                type={title}
                            />
                        )
                    })}
                </div>
            </li>
        )
    }

    render() {
        let { filters } = this.props
        if (Object.entries(filters) === 0) {
            return null
        }

        return (
            <React.Fragment>
                {Object.entries(filters).map(([title, filter]) => {
                    return this.buildFilters(title, filter)
                })}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    filters: state.ES.search.aggregations,
    results: state.ES.search.items.hits.hits,
    currentSearchTerm: state.currentSearchTerm,
    filterArray: state.filterArray,
    total: getTotal(state.selectedBrowse, state.selectedMenu, state),
})

//{ fetchResultsAction, addTermToFilter, preFetch,}
const withN = new withNamespaces()(SidebarFilters)
export default connect(mapStateToProps)(withN)
