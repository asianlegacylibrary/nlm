import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { setBrowse, setCollection, browseOptions, log, fetchData } from '../store/actions'

import '../assets/css/sidebar.css'
import { searchByID } from '../store/queries';

class Sidebar extends Component {

    constructor(props) {
        super(props)
        this.state = {
            collection: false
        }
    }

    handleCollectionFiltering = (updatedCollection) => {
        this.props.dispatch(setCollection(updatedCollection))
    }
    
    render() {
        return (
            <div className="sidenav wrapper style1">
                Browse by:
                <form>
                    {browseOptions.map(o => {
                        return (
                            <div key={o} className="col-4 col-12-small">
                                <input
                                    id={o}
                                    type="radio"
                                    value={o}
                                    checked={this.props.browse === o}
                                    onChange={(e) => this.props.dispatch(setBrowse(e.target.value))}
                                />
                                <label htmlFor={o}>{o}</label>
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

const mapStateToProps = (state) => ({
    collapse: state.setCollapse,
    browse: state.setBrowse,
    collection: state.setCollection
})

const withN = new withNamespaces()(Sidebar)
export default connect(mapStateToProps)(withN)