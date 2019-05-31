import React from 'react'
import '../assets/css/items.css'

const SubItems = ({related, setImage, handleShowModal}) => {
    if(related == null) {
        return null
    }

    const relatedItems = related.hits.hits.map((d, i) => {
        const { _resources, _firstImageURL, _manifestURL, 'adm:access': _access } = d._source
        let imageURL = setImage(_firstImageURL, _access)
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
