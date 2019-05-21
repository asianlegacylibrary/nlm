import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { setBrowse, browseOptions } from '../store/actions'

import '../assets/css/sidebar.css'

class Sidebar extends Component {

    

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
                
                </form>
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    collapse: state.setCollapse,
    browse: state.setBrowse
})

const withN = new withNamespaces()(Sidebar)
export default connect(mapStateToProps)(withN)