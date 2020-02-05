import React from 'react'
import { ParseSection } from '../parseSection'
/*
BDRC, Person type

Available params:

CURRENTLY USED
_notes: 
_label: 

ADD NEXT
personGender: example, "bdr:GenderMale"
personTeacherOf: 
personStudentOf: 

NOT USED
- type: not being used, using code instead parsed from ID
- skos:prefLabel: prefLabel is coded to _label
- _resources: contains a list of all related id's, denormalized so not using yet
- _distance: between 0 and 4, was to distinguish between catalogued ids and related ids
- _collection: between 1 and 4, versions of the processed files in ES

- personName: not indexed, code NM, example "bdr:NM1E7B3C3CFB05", "bdr:NM94C57879237C"
- personEvent: not indexed, code EV, exmaple "bdr:EV7FB66BAD52BD"

*/

// use 't' variable to translate the labels (Author, etc)
export function buildSubjectType(itemDetail, t) {
    let { personGender, personTeacherOf, personStudentOf } = itemDetail

    // let topics = workIsAbout ? ParseSection(workIsAbout) : null
    // let genre = workGenre ? ParseSection(workGenre) : null
    // let volumes = workNumberOfVolumes ? workNumberOfVolumes : null
    // let attribution = workBiblioNote ? ParseSection(workBiblioNote) : null
    // let manifest = _manifestURL ? _manifestURL : null

    return (
        <div>
            {/* {attribution ? (
                <div className="meta-detail">
                    <p className="meta-item">
                        <span>{attribution}</span>
                    </p>
                </div>
            ) : null}
            {topics ? (
                <div className="related-items">Topics: {topics}</div>
            ) : null}
            {genre ? <div className="related-items">Genre: {genre}</div> : null}
            {volumes ? (
                <div className="related-items">
                    Number of Volumes: {volumes}
                </div>
            ) : null}

            {manifest ? (
                <div className="related-items">
                    <a target="_blank" href={manifest}>
                        {manifest}
                    </a>
                </div>
            ) : null} */}
        </div>
    )
}
