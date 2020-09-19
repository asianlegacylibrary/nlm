import '../assets/sass/nlm/sidebar.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'
import M from 'materialize-css'

import SidebarFilters from './SidebarFilters'
import SidebarBrowse from './SidebarBrowse'
import { getTotal } from '../store/selectors'
import { constants } from '../store/_constants'

let { smallScreenWidth } = constants

class Sidebar extends Component {
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

    renderFilters = showResultTotal => {
        let { menu, t, total } = this.props
        if (menu === 'search') {
            return (
                <React.Fragment>
                    <li>
                        <div className="user-view">
                            <div className="sidenav-title">
                                <p className="sidebar-filter-text">
                                    {`${t('sidebar.results-filter')} `}
                                    <i className="fa fa-filter" />
                                </p>
                            </div>
                            {showResultTotal ? (
                                <div>{`Currently showing ${total} results`}</div>
                            ) : null}
                        </div>
                    </li>
                    <SidebarFilters />
                </React.Fragment>
            )
        }
        return (
            <React.Fragment>
                <li>
                    <div className="user-view">
                        <div className="sidenav-title">
                            <p className="sidebar-text">
                                <i className="fa fa-book-open fa-2x" />
                                To begin, use the search bar above or browse our
                                listings
                            </p>
                        </div>
                        {showResultTotal ? (
                            <div>{`Currently showing ${total} results`}</div>
                        ) : null}
                    </div>
                </li>
                <SidebarBrowse />
            </React.Fragment>
        )
    }

    render() {
        let { filters, results, menu } = this.props
        if (Object.entries(filters) === 0) {
            return null
        }

        let showResultTotal
        let activeSidenav = ''
        let sidenavLink = null
        let sidenavLinkText = 'Choose Browse'
        let sidenavClose = null
        let filterBtn = ''

        if (menu === 'search') {
            sidenavLinkText = 'Filter Results'
            if (results.length === 0) {
                filterBtn = 'disabled'
            }
        }

        if (this.state.screenWidth < smallScreenWidth) {
            activeSidenav = 'sidenav'
            sidenavLink = (
                <a
                    className={`${filterBtn} btn dropdown-btn left sidenav-trigger show-on-large valign-wrapper`}
                    data-target="filter-slide-out"
                    href="#!"
                >
                    <i className="fa fa-arrow-right" /> {sidenavLinkText}
                </a>
            )
            sidenavClose = (
                <li>
                    <a className="sidenav-close" href="#!">
                        <i className="fa fa-times" />
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

                    {this.renderFilters(showResultTotal)}
                </ul>
            </React.Fragment>
        )
    }
}

function getMenu(menu, browse) {
    if (menu === 'search') {
        return 'search'
    }
    return browse
}

const mapStateToProps = state => ({
    filters: state.ES.search.aggregations,
    menu: getMenu(state.selectedMenu, state.selectedBrowse),
    results: state.ES.search.items.hits.hits,
    currentSearchTerm: state.currentSearchTerm,
    filterArray: state.filterArray,
    total: getTotal(state.selectedBrowse, state.selectedMenu, state),
})

//{ fetchResultsAction, addTermToFilter, preFetch,}
const withN = new withNamespaces()(Sidebar)
export default connect(mapStateToProps)(withN)
