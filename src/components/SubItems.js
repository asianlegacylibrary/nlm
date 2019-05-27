import React from 'react'
import { IIIFsuffix } from '../store/actions'
import '../assets/css/items.css'

const SubItems = ({related, handleShowModal}) => {
    if(related == null) {
        return null
    }

    const relatedItems = related.hits.hits.map((d, i) => {
        const { _resources, _firstImageURL, _manifestURL } = d._source
        let imageURL = _firstImageURL === "Not Found" 
                ? null 
                : `${_firstImageURL}/${IIIFsuffix}`
        return (
            <div 
                key={i} 
                className="subitems card-item-link"
                onClick={() =>  handleShowModal(d._id, d._tid, _resources, imageURL, _manifestURL)}
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

export default SubItems
