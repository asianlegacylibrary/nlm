import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

class Modal extends Component {

    unpackNames = (arr, type) => {
    
        if(Array.isArray(arr['rdfs:label'])) {
            
            const a = arr['rdfs:label'].map((l, i) => {
    
                return (
                    <p key={i} className="modal-text">
                        <span className="meta-italics">({l['@language']}): </span>
                        <span className="meta-title">{l['@value']}</span>
                    </p>
                )}
            )
    
            return (
                <div key={type} className="modal-text">
                    <span className="meta-detail">{type.split("Person")[1]}: </span>
                    {a}
                </div>
            )
    
        } else {
            return (
                <p key={type} className="modal-text">
                    <span className="meta-detail">{type.split("Person")[1]}: </span>
                    <span className="meta-italics">({arr['rdfs:label']['@language']}): </span>
                    <span className="meta-title">{arr['rdfs:label']['@value']}</span>
                </p>
            )
        }
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
                            <div onClick={() => this.showModal(a.split(":")[1])}>{a}</div>
                        </div> 
                    )
                } else {
                    return ( <div key={i} className="card-sub-item">{a}</div>)
                }
                
            })
        } else if (typeof arr === 'object') {
            // re-factor to allow for retreival of '@value' from any key
            if(arr.hasOwnProperty('type')) { 
                return this.unpackNames(arr, arr.type) 
            } else {
                return (
                    <p key={arr['@value']} className="modal-text">
                        <span className="meta-title">{arr['@value']}</span>
                    </p>
                )
            }
            
        } else if (typeof arr === 'string') {
            if(arr.substring(0,3) === 'bdr') {
                return ( <div onClick={() => this.showModal(arr.split(":")[1])}>{arr}</div> )
            } else {
                return arr
            }
            
        }
        
    }

    parseType = (source, hideModal, firstImage, t) => {
        let { 
            'skos:prefLabel': label,
            '@id': id,
            type,
            'workCatalogInfo': catalogInfo,
            personName,
            note,
            'adm:access': access
        } = source
    
        const metaDetail = (
            <p className="meta-detail">
                <span>{t('modal.detail')} {id}, </span>
                <span> {type}</span>
            </p>
        )

        const closeBtn = (
            <button className="modal-btn" onClick={hideModal}>
                <i className="fa fa-2x fa-times"></i> 
                {t('technical.btn-close')}
            </button>
        )

        // set undefined to null for pre-render check
        note !== undefined ? note = note.noteText : note = null
    
        switch(type) {
            case 'Person':  
                return (
                    <div className="detail-data">
                        {metaDetail}
                        <div className="modal-title">{ this.unpack(label) }</div>
                        <div className="">
                            <span className="lead-item">{t('modal.names')}: </span>
                            <span className="meta-catalog">{ this.unpack(personName) }</span>
                        </div>
                        {closeBtn}
                    </div>
                )
            case 'Topic':
                return (
                    <div className="detail-data">
                        {metaDetail}
                        <div className="modal-title">{ this.unpack(label) }</div>
                        {note === null ? null : (
                            <div className="meta-catalog">{t('modal.note')}: { note !== null ? this.unpack(note) : null }</div>
                        )}
                        {closeBtn}
                    </div>
                )
            case 'Work':
                let scanBtn = this.buildScansBtn(access, t)
                let img
                if(access === 'bdr:AccessRestrictedByTbrc') {
                    img = (
                        <div>{t('modal.image-restricted')}</div>
                    )
                } else if(firstImage === null || firstImage === undefined) {
                    img = (
                        <div className="blinky">{t('technical.loading-image')}</div>
                    )
                } else {
                    img = (
                        <img src={firstImage} width="100%" alt="scan" />
                    )
                }
                
                return (
                    <div className="detail-data">
                        <div className="modal-title">{ this.unpack(label) }</div>
                        
                        {metaDetail}
                        
                        {img}
                        
                        <div className="meta-catalog">{ this.unpack(catalogInfo) }</div>
                        
                        {closeBtn}{scanBtn}
                    </div>
                )
            default:
                return null
        }
    }

    buildScansBtn(access, t) {
        let btn = null
        if(this.props.manifestURL !== undefined) {
            localStorage.setItem("manifestURL", this.props.manifestURL)
            if(this.props.manifestURL.length === 0) {
                localStorage.setItem("manifestURL", "")
                btn = null
            } else if(access === 'bdr:AccessRestrictedByTbrc') {
                btn = (
                    <button disabled={true}>
                        <i className="fa fa-2x fa-eye-slash"></i> {t('modal.scans-restricted')}
                    </button>
                )
            } else {
                btn = (
                    <a target="_blank" href="/viewer.html">
                        <button>
                            <i className="fa fa-2x fa-eye"></i> {t('modal.scans')}
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
        
        if(Object.keys(this.props.workDetail).length > 0) {
            data = this.parseType(
                this.props.workDetail._source, 
                this.props.hideModal,
                this.props.firstImage,
                this.props.t)
        } else {
            data = <div className="blinky">{this.props.t('technical.loading')} {this.props.doc_id}</div>
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

const withN = withNamespaces()(Modal)
export default connect(mapStateToProps)(withN)
