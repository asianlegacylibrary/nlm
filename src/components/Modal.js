import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { log, 
    unpackPersonEvent, unpackPersonName, unpackNotes, unpackOntology,
    bdrGender, bdrObjectType } from '../store/actions'
import '../assets/css/modal.css'

class Modal extends Component {

    buildImg = (t, access, firstImage) => {
        let img = null
        if(access === 'restricted') {
            img = (
                <div>{t('modal.image-restricted')}</div>
            )
        } //else if(firstImage === 'No Image') { img = null } 
          else if(firstImage === 'Not Found') {
            img = (
                <div>{t('modal.image-not-found')}</div>
            )
        } else if(firstImage == null) {
            img = (
                <div className="blinky">{t('technical.loading-image')}</div>
            )
        } else {
            img = (
                <img src={firstImage} width="100%" alt="scan" />
            )
        }
        return img
    }

    buildWorkMetadata = (source) => {
        let {
            workExtentStatement,
            workLangScript,
            workNumberOfVolumes,
            workObjectType,
            workPublisherName
        } = source

        let objectType = workObjectType ? unpackOntology(workObjectType) : null
        let pubName = workPublisherName ? unpackOntology(workPublisherName) : null
        //let pubLoc = workPublisherLocation ? <span>{` at ${workPublisherLocation}`}</span> : null
        return (
            <ul className="meta-detail-list">
                {!objectType ? null : <li className="meta-item all-caps">Print type: <span className="no-trans">{bdrObjectType[objectType]}</span></li>}
                
                {!pubName ? null : <li className="meta-item all-caps">Published by: <span className="no-trans">{pubName}</span></li>}
                {!workExtentStatement ? null : 
                    <li className="meta-item all-caps">Work extent: <span className="no-trans">{workExtentStatement}, in {workNumberOfVolumes} volume(s)</span></li>
                }
                {!workLangScript ? null : <li className="meta-item all-caps">Language: <span className="no-trans">{workLangScript}</span></li>}
            </ul>
        )
    }

    buildAttribution = (t) => {
        return (
            <p className="meta-detail">
                <span>{t('archives.attribution')}</span>
            </p>
        )
    }

    buildScansBtn(access, t) {
        let btn = null
        if(this.props.manifestURL == null) {
            return null
        }
        if(this.props.manifestURL !== undefined) {
            //window.localStorage.setItem("manifestURL", this.props.manifestURL)
            if(this.props.manifestURL.length === 0) {
                //window.localStorage.setItem("manifestURL", "")
                btn = null
            } else if(access === 'restricted') {
                btn = (
                    <button disabled={true}>
                        <i className="fa fa-2x fa-eye-slash"></i> {t('modal.scans-restricted')}
                    </button>
                )
            } else {
                btn = ( 
                    <a 
                        target="_blank" 
                        rel="noopener noreferrer"
                        href={process.env.PUBLIC_URL + '/uv.html?manifest=' + this.props.manifestURL}>
                        <button>
                            <i className="fa fa-2x fa-eye"></i> {t('modal.scans')}
                        </button>
                    </a>
                )
            }
        }
        return btn
    }

