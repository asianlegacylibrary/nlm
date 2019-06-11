import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import SubItems from './SubItems'
import Modal from './Modal'
import { fetchSpecificID, browseOptionsObj, IIIFsuffix, log } from '../store/actions'

//import { log } from '../store/connection'

import '../assets/css/items.css'

class Items extends Component {

    // fetch ID from ES and show modal
    handleShowModal = (doc_id, label = '', resources = null, imageURL = null, manifestURL = null) => {
        this.props.dispatch(fetchSpecificID(doc_id))
        //this.props.dispatch(fetchResources(doc_id, resources))
        this.props.dispatch(
            { type: 'DETAIL_MODAL', modalID: doc_id, label: label, resources: resources, image: imageURL, manifest: manifestURL, show: true }
        )
    }

    // close modal and nullify the IIIF image so there's no flash
    // of previous image on next modal
    handleHideModal = () => {
        this.props.dispatch({ type: 'DETAIL_MODAL', show: false})
        this.props.dispatch({ type: 'NULLIFY_IIIF'})
    }

    setImageURL = (img, access) => {
        if(access === 'bdr:AccessRestrictedSealed') {
            return 'Restricted Access'
        } else if(img == null) {
            return 'No Image'
        } else if(img === 'Not Found') {
            return 'Not Found'
        } else {
            return `${img}/${IIIFsuffix}`
        }
    }

    render() {

        let currentESdata = browseOptionsObj.find(x => x.browse === this.props.browse)

        if(!this.props[currentESdata.stateType].length) {
            return (
                <div className="blinky">
                    {this.props.t('technical.loading-simple')} {this.props.t(`browse.${currentESdata.browse}-plural`)}
                </div>
            )
        }

        const items = this.props[currentESdata.stateType].map((d, i) => {
            //let _id = null, _resources = null, _firstImageURL = null, _manifestURL = null
            const { 
                _resources, 
                _firstImageURL, 
                _manifestURL, 
                'adm:access': _access } = d._source
            let imageURL = this.setImageURL(_firstImageURL, _access)
            return (
                <div key={i} className="item">
                    <div 
                        className="item-title card-item-link"
                        onClick={() => this.handleShowModal(d._id, d._tid, _resources, imageURL, _manifestURL)}
                    >{d._tid}</div>
                    { d._related ? 
                        <SubItems 
                            key={d._id} 
                            related={d._related}
                            setImage={this.setImageURL}
                            handleShowModal={this.handleShowModal}
                        /> : null }
                </div>
            )
        })
    
        return (
            <div>
                {items}
                {this.props.doc_id == null ? null : 
                <Modal 
                    key={this.props.doc_id}
                    hideModal={this.handleHideModal}
                    doc_id={this.props.doc_id}
                    show={this.props.showModal}
                /> }
            </div>
        )
    }

    
}

// pseudo-selector, rewrite this using re-select package (selectors)
const getCurrentData = (data, filter) => {
    if(filter) {
        return data.filter(t => t._source._collection === 2)
    } else {
        return data
    }
}

const mapStateToProps = (state) => ({
    esWorks: state.esWorks.isFetching ? [] : getCurrentData(state.esWorks.items.hits.hits, state.setCollection),
    esAuthors: state.esAuthors.isFetching ? [] : getCurrentData(state.esAuthors.items.hits.hits, state.setCollection),
    esSubjects: state.esSubjects.isFetching ? [] : getCurrentData(state.esSubjects.items.hits.hits, state.setCollection),
    browse: state.setBrowse,
    collapse: state.setCollapse,
    collection: state.setCollection,
    doc_id: state.detailModal.modalID,
    showModal: state.detailModal.show
})


const withN = new withNamespaces()(Items)
export default connect(mapStateToProps)(withN)
//export default Items