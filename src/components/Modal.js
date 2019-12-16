import '../assets/sass/nlm/modal.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import i18n from 'i18next'
import { withNamespaces } from 'react-i18next'
import {
    log,
    IIIFsuffix,
    injectSinglePrefLabel,
    unpackPersonEvent,
    unpackPersonName,
    unpackNotes,
    unpackOntology,
    bdrGender,
    bdrObjectType,
    uniq,
} from '../store/actions'

class Modal extends Component {
    handleHideModal = (initialRender, e) => {
        this.props.dispatch({ type: 'SET_MODAL', show: false })

        if (initialRender) {
            this.props.history.push(`/${i18n.language}/archives`)
        } else {
            this.props.history.goBack()
        }

        e.stopPropagation()
    }

    buildImg = (t, access, _img) => {
        let img = null
        if (access === 'bdr:AccessRestrictedSealed') {
            img = <div>{t('modal.image-restricted')}</div>
        } else if (_img === 'Not Found') {
            img = <div>{t('modal.image-not-found')}</div>
        } else if (_img == null) {
            img = <div className="blinky">{t('technical.loading-image')}</div>
        } else {
            img = <img src={`${_img}/${IIIFsuffix}`} width="100%" alt="scan" />
        }
        return img
    }

    buildWorkMetadata = (source, t) => {
        let {
            workExtentStatement,
            workLangScript,
            workNumberOfVolumes,
            workObjectType,
            workPublisherName,
        } = source

        let objectType = workObjectType ? unpackOntology(workObjectType) : null
        let pubName = workPublisherName
            ? unpackOntology(workPublisherName)
            : null
        //let pubLoc = workPublisherLocation ? <span>{` at ${workPublisherLocation}`}</span> : null
        return (
            <ul className="meta-detail-list">
                {!objectType ? null : (
                    <li className="meta-item all-caps">
                        {t('modal.meta-print-type')}:{' '}
                        <span className="no-trans">
                            {bdrObjectType[objectType]}
                        </span>
                    </li>
                )}

                {!pubName ? null : (
                    <li className="meta-item all-caps">
                        {t('modal.meta-published-by')}:{' '}
                        <span className="no-trans">{pubName}</span>
                    </li>
                )}
                {!workExtentStatement ? null : (
                    <li className="meta-item all-caps">
                        {t('modal.meta-work-extent')}:{' '}
                        <span className="no-trans">
                            {workExtentStatement}, in {workNumberOfVolumes}{' '}
                            volume(s)
                        </span>
                    </li>
                )}
                {!workLangScript ? null : (
                    <li className="meta-item all-caps">
                        {t('modal.meta-language')}:{' '}
                        <span className="no-trans">{workLangScript}</span>
                    </li>
                )}
            </ul>
        )
    }

    buildAttribution = t => {
        return (
            <p className="meta-detail">
                <span>{t('archives.attribution')}</span>
            </p>
        )
    }

