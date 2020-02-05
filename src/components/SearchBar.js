import '../assets/sass/nlm/search.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { constants } from '../store/_constants'
import { getRandomInt } from '../tools/utilities'
import {
    resetOffsets,
    clearFilterTerm,
    clearFilterArray,
    addTermToHistory,
    setCurrentSearchTerm,
    fetchResultsAction,
    fetchWorksAction,
    setBrowse,
    setOffsets,
} from '../store/actions'

let { searchOptions, searchTerms } = constants

class SearchBar extends Component {
    state = {
        term: this.props.currentSearchTerm, //'', //searchTerms[getRandomInt(0, searchTerms.length - 1)],
        offsetCurrent: 0,
        offsetSize: searchOptions.resultSetSize,
        initialLoad: true,
    }

    handleNext = () => {
        let action = null
        let args = null
        let offset = this.props.offsets[this.props.menu]
        const total = this.props.total

        if (total > offset + searchOptions.resultSetSize) {
            offset = offset + searchOptions.resultSetSize
            console.log(offset)
            if (this.props.menu === 'results') {
                action = this.props.fetchResultsAction
                args = { term: this.state.term, offset: offset }
            } else {
                action = this.props.fetchWorksAction
                args = { offset: offset }
            }
            action(args)
            this.props.setOffsets(this.props.menu, offset)
        }
    }

    handlePrev = () => {
        let action = null
        let args = []

        let offset = this.props.offsets[this.props.menu]

        if (offset - searchOptions.resultSetSize >= 0) {
            offset = offset - searchOptions.resultSetSize
            if (this.props.menu === 'results') {
                action = this.props.fetchResultsAction
                args = { term: this.state.term, offset: offset }
            } else {
                action = this.props.fetchWorksAction
                args = { offset: offset }
            }
            action(args)
            this.props.setOffsets(this.props.menu, offset)
        } else {
            this.props.setOffsets(this.props.menu, 0)
        }
    }

    handleChange = e => {
        e.preventDefault()
        this.setState({ term: e.target.value.toUpperCase() })
    }

    handleSearch = e => {
        e.preventDefault()
        //this.updateSearchDefinitionAndFetch()
        const {
            resetOffsets,
            clearFilterTerm,
            clearFilterArray,
            addTermToHistory,
            setCurrentSearchTerm,
            setBrowse,
        } = this.props
        setBrowse('results')
        resetOffsets()
        //clearResults()
        clearFilterTerm()
        clearFilterArray()
        setCurrentSearchTerm(this.state.term)
        addTermToHistory(this.state.term)
        this.props.fetchResultsAction({ term: this.state.term, offset: 0 })
    }

    setUpControls = () => {
        const offset = this.props.offsets[this.props.menu]
        const total = this.props.total
        const properOffset =
            offset + searchOptions.resultSetSize > total
                ? total
                : offset + searchOptions.resultSetSize

        let disableNext =
            total <= offset + searchOptions.resultSetSize ||
            this.props.currentlyFetchingResults

        let disablePrev =
            total <= searchOptions.resultSetSize ||
            offset <= 0 ||
            this.props.currentlyFetchingResults

        let paginationMsg =
            total > 0
                ? `Showing <span className="boldy">${offset +
                      1} to ${properOffset} </span> of ${total}`
                : `&nbsp;`

        return { disableNext, disablePrev, paginationMsg }
    }

    render() {
        const { disableNext, disablePrev, paginationMsg } = this.setUpControls()
        return (
            <div className="search-form col">
                <div className="search-ctl">
                    <label>Search</label>
                    <input
                        className="search-input"
                        autoFocus
                        type="text"
                        value={this.state.term}
                        onChange={e => this.handleChange(e)}
                        onKeyDown={e =>
                            e.key === 'Enter' ? this.handleSearch(e) : null
                        }
                    />
                </div>
                <div className="result-pagination">
                    <button
                        className="waves-effect waves-light btn"
                        disabled={disablePrev}
                        onClick={this.handlePrev}
                    >
                        PREV
                    </button>

                    <button
                        className="waves-effect waves-light btn"
                        disabled={disableNext}
                        onClick={this.handleNext}
                    >
                        NEXT
                    </button>
                </div>
                <div
                    className="result-pagination-msg"
                    dangerouslySetInnerHTML={{
                        __html: paginationMsg,
                    }}
                />
            </div>
        )
    }
}

function getStatus(state) {
    if (state.ES.works.isFetching || state.ES.results.isFetching) {
        return true
    }
    return false
}

function getTotal(type, state) {
    return state.ES[type].isFetching ? 0 : state.ES[type].items.hits.total
}

const mapStateToProps = state => ({
    offsets: state.offsets,
    menu: state.selectedMenu,
    total: state.ES[state.selectedMenu].isFetching
        ? 0
        : state.ES[state.selectedMenu].items.hits.total, //getTotal(state.selectedMenu, state),
    currentlyFetchingResults: getStatus(state),
    filterArray: state.filterArray,
    currentSearchTerm: state.currentSearchTerm,
})

const withN = new withNamespaces()(SearchBar)
export default connect(mapStateToProps, {
    resetOffsets,
    addTermToHistory,
    setCurrentSearchTerm,
    clearFilterTerm,
    clearFilterArray,
    fetchResultsAction,
    fetchWorksAction,
    setBrowse,
    setOffsets,
})(withN)
