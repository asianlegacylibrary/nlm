import React from 'react'
import { SectionLink } from '../../../components/SectionLink'

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
export function buildPersonType(itemDetail, itemRelated, t, notes) {
    let { personTeacherOf, personStudentOf } = itemDetail

    const buildRelations = relation => {
        if (relation === 'teachers') {
            return personStudentOf.map((t, i) => {
                return (
                    <SectionLink
                        key={`teacher_${i}`}
                        label="Teacher"
                        section={t}
                    />
                )
            })
        } else if (relation === 'students') {
            return personTeacherOf.map((t, i) => {
                return (
                    <SectionLink
                        key={`student_${i}`}
                        label="Student"
                        section={t}
                    />
                )
            })
        }
    }

    const buildExplore = () => {
        if (itemRelated.hits.total > 0) {
            return itemRelated.hits.hits.map(r => {
                let u =
                    r._id.substring(0, 3) === 'bdr' ? r._id.substring(4) : r._id
                return (
                    <SectionLink
                        key={r._id}
                        label={u}
                        section={[{ _id: u, _value: r._source._label }]}
                    />
                )
            })
        }
    }

    let students = personTeacherOf ? buildRelations('students') : null
    let teachers = personStudentOf ? buildRelations('teachers') : null

    return (
        <div className="row flex no-margin">
            <div className="col s12 m8 bottom-items">
                {personTeacherOf ? (
                    <div className="meta-detail students">{students}</div>
                ) : null}
                {personStudentOf ? (
                    <div className="meta-detail teachers">{teachers}</div>
                ) : null}
                {notes}
            </div>

            <div className="col s12 m4 explore-items with-border">
                <p className="title">Explore further</p>
                {buildExplore()}
            </div>
            {/* {!_creator && !workIsAbout && !workGenre ? null : (
                <div className="col s12 m4 explore-items with-border">
                    <p className="title">Explore further</p>
                    {!_creator ? null : (
                        <React.Fragment>
                            <SectionLink label="Author" section={_creator} />
                            <div className="divider down-push" />
                        </React.Fragment>
                    )}

                    {!workIsAbout ? null : (
                        <React.Fragment>
                            <SectionLink label="Topic" section={workIsAbout} />
                            <div className="divider down-push" />
                        </React.Fragment>
                    )}

                    {!workGenre ? null : (
                        <SectionLink label="Genre" section={workGenre} />
                    )}
                </div>
            )} */}
        </div>
    )
}
