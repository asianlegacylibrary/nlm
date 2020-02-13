import React from 'react'
import { SectionLink } from '../../../components/SectionLink'
import buildExplore from '../sections/buildExplore'
import Img from '../sections/buildImg'

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

// use 't' variable to translate the labels (Author, etc)
export function buildWorkType(itemDetail, itemRelated, t, notes) {
    let {
        //workIsAbout,
        //workGenre,
        workNumberOfVolumes,
        workBiblioNote,
        //workCatalogInfo,
        workExtentStatement,
        workLangScript,
        workPublisherName,
        //workPublisherLocation,
        _manifestURL,
        _firstImageURL,
        //_creator,
    } = itemDetail

    let volumes = workNumberOfVolumes ? workNumberOfVolumes : null
    let attribution = workBiblioNote ? (
        <SectionLink label="biblio" section={workBiblioNote} />
    ) : null

    //let img = buildImg(t, _firstImageURL, _manifestURL) // _firstImageURL ? buildImg(t, _firstImageURL, _manifestURL) : null

    let pubName = workPublisherName ? (
        <SectionLink label="publisher" section={workPublisherName} />
    ) : null

    let explore = buildExplore(itemDetail, 'author', 'subject', 'genre')

    return (
        <React.Fragment>
            {!attribution ? null : (
                <div className="meta-detail attribution">
                    <div className="meta-item">
                        <span>{attribution}</span>
                    </div>
                </div>
            )}
            <Img t={t} _img={_firstImageURL} _manifestURL={_manifestURL} />
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
                                {t('details.meta-published-by')}:{' '}
                                <span className="no-trans">{pubName}</span>
                            </li>
                        )}
                        {!workExtentStatement ? null : (
                            <li className="meta-item all-caps">
                                {t('details.meta-work-extent')}:{' '}
                                <span className="no-trans">
                                    {workExtentStatement}, in{' '}
                                    {workNumberOfVolumes} volume(s)
                                </span>
                            </li>
                        )}
                        {!workLangScript ? null : (
                            <li className="meta-item all-caps">
                                {t('details.meta-language')}:{' '}
                                <span className="no-trans">
                                    {workLangScript}
                                </span>
                            </li>
                        )}
                    </ul>

                    {notes}
                </div>
                {explore ? (
                    <div className="col s12 m4 explore-items with-border">
                        <p className="title">Explore further</p>
                        {explore}
                    </div>
                ) : null}
            </div>
        </React.Fragment>
    )
}
