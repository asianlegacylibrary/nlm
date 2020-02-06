import '../assets/sass/nlm/sidebar.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'
import M from 'materialize-css'

import SidebarFilterItem from './SidebarFilterItem'

import { fetchResultsAction, actionWrapper } from '../store/actions'
import { getTotal } from '../store/selectors'
import { constants } from '../store/_constants'
let { actions } = constants

class SidebarFilters extends Component {
    state = {
        sidenavOptions: {
            edge: 'left',
            inDuration: 250,
        },
        collapsibleOptions: {
            accordion: false,
        },
        screenWidth: 0,
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

    handleFilters = (filter, isActive) => {
        let { currentSearchTerm } = this.props

        this.props
            .dispatch(
                actionWrapper(actions.ADD_TERM_TO_FILTER, {
                    filter: filter,
                    isActive: isActive,
                })
            )
            .then(() => {
                this.props.dispatch(
                    fetchResultsAction({
                        term: currentSearchTerm,
                        filterArray: this.props.filterArray,
                    })
                )
                this.setState({ currentFilterArray: this.props.filterArray })
            })
            .catch(error => {
                console.log('fetch error in filter component', error)
            })
    }

    // handleClick = () => {
    //     this.filterItem.current.setActive()
    // }

    // onClick need to also make item not active in listing
    buildFilterList = () => {
        let { filterArray } = this.props
        return filterArray.map(f => {
            return (
                <p
                    key={`list-${f.label}`}
                    className={`filter-${f.type} with-border`}
                    //onClick={this.handleClick} //this.handleFilter(f, false)
                >
                    {f.label}
                    <i className="fal fa-times-circle valign-wrapper" />
                </p>
            )
        })
    }

    buildFilters = (title, filter) => {
        if (filter.buckets.length === 0) {
            return null
        }

        return (
            <li key={title} className={title}>
                <div className="collapsible-header">
                    {title}
                    <i className="fal fa-chevron-double-down right fade-up" />
                </div>
                <div className="collapsible-body">
                    {filter.buckets.map(b => {
                        return (
                            <SidebarFilterItem
                                key={b.key}
                                listItem={b}
                                type={title}
                                handleFilters={this.handleFilters}
                            />
                        )
                    })}
                </div>
            </li>
        )
    }

    render() {
        let { t, filters, filterArray, results } = this.props
        if (Object.entries(filters) === 0) {
            return null
        }

        let currentFilters = null

        if (filterArray.length > 0 || results.length > 0) {
            currentFilters = (
                <div className="current-filters">{this.buildFilterList()}</div>
            )
        }

        return (
            <React.Fragment>
                {currentFilters ? (
                    <li>
                        <div className="user-view">{currentFilters}</div>
                    </li>
                ) : null}

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
