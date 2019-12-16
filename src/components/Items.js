import '../assets/sass/nlm/items.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

import SubItems from './SubItems'
import { fetchSpecificID, browseOptionsObj } from '../store/actions'

class Items extends Component {
    // fetch ID from ES and show modal
    handleShowModal = doc_id => {
        this.props.dispatch(fetchSpecificID(doc_id))
        this.props.dispatch({
            type: 'SET_MODAL',
            modalID: doc_id,
            show: true,
            initialRender: false,
        })
    }

    render() {
        let lang = this.props.match.params.lng
        let currentESdata = browseOptionsObj.find(
            x => x.browse === this.props.browse
        )

        if (!this.props[currentESdata.stateType].length) {
            return (
                <div className="blinky">
                    {this.props.t('technical.loading-simple')}{' '}
                    {this.props.t(`browse.${currentESdata.browse}-plural`)}
                </div>
            )
        }

        const items = this.props[currentESdata.stateType].map((d, i) => {
            return (
                <div key={i} className="item">
                    <Link
                        to={{
                            pathname: `/${lang}/archives/doc/${d._id}`,
                            // this is the trick!
                            state: { label: d._source._label },
                        }}
                        className="item-title card-item-link"
                        onClick={() => this.handleShowModal(d._id)}
                    >
                        {d._source._label}
                    </Link>

                    {d._related ? (
                        <SubItems
                            key={d._id}
                            match={this.props.match}
                            related={d._related}
                            handleShowModal={this.handleShowModal}
                        />
                    ) : null}
                </div>
            )
        })

        return <div>{items}</div>
    }
}

// pseudo-selector, rewrite this using re-select package (selectors)
const getCurrentData = (data, filter) => {
    if (filter) {
        return data.filter(t => t._source._collection === 2)
    } else {
        return data
    }
}

const mapStateToProps = state => ({
    esWorks: state.ES.works.isFetching
        ? []
        : getCurrentData(state.ES.works.items.hits.hits, state.setCollection),
    esAuthors: state.ES.authors.isFetching
        ? []
        : getCurrentData(state.ES.authors.items.hits.hits, state.setCollection),
    esSubjects: state.ES.subjects.isFetching
        ? []
        : getCurrentData(
              state.ES.subjects.items.hits.hits,
              state.setCollection
          ),
    browse: state.setBrowse,
    collapse: state.setCollapse,
    collection: state.setCollection,
    doc_id: state.modal.modalID,
    showModal: state.modal.show,
})

const withN = new withNamespaces()(Items)
export default connect(mapStateToProps)(withN)
//export default Items
