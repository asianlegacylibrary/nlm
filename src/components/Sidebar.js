import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { setBrowse, setCollection, log, browseOptionsObj } from '../store/actions'

import '../assets/css/sidebar.css'

class Sidebar extends Component {

    handleCollectionFiltering = (updatedCollection) => {
        this.props.dispatch(setCollection(updatedCollection))
    }
    
    render() {
        return (
            <div className="sidenav wrapper style1">
                <div className="sidenav-title">Browse by:</div>
                <form>
                    {browseOptionsObj.map(o => {
                        o.browse === 'Title' ? log(this.props[`number_${o.stateType}`]) : log('hi')
                        return (
                            <div key={o.browse} className="col-4 col-12-small">
                                <input
                                    id={o.browse}
                                    type="radio"
                                    value={o.browse}
                                    checked={this.props.browse === o.browse}
                                    onChange={(e) => this.props.dispatch(setBrowse(e.target.value))}
                                />
                                <label htmlFor={o.browse}>{o.browse}</label>
                                <span className="meta-count">({this.props[`number_${o.stateType}`]})</span>
                            </div>
                        )
                    })}

                    {/* <div className="col-4 col-12-small">
                        <input
                            id="collapse"
                            type="checkbox"
                            value="Collapse All"
                            checked={this.props.collapse}
                            onChange={() => this.props.dispatch(setCollapse(!this.props.collapse))}
                        />
                        <label htmlFor="collapse">Collapse All</label>
                    </div> */}
                    <div className="col-4 col-12-small">
                        <input
                            id="filter-collection"
                            type="checkbox"
                            value="Collapse All"
                            checked={this.props.collection}
                            onChange={() => this.handleCollectionFiltering(!this.props.collection)}
                        />
                        <label htmlFor="filter-collection">Limit results to current collection</label>
                    </div>
                
                </form>
                    
            </div>
        )
    }
}

const getNumberOfItems = (data, filter) => {
    let d
    if(filter) {
        d = data.aggregations.collections.buckets.find(t => t.key === 2)
        d = d.doc_count
    } else {
        d = data.hits.total
    }
    return d 
}

const mapStateToProps = (state) => ({
    collapse: state.setCollapse,
    browse: state.setBrowse,
    collection: state.setCollection,
    number_esWorks: state.esWorks.isFetching ? [] : getNumberOfItems(state.esWorks.items, state.setCollection),
    number_esAuthors: state.esAuthors.isFetching ? [] : getNumberOfItems(state.esAuthors.items, state.setCollection),
    number_esSubjects: state.esSubjects.isFetching ? [] : getNumberOfItems(state.esSubjects.items, state.setCollection)
})

const withN = new withNamespaces()(Sidebar)
export default connect(mapStateToProps)(withN)