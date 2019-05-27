import React from 'react'
import { connect } from 'react-redux'

//import Modal from './Modal'

import { fetchSpecificID, IIIFsuffix } from '../store/actions'

import '../assets/css/something.css'

const Something = ({related, dispatch}) => {
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
        </div>
    )
}

export default connect()(Something)
