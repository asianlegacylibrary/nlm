import '../assets/sass/nlm/sidebar.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'
import M from 'materialize-css'

import SidebarFilterItem from './SidebarFilterItem'

import { fetchResultsAction, actionWrapper } from '../store/actions'

import { constants } from '../store/_constants'
let { actions } = constants

class SidebarFiltersClass extends Component {
    componentDidMount = () => {
        M.Collapsible.init(document.querySelectorAll('.collapsible'))
    }

    componentDidUpdate = () => {
        M.Collapsible.init(document.querySelectorAll('.collapsible'))
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
            <ul
                key={title}
                ref={Collapsible => {
                    this.Collapsible = Collapsible
                }}
                className="collapsible"
            >
                <li className={title}>
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
            </ul>
        )
    }

    render() {
        let { t, filters, results, filterTerm } = this.props

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
                    <div className="current-filters">
                        {this.buildFilterList()}
                    </div>
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
                    return this.buildFilters(title, filter)
                })}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    filters: state.ES.results.aggregations,
    results: state.ES.results.items.hits.hits,
    currentSearchTerm: state.currentSearchTerm,
    filterArray: state.filterArray,
})

//{ fetchResultsAction, addTermToFilter, preFetch,}
const withN = new withNamespaces()(SidebarFiltersClass)
export default connect(mapStateToProps)(withN)
