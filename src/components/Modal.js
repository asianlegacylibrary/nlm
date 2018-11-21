import React, { Component } from 'react'
import { connect } from 'react-redux'

const unpackNames = (arr, type) => {
    //console.log('names ', typeof(arr['rdfs:label']), arr['rdfs:label'])
    if(Array.isArray(arr['rdfs:label'])) {
        //console.log('WTF i array', arr['rdfs:label'])
        const a = arr['rdfs:label'].map((l, i) => {
            //console.log('mapping', l)
            return (
                <p key={i} className="modal-text">
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





// { hideModal, doc_id, show, workDetail, manifestURL}
class Modal extends Component {

    componentWillMount() {
        console.log('props from MODAL, mounted', this.props)
    }

    unpack = (arr) => {
        if(arr === null) {
            return null
        } else if(Array.isArray(arr)) {
            return arr.map((a, i) => {
                if(typeof a === 'object') {
                    return this.unpack(a)
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

    parseType = (source, hideModal, firstImage) => {
        let { 
            'skos:prefLabel': label,
            '@id': id,
            type,
            'workCatalogInfo': catalogInfo,
            personName,
            note,
            'adm:access': access
            //'workHasItemImageAsset': imageAsset,
            //'workHasItem': volumeAsset,
            //'workNumberOfVolumes': volumes
        } = source
    
        console.log("ACCESS!", access)

        let btn = this.buildScansBtn(access)

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
                        <div className="modal-title">{ this.unpack(label) }</div>
                        <div className="">
                            <span className="lead-item">Name(s): </span>
                            <span className="meta-catalog">{ this.unpack(personName) }</span>
                        </div>
                        <button className="modal-btn" onClick={hideModal}>Close</button>
                    </div>
                )
            case 'Topic':
                return (
                    <div className="detail-data">
                        <p className="meta-detail">
                            <span>Detail for record {id}, </span>
                            <span> {type}</span>
                        </p>
                        <div className="modal-title">{ this.unpack(label) }</div>
                        {note === null ? null : (
                            <div className="meta-catalog">Note: { note !== null ? this.unpack(note) : null }</div>
                        )}
                        <button className="modal-btn" onClick={hideModal}>Close</button>
                    </div>
                )
            case 'Work':
                
                return (
                    <div className="detail-data">
                        <img src={firstImage} width="100%" alt="scan" />
                        <p className="meta-detail">
                            <span>Detail for record {id}, </span>
                            <span> {type}</span>
                        </p>
                        <div className="modal-title">{ this.unpack(label) }</div>
                        <div className="meta-catalog">{ this.unpack(catalogInfo) }</div>
                        <button className="modal-btn" onClick={hideModal}>
                            <i className="fa fa-2x fa-times"></i> 
                             Close
                        </button>
                        {btn}
                    </div>
                )
            default:
                return null
        }
    }

    buildScansBtn(access) {
        let btn = null
        if(this.props.manifestURL !== undefined) {
            localStorage.setItem("manifestURL", this.props.manifestURL)
            if(this.props.manifestURL.length === 0) {
                localStorage.setItem("manifestURL", "")
                btn = null
            } else if(access === 'bdr:AccessRestrictedByTbrc') {
                btn = (
                    <button disabled={true}>
                        <i className="fa fa-2x fa-eye-slash"></i> Scans Restricted
                    </button>
                )
            } else {
                btn = (
                    <a target="_blank" href="/viewer.html">
                        <button>
                            <i className="fa fa-2x fa-eye"></i> SCANS
                        </button>
                    </a>
                )
            }
        }
        return btn
    }
    
    render() {
        const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
        let data
        console.log('on this render i have volumes, ', this.props.numberVolumes)
    
        //this.buildScansBtn()
        
        
        if(Object.keys(this.props.workDetail).length > 0) {
            data = this.parseType(
                this.props.workDetail._source, 
                this.props.hideModal,
                this.props.firstImage)
        } else {
            data = <div>LOADING {this.props.doc_id}</div>
        }
        return ( 
            <div 
                className={showHideClassName}
                onClick={this.props.hideModal}
            >
                <section className='modal-main'>
                    {data}
                </section>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    workDetail: state.detailData.isFetching || state.detailModal.modalID === 0 ? {} : state.detailData.item.hits.hits[0],
    manifestURL: state.manifestData.isFetching || state.detailData.isFetching ? '' : state.manifestData.manifestURL,
    numberVolumes: state.detailData.isFetching || state.detailModal.modalID === 0 ? null : state.detailData.item.hits.hits[0]._source.workNumberOfVolumes,
    firstImage: state.IIIFData.isFetching || state.detailModal.modalID === 0 ? null : state.IIIFData.firstImage
})

export default connect(mapStateToProps)(Modal)
