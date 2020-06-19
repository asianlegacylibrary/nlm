import React from 'react'
import { SectionLinks } from '../../../components/SectionLinks'
//import buildExplore from '../sections/buildExplore'
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
export function buildSubjectType(itemDetail, itemRelated, t, notes) {
    const buildRelatedItems = () => {
        return (
            <SectionLinks
                label={'work'}
                section={itemRelated.hits.hits}
                convert={true}
            />
        )
    }

    let works = itemRelated.hits.total > 0 ? buildRelatedItems() : null

    return (
        // main section for person: works and notes
        <div className="row flex no-margin">
            <div className="col s12 m7 bottom-items">{notes}</div>
            {/* explore section for person: teachers and students */}
            {works ? (
                <div className="col s12 m5 explore-items with-border">
                    <p className="title">Explore further</p>
                    {works}
                </div>
            ) : null}
        </div>
    )
}
