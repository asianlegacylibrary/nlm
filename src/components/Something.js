import React from 'react'
import { connect } from 'react-redux'

import Modal from './Modal'

import { fetchSpecificID, IIIFsuffix } from '../store/actions'

import '../assets/css/something.css'

const Something = ({related, dispatch, doc_id, showModal}) => {
    if(related == null) {
        return null
    }

    // fetch ID from ES and show modal
    const handleShowModal = (doc_id, resources = null, imageURL = null, manifestURL = null) => {
        dispatch(fetchSpecificID(doc_id))
        //this.props.dispatch(fetchResources(doc_id, resources))
        dispatch(
            { type: 'DETAIL_MODAL', modalID: doc_id, image: imageURL, manifest: manifestURL, show: true }
        )
    }

    // close modal and nullify the IIIF image so there's no flash
    // of previous image on next modal
    const handleHideModal = () => {
        dispatch({ type: 'DETAIL_MODAL', show: false})
        dispatch({ type: 'NULLIFY_IIIF'})
    }

    
    const relatedItems = related.hits.hits.map((d, i) => {
        const { _resources, _firstImageURL, _manifestURL } = d._source
        let imageURL = _firstImageURL === "Not Found" 
                ? null 
                : `${_firstImageURL}/${IIIFsuffix}`
        return (
            <div 
                key={i} 
                className="something-items card-item-link"
                onClick={() =>  handleShowModal(d._id, _resources, imageURL, _manifestURL)}
            >
                {d._tid}
            </div>
        )
    })
    return (
        <div>
            {relatedItems}
        {doc_id == null ? null : 
        <Modal 
            key={doc_id}
            hideModal={handleHideModal}
            doc_id={doc_id}
            show={showModal}
        />}
        </div>
    )
}

const mapStateToProps = (state) => ({
    doc_id: state.detailModal.modalID,
    showModal: state.detailModal.show
})

export default connect(mapStateToProps)(Something)