    parseModalDetails = ({ modalDetails, workDetail, hideModal, firstImage, t }) => {
        // vars common to all types
        let source = workDetail._source
        let { 
            '@id': id,
            type,
            note,
            'adm:access': _access
        } = source

        //set access to restricted if needed
        const access = _access == null || !_access.toLowerCase().includes('restricted') ? null : 'restricted'

        //if truthy, unpack, also nlm id is found in the notes section
        let parsedNotes = null, nlmIDs = null
        if(note) { ({ parsedNotes, nlmIDs } = unpackNotes(note)) }

        // using react fragment here, look into what it does...
        const notes = !parsedNotes || !parsedNotes.length ? null : (
            <div className="meta-grouping"> 
                { parsedNotes.map(s => 
                    <React.Fragment>
                        <p className="meta-item with-fa-note">{s}</p>
                    </React.Fragment>)
                }
            </div> 
        )
        // ultimately use this block to fetch proper attribution from data
        // workBiblioNote or workScanInfo
        const attribution = this.buildAttribution(t)

        // CLOSE BUTTON
        const closeBtn = (
            <button className="modal-btn" onClick={hideModal}>
                <i className="fa fa-2x fa-times"></i> 
                {t('technical.btn-close')}
            </button>
        )

        // META DETAILS, like type and IDs
        const metaDetail = (
            <div className="meta-detail">
                <p className="meta-item">
                    <span>{t('modal.detail')} {id}, </span>
                    <span> {type}</span>
                </p>
                { nlmIDs == null ? null : 
                <p className="meta-item">
                    <span>NLM ID: {nlmIDs.substring(7).trim()}</span>
                </p>
                }
            </div>
        ) 

        // Render modal depending on type
        switch(type) {
            case 'Person':
                //vars specific to PERSON
                let {
                    personEvent,
                    personName,
                    personGender
                } = source

                const buildPersonalDetails = (gender, lifeEvents, workEvents) => {
                    return [gender, lifeEvents, workEvents].map(d => {
                        if(d) { return <p className="meta-item">{ d }</p> }
                    })
                }

                // EVENTS
                const events = personEvent == null ? null : unpackPersonEvent(personEvent)
                let lifeEvents = null, workEvents = null
                if(events) {
                    lifeEvents = events[0].length > 0 ? events[0].join(', ') : null
                    workEvents = events[1].length > 0 ? events[1].join(', ') : null
                }
                // GENDER
                let gender = personGender == null ? null : `Gender: ${bdrGender[personGender]}`

                let personalDetails = gender || lifeEvents || workEvents ?
                    buildPersonalDetails(gender, lifeEvents, workEvents) : null
                
                return (
                    <div className="detail-data">
                        {metaDetail}
                        <div className="modal-title">{modalDetails.label}</div>

                        {!personalDetails ? null : <div className="meta-detail">{personalDetails}</div> }
                        <div className="meta-grouping">
                            { unpackPersonName(personName) }
                        </div>
                        { notes }
                        {closeBtn}
                    </div>
                )
            case 'Topic':
                //vars specific to TOPIC, nothing noted as unique to TOPIC
                return (
                    <div className="detail-data">
                        {metaDetail}
                        <div className="modal-title">{modalDetails.label}</div>
                        { notes }
                        {closeBtn}
                    </div>
                )
            case 'Work':
                //vars specific to WORK
                
                let scanBtn = this.buildScansBtn(access, t)
                let img = this.buildImg(t, access, firstImage)

                let workMetadata = this.buildWorkMetadata(source)

                let catalog = unpackOntology(source.workCatalogInfo)

                const catalogInfo = !catalog ? null : (
                    <div className="meta-catalog">
                            <p className="modal-text">
                                <span className="meta-title">{ catalog }</span>
                            </p>
                        </div>
                )

                return (
                    <div className="detail-data">
                        <div className="modal-title">{modalDetails.label}</div>
                        
                        {metaDetail}
                        
                        {img}
                        {attribution}
                        
                        { catalogInfo }
                        { workMetadata }
                        { notes }
                        {closeBtn}{scanBtn}
                    </div>
                )
            default:
                return null
        }
    }

    render() {
        log('modal is being rendered...more than once? need memoized selector!')
        const showHideClassName = this.props.show ? 'modal display-block' : 'modal display-none';
        //let data

        if(Object.keys(this.props.workDetail).length === 0) {
            return (
                <div className={showHideClassName}>
                    <section className='modal-main'>
                        <div className="blinky">{this.props.t('technical.loading')} {this.props.doc_id}</div>
                        <button className="modal-btn" onClick={this.props.hideModal}>
                            <i className="fa fa-2x fa-times"></i> 
                            {this.props.t('technical.btn-close')}
                        </button>
                    </section>
                </div>
            )
        }
        return (
            <div className={showHideClassName}>
                <section className='modal-main'>
                    { this.parseModalDetails(this.props) }
                </section>
            </div>
        )
    }

}

const mapStateToProps = (state) => ({
    modalDetails: state.detailData.isFetching || state.detailData.modalID === 0 ? {} : state.detailModal,
    workDetail: state.detailData.isFetching || state.detailModal.modalID === 0 ? {} : state.detailData.item.hits.hits[0],
    resources: state.esResources.isFetching ? [] : state.esResources,
    firstImage: state.detailModal.image == null ? null : state.detailModal.image,
    manifestURL: state.detailModal.manifest,
    numberVolumes: state.detailData.isFetching || state.detailModal.modalID === 0 ? null : state.detailData.item.hits.hits[0]._source.workNumberOfVolumes,
})

const withN = withNamespaces()(Modal)
export default connect(mapStateToProps)(withN)
