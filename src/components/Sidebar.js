import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { setBrowse, browseOptionsObj } from '../store/actions'

import '../assets/css/sidebar.css'

class Sidebar extends Component {
    render() {
        return (
            <div className="sidenav wrapper style1">
                <div className="sidenav-title">{`${this.props.t(
                    'sidebar.browse'
                )}:`}</div>
                <form>
                    {browseOptionsObj.map(o => {
                        //o.browse === 'Title' ? log(this.props[`number_${o.stateType}`]) : log('hi')
                        let n =
                            this.props[`number_${o.stateType}`] == null
                                ? this.props.t('technical.loading')
                                : this.props[`number_${o.stateType}`]
                        return (
                            <div key={o.browse} className="col-4 col-12-small">
                                <input
                                    id={o.browse}
                                    type="radio"
                                    value={o.browse}
                                    checked={this.props.browse === o.browse}
                                    onChange={e =>
                                        this.props.dispatch(
                                            setBrowse(e.target.value)
                                        )
                                    }
                                />
                                <label htmlFor={o.browse}>
                                    {this.props.t(`browse.${o.browse}`)}
                                </label>
                                <span className="meta-count">({n})</span>
                            </div>
                        )
                    })}
                </form>
            </div>
        )
    }
}

const getNumberOfItems = (data, filter) => {
    let d
    if (filter) {
        d = data.aggregations.collections.buckets.find(t => t.key === 2)
        d = d.doc_count
    } else {
        d = data.hits.total
    }
    return d
}

const mapStateToProps = state => {
    return {
        browse: state.setBrowse,
        number_esWorks: state.esWorks.isFetching
            ? null
            : getNumberOfItems(state.esWorks.items, state.setCollection),
        number_esAuthors: state.esAuthors.isFetching
            ? null
            : getNumberOfItems(state.esAuthors.items, state.setCollection),
        number_esSubjects: state.esSubjects.isFetching
            ? null
            : getNumberOfItems(state.esSubjects.items, state.setCollection),
    }
}

const withN = new withNamespaces()(Sidebar)
export default connect(mapStateToProps)(withN)
