import React from 'react'

const unpack = (arr) => {
    if(arr === null) {
        return null
    } else if(Array.isArray(arr)) {
        return arr.map((a, i) => {
            if(typeof a === 'object') {
                return unpack(a)
            } else if(a.substring(0,3) === 'bdr') {
                return (
                    <div key={i} className="card-sub-item">
                        {/* <a onClick={() => this.handleClick(a.split(":")[1])} href={a}>{a}</a> */}
                        <a onClick={() => this.showModal(a.split(":")[1])} href={a}>{a}</a>
                    </div> 
                )
            } else {
                return ( <div key={i} className="card-sub-item">{a}</div>)
            }
            
        })
    } else if (typeof arr === 'object') {
        // re-factor to allow for retreival of '@value' from any key
        return (
            arr['@value']
        )
    } else if (typeof arr === 'string') {
        if(arr.substring(0,3) === 'bdr') {
            return ( <a onClick={() => this.showModal(arr.split(":")[1])} href={arr}>{arr}</a> )
        } else {
            return arr
        }
        
    }
    
}

const parseType = (source) => {
    let { 
        'skos:prefLabel': label,
        '@id': id,
        type
    } = source

    return (
        <div className="detail-data">
            <p className="meta-detail">
                <span>Detail for record {id}, </span>
                <span> {type}</span>
            </p>
            <h2>{ unpack(label) }</h2>
            
        </div>
    )

    // switch(type) {
    //     case 'Person':   
    //     case 'Topic':
    //     case 'Work':
    //     default:
    //         return null
    // }
}
// { handleClose, show, doc_id, children }
const Modal = ({ workDetail, hideModal, doc_id, show }) => {
    console.log('props from MODAL', workDetail)
    
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    let data
    
    if(Object.keys(workDetail).length > 0) {
        data = parseType(workDetail._source)
    } else {
        data = <div>LOADING {doc_id}</div>
    }
    
    return (
        
        <div className={showHideClassName}>
            <section className='modal-main'>
                {data}
                <button onClick={hideModal}>Close</button>
            </section>
        </div>
    )

}

export default Modal
