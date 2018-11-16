import React from 'react'

const unpackNames = (arr, type) => {
    //console.log('names ', typeof(arr['rdfs:label']), arr['rdfs:label'])
    if(Array.isArray(arr['rdfs:label'])) {
        //console.log('WTF i array', arr['rdfs:label'])
        const a = arr['rdfs:label'].map(l => {
            //console.log('mapping', l)
            return (
                <p className="modal-text">
                    <span className="meta-italics">({l['@language']}): </span>
                    <span className="meta-title">{l['@value']}</span>
                </p>
            )})
            return (
                <div className="modal-text">
                    <span className="meta-detail">{type.split("Person")[1]}: </span>
                    {a}
                </div>
            )
    } else {
        return (
            <p className="modal-text">
                <span className="meta-detail">{type.split("Person")[1]}: </span>
                <span className="meta-italics">({arr['rdfs:label']['@language']}): </span>
                <span className="meta-title">{arr['rdfs:label']['@value']}</span>
            </p>
        )
    }

    // return (
    //     <p className="modal-text">
    //         <span className="meta-detail">{arr.type.split("Person")[1]}: </span>
    //         <span className="meta-italics">({arr['rdfs:label']['@language']}): </span>
    //         <span className="meta-title">{arr['rdfs:label']['@value']}</span>
    //     </p>
       
    // )
}

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
        if(arr.hasOwnProperty('type')) { 
            return unpackNames(arr, arr.type) 
        } else {
            return (
                <p key={arr['@value']} className="modal-text">
                    <span className="meta-italics">({arr['@language']}): </span>
                    <span className="meta-title">{arr['@value']}</span>
                </p>
               
            )
        }
        
    } else if (typeof arr === 'string') {
        if(arr.substring(0,3) === 'bdr') {
            return ( <a onClick={() => this.showModal(arr.split(":")[1])} href={arr}>{arr}</a> )
        } else {
            return arr
        }
        
    }
    
}

const parseType = (source, hideModal) => {
    let { 
        'skos:prefLabel': label,
        '@id': id,
        type,
        'workCatalogInfo': catalogInfo,
        personName,
        note
    } = source

    // set undefined to null for pre-render check
    note !== undefined ? note = note.noteText : note = null

    switch(type) {
        case 'Person':  
            return (
                <div className="detail-data">
                    <p className="meta-detail">
                        <span>Detail for record {id}, </span>
                        <span> {type}</span>
                    </p>
                    <div className="modal-title">{ unpack(label) }</div>
                    <div className="">
                        <span className="lead-item">Name(s): </span>
                        <span className="meta-catalog">{ unpack(personName) }</span>
                    </div>
                    <button onClick={hideModal}>Close</button>
                </div>
            )
        case 'Topic':
            return (
                <div className="detail-data">
                    <p className="meta-detail">
                        <span>Detail for record {id}, </span>
                        <span> {type}</span>
                    </p>
                    <div className="modal-title">{ unpack(label) }</div>
                    {note === null ? null : (
                        <div className="meta-catalog">Note: { note !== null ? unpack(note) : null }</div>
                    )}
                    <button onClick={hideModal}>Close</button>
                </div>
            )
        case 'Work':
            return (
                <div className="detail-data">
                    <p className="meta-detail">
                        <span>Detail for record {id}, </span>
                        <span> {type}</span>
                    </p>
                    <div className="modal-title">{ unpack(label) }</div>
                    <div className="meta-catalog">{ unpack(catalogInfo) }</div>
                    <button onClick={hideModal}>Close</button>
                </div>
            )
        default:
            return null
    }
}

const Modal = ({ workDetail, hideModal, doc_id, show }) => {
    //console.log('props from MODAL', workDetail)
    
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
    let data
    
    if(Object.keys(workDetail).length > 0) {
        data = parseType(workDetail._source, hideModal)
    } else {
        data = <div>LOADING {doc_id}</div>
    }
    
    return (
        
        <div 
            className={showHideClassName}
            onClick={hideModal}
        >
            <section className='modal-main'>
                {data}
            </section>
        </div>
    )

}

export default Modal
