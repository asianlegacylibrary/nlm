import '../assets/sass/nlm/sidebar.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'
import M from 'materialize-css'

import SidebarFilterItem from './SidebarFilterItem'

import { fetchResultsAction, actionWrapper } from '../store/actions'
import { constants } from '../store/_constants'
let { actions, smallScreenWidth } = constants

class SidebarFiltersClass extends Component {
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

        this.setState({ screenWidth: window.innerWidth })
        window.addEventListener('resize', this.updateWindowDimensions)
    }

    componentDidUpdate = () => {
        const sidenavElems = document.querySelectorAll('.sidenav')
        M.Sidenav.init(sidenavElems, this.state.sidenavOptions)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions)
    }

    updateWindowDimensions = () => {
        this.setState({ screenWidth: window.innerWidth })
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

    handleClick = () => {
        this.filterItem.current.setActive()
    }

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

        let filterText
        let currentFilters = null
        let showResultTotal = false
        let activeSidenav = ''
        let sidenavLink = null
        let sidenavClose = null
        let filterBtn = ''

        if (filterArray.length > -0 || results.length > 0) {
            currentFilters = (
                <div className="current-filters">{this.buildFilterList()}</div>
            )
            filterText = (
                <p className="sidebar-filter-text">
                    {`${t('sidebar.results-filter')} `}
                    <i className="fal fa-filter" />
                </p>
            )
        } else {
            filterText = (
                <React.Fragment>
                    <p className="sidebar-text">
                        <i className="fad fa-book-open fa-2x" />
                        To begin, use the search bar above or browse our
                        listings
                    </p>
                </React.Fragment>
            )
            filterBtn = 'disabled'
        }

        if (this.state.screenWidth < smallScreenWidth) {
            activeSidenav = 'sidenav'
            sidenavLink = (
                <a
                    className={`${filterBtn} btn dropdown-btn left sidenav-trigger show-on-large valign-wrapper`}
                    data-target="filter-slide-out"
                    href="#!"
                >
                    <i className="fal fa-arrow-right" /> Filter Results
                </a>
            )
            sidenavClose = (
                <li>
                    <a className="sidenav-close" href="#!">
                        <i className="fal fa-times" />
                    </a>
                </li>
            )
            showResultTotal = true
        }

        return (
            <React.Fragment>
                {sidenavLink}
                <ul
                    id="filter-slide-out"
                    className={`${activeSidenav} collapsible`}
                >
                    {sidenavClose}
                    <li>
                        <div className="user-view">
                            <div className="sidenav-title">{filterText}</div>
                            {showResultTotal ? (
                                <div>{`Currently showing ${this.props.total} results`}</div>
                            ) : null}
                            {currentFilters}
                        </div>
                    </li>

                    {Object.entries(filters).map(([title, filter]) => {
                        return this.buildFilters(title, filter)
                    })}
                </ul>
            </React.Fragment>
        )
    }
}

function getTotal(type, state) {
    return state.ES[type].items.hits.total
}

const mapStateToProps = state => ({
    filters: state.ES.results.aggregations,
    results: state.ES.results.items.hits.hits,
    currentSearchTerm: state.currentSearchTerm,
    filterArray: state.filterArray,
    total: getTotal(state.selectedMenu, state),
})

//{ fetchResultsAction, addTermToFilter, preFetch,}
const withN = new withNamespaces()(SidebarFiltersClass)
export default connect(mapStateToProps)(withN)
