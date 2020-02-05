import React from 'react'
import { SectionLink } from '../../../components/SectionLink'
//import { parseSection } from '../parseSection'
//import parseAgain from '../parseAgain'
//import { unpackOntology } from '../../ontology'
import { constants } from '../../../store/_constants'
let { IIIFsuffix } = constants
/*
BDRC, Work type

Available params:

- @id: "bdr:W1NLM116"

CURRENTLY USED
- workIsAbout
- workGenre
- workNumberOfVolumes
- _label
_firstImageURL: "https://iiif.bdrc.io/bdr:V1NLM116_I1NLM116_001::I1NLM116_0010001.jpg"
- _notes
- workBiblioNote: use for attribution
- workCatalogInfo: or is it this?
- workLangScript: "bdr:BoDbuCan", do I need to re-run script to process this node?
- _creator: this is the author (or main 'creator')
- _manifestURL: use for IIIF manifest
- workExtentStatement: refers to folios?, like "10 ff., 56 ff."
- workDimensions: not sure what the units are, like "33x9"
- workPublisherName
- workPublisherLocation

NOT USED
- type: not being used, using code instead parsed from ID
- skos:prefLabel: prefLabel is coded to _label
- workTitle: using _label instead
- workEvent: current codes 'E' not indexed, like "bdr:EVE3FCA4EF15FC"
- workHasItem: points to the image resource json, like "bdr:I1NLM116"
- _resources: contains a list of all related id's, denormalized so not using yet
- _distance: between 0 and 4, was to distinguish between catalogued ids and related ids
- _collection: between 1 and 4, versions of the processed files in ES

*/

function buildScansBtn(t, manifestURL) {
    let btn = null
    if (manifestURL == null) {
        return null
    }
    if (manifestURL !== undefined) {
        //window.localStorage.setItem("manifestURL", this.props.manifestURL)
        if (manifestURL.length === 0) {
            //window.localStorage.setItem("manifestURL", "")
            btn = null
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
                        <i className="fa fa-2x fa-eye"></i> {t('modal.scans')}
                    </button>
                </a>
            )
        }
    }
    return btn
}

//SCANS button on the img itself
function buildImg(t, _img, _manifestURL) {
    let img = null
    let manifest = _manifestURL
        ? process.env.PUBLIC_URL + '/uv.html?manifest=' + _manifestURL
        : null
    if (_img === 'Not Found') {
        img = <div>{t('modal.image-not-found')}</div>
    } else if (_img == null) {
        img = <div className="blinky">{t('technical.loading-image')}</div>
    } else {
        if (manifest) {
            img = (
                <a href={manifest} target="_blank" rel="noopener noreferrer">
                    <img
                        src={`${_img}/${IIIFsuffix}`}
                        width="100%"
                        alt="scan"
                    />
                </a>
            )
        } else {
            img = <img src={`${_img}/${IIIFsuffix}`} width="100%" alt="scan" />
        }
    }
    return img
}

// use 't' variable to translate the labels (Author, etc)
export function buildWorkType(itemDetail, t, notes) {
    let {
        workIsAbout,
        workGenre,
        workNumberOfVolumes,
        workBiblioNote,
        //workCatalogInfo,
        workExtentStatement,
        workLangScript,
        workPublisherName,
        //workPublisherLocation,
        _manifestURL,
        _firstImageURL,
        _creator,
    } = itemDetail

    let volumes = workNumberOfVolumes ? workNumberOfVolumes : null
    let attribution = workBiblioNote ? (
        <SectionLink label="biblio" section={workBiblioNote} />
    ) : null

    let img = _firstImageURL ? buildImg(t, _firstImageURL, _manifestURL) : null

    let pubName = workPublisherName ? (
        <SectionLink label="publisher" section={workPublisherName} />
    ) : null

    return (
        <div>
            {!attribution ? null : (
                <div className="meta-detail attribution">
                    <div className="meta-item">
                        <span>{attribution}</span>
                    </div>
                </div>
            )}
            {img}
            <div className="row flex no-margin">
                <div className="col s12 m8 bottom-items">
                    <ul className="meta-detail-list">
                        {!volumes ? null : (
                            <li className="meta-item all-caps">
                                Number of Volumes: {volumes}
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
                                    {workExtentStatement}, in{' '}
                                    {workNumberOfVolumes} volume(s)
                                </span>
                            </li>
                        )}
                        {!workLangScript ? null : (
                            <li className="meta-item all-caps">
                                {t('modal.meta-language')}:{' '}
                                <span className="no-trans">
                                    {workLangScript}
                                </span>
                            </li>
                        )}
                    </ul>

                    {notes}
                </div>
                {!_creator && !workIsAbout && !workGenre ? null : (
                    <div className="col s12 m4 explore-items with-border">
                        <p className="title">Explore further</p>
                        {!_creator ? null : (
                            <React.Fragment>
                                <SectionLink
                                    label="Author"
                                    section={_creator}
                                />
                                <div className="divider down-push" />
                            </React.Fragment>
                        )}

                        {!workIsAbout ? null : (
                            <React.Fragment>
                                <SectionLink
                                    label="Topic"
                                    section={workIsAbout}
                                />
                                <div className="divider down-push" />
                            </React.Fragment>
                        )}

                        {!workGenre ? null : (
                            <SectionLink label="Genre" section={workGenre} />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