    buildScansBtn(access, t, manifestURL) {
        let btn = null
        if (manifestURL == null) {
            return null
        }
        if (manifestURL !== undefined) {
            //window.localStorage.setItem("manifestURL", this.props.manifestURL)
            if (manifestURL.length === 0) {
                //window.localStorage.setItem("manifestURL", "")
                btn = null
            } else if (access === 'restricted') {
                btn = (
                    <button disabled={true}>
                        <i className="fa fa-2x fa-eye-slash"></i>{' '}
                        {t('modal.scans-restricted')}
                    </button>
                )
            } else {
                btn = (
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                            process.env.PUBLIC_URL +
                            '/uv.html?manifest=' +
                            manifestURL
                        }
                    >
                        <button>
                            <i className="fa fa-2x fa-eye"></i>{' '}
                            {t('modal.scans')}
                        </button>
                    </a>
                )
            }
        }
        return btn
    }

    parseModalDetails = ({ workDetail, label, t }) => {
        // vars common to all types
        let source = workDetail._source
        let {
            '@id': id,
            type,
            note,
            _firstImageURL,
            _manifestURL,
            'adm:access': _access,
        } = source

        if (!label && source['skos:prefLabel']) {
            label = injectSinglePrefLabel(source['skos:prefLabel'])
        }
        //log('modal', showing)
        // map returned bdrc type to localization
        const typet = Object.keys(t('bdrc-ontology')).find(
            t => t === type.toLowerCase()
        )

        //set access to restricted if needed
        const access =
            _access == null || !_access.toLowerCase().includes('restricted')
                ? null
                : 'restricted'

        //if truthy, unpack, also nlm id is found in the notes section
        let parsedNotes = null,
            nlmIDs = null
        if (note) {
            ;({ parsedNotes, nlmIDs } = unpackNotes(note))
        }
        parsedNotes =
            !parsedNotes || !parsedNotes.length ? null : uniq(parsedNotes)
        // using react fragment here, look into what it does...
        const notes =
            !parsedNotes || !parsedNotes.length ? null : (
                <div className="meta-grouping">
                    {parsedNotes.map((s, i) => (
                        <React.Fragment key={i}>
                            <p className="meta-item with-fa-note">{s}</p>
                        </React.Fragment>
                    ))}
                </div>
            )
        // ultimately use this block to fetch proper attribution from data
        // workBiblioNote or workScanInfo
        const attribution = this.buildAttribution(t)

        // CLOSE BUTTON
        const closeBtn = (
            <button
                className="modal-btn"
                onClick={e => this.handleHideModal(this.props.initialRender, e)}
            >
                <i className="fa fa-2x fa-times"></i>
                {this.props.initialRender
                    ? t('technical.btn-view')
                    : t('technical.btn-close')}
            </button>
        )

        // META DETAILS, like type and IDs
        const metaDetail = (
            <div className="meta-detail">
                <p className="meta-item">
                    <span>
                        {t('modal.detail')} {id},{' '}
                    </span>
                    <span> {t(`bdrc-ontology.${typet}`)}</span>
                </p>
                {nlmIDs == null ? null : (
                    <p className="meta-item">
                        <span>NLM ID: {nlmIDs.substring(7).trim()}</span>
                    </p>
                )}
            </div>
        )

        // Render modal depending on type
        switch (type) {
            case 'Person':
                //vars specific to PERSON
                let { personEvent, personName, personGender } = source

                const buildPersonalDetails = (gender, lifeEvents) => {
                    return [gender, lifeEvents].forEach((d, i) => {
                        if (d) {
                            return (
                                <p key={i} className="meta-item">
                                    {d}
                                </p>
                            )
                        }
                    })
                }

                const buildWorkEvents = events => {
                    //log('build work pre', events)
                    const ev = events.map((e, i) => {
                        return (
                            <span key={i} className="spacer">
                                <a
                                    href={e._url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {e._id}
                                </a>
                            </span>
                        )
                    })
                    //log('build work events', ev)
                    return ev
                }

                // EVENTS
                const events =
                    personEvent == null ? null : unpackPersonEvent(personEvent)
                let lifeEvents = null,
                    workEvents = null
                //log('what does event array look like?', events)
                if (events) {
                    lifeEvents =
                        events[0].length > 0 ? uniq(events[0]).join(', ') : null
                    workEvents =
                        events[1].length > 0 ? buildWorkEvents(events[1]) : null
                }

                //log('workEvents', workEvents)
                // GENDER
                let gender =
                    personGender == null
                        ? null
                        : `${t('gender.gender')}: ${t(
                              `gender.gender-${bdrGender[personGender]}`
                          )}`

                //workEvents = workEvents == null ? null : workEvents
                let personalDetails =
                    gender || lifeEvents
                        ? buildPersonalDetails(gender, lifeEvents)
                        : null

                return (
                    <div className="detail-data">
                        {metaDetail}
                        <div className="modal-title">{label}</div>

                        {!personalDetails ? null : (
                            <div className="meta-detail">{personalDetails}</div>
                        )}
                        {!workEvents ? null : (
                            <div className="meta-detail">
                                {t('modal.geography-associated-places')}:
                                {workEvents}
                            </div>
                        )}
                        <div className="meta-grouping">
                            {unpackPersonName(personName)}
                        </div>
                        {notes}
                        {closeBtn}
                    </div>
                )
            case 'Topic':
                //vars specific to TOPIC, nothing noted as unique to TOPIC
                return (
                    <div className="detail-data">
                        {metaDetail}
                        <div className="modal-title">{label}</div>
                        {notes}
                        {closeBtn}
                    </div>
                )
            case 'Work':
                //vars specific to WORK

                let scanBtn = this.buildScansBtn(access, t, _manifestURL)
                let img = this.buildImg(t, access, _firstImageURL)

                let workMetadata = this.buildWorkMetadata(source, t)

                let catalog = unpackOntology(source.workCatalogInfo)

                const catalogInfo = !catalog ? null : (
                    <div className="meta-catalog">
                        <p className="modal-text">
                            <span className="meta-title">{catalog}</span>
                        </p>
                    </div>
                )

                return (
                    <div className="detail-data">
                        <div className="modal-title">{label}</div>

                        {metaDetail}

                        {img}
                        {attribution}

                        {catalogInfo}
                        {workMetadata}
                        {notes}
                        {closeBtn}
                        {scanBtn}
                    </div>
                )
            default:
                return null
        }
    }

    render() {
        log(
            'modal is being rendered...more than once? need memoized selector!',
            this.props
        )
        let showHideClassName = this.props.show
            ? 'modal display-block'
            : 'modal display-none'

        if (Object.keys(this.props.workDetail).length === 0) {
            return (
                <div className={showHideClassName}>
                    <section className="modal-main">
                        <div className="blinky">
                            {this.props.t('technical.loading')}{' '}
                            {this.props.doc_id}
                        </div>
                        <button
                            className="modal-btn"
                            onClick={this.props.hideModal}
                        >
                            <i className="fa fa-2x fa-times"></i>
                            {this.props.initialRender
                                ? this.props.t('technical.btn-view')
                                : this.props.t('technical.btn-close')}
                        </button>
                    </section>
                </div>
            )
        }

        return (
            <div className={showHideClassName}>
                <section className="modal-main">
                    {this.parseModalDetails(this.props)}
                </section>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    //modalDetails: state.detailData.isFetching || state.detailData.modalID === 0 ? {} : state.detailModal,
    workDetail:
        state.details.isFetching || state.modal.modalID === 0
            ? {}
            : state.details.item.hits.hits[0],
    numberVolumes:
        state.details.isFetching || state.modal.modalID === 0
            ? null
            : state.details.item.hits.hits[0]._source.workNumberOfVolumes,
    initialRender: !!state.modal.initialRender
        ? state.modal.initialRender
        : false,
    // resources:
    //     state.detailData.resources === 'undefined' ||
    //     state.detailData.resources.isFetching
    //         ? null
    //         : state.detailData.resources.items,
})

const withN = withNamespaces()(Modal)
export default connect(mapStateToProps)(withN)
