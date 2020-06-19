import React from 'react'
import { SectionLink } from '../../../components/SectionLink'
import { constants } from '../../../store/_constants'

const { bdrGender } = constants

const buildGender = (personGender, t) => {
    // GENDER
    let gender =
        personGender == null
            ? null
            : `${t('gender.gender')}: ${t(
                  `gender.gender-${bdrGender[personGender]}`
              )}`
    if (gender) {
        return (
            <div className="meta-detail">
                <p className="meta-item">
                    <span>{gender}</span>
                </p>
            </div>
        )
    }
}

const buildParents = (father, mother, parent) => {
    let parents = []

    if (mother) {
        parents.push(
            <SectionLink key="mother" label="Mother" section={mother} />
        )
    }
    if (father) {
        parents.push(
            <SectionLink key="father" label="Father" section={father} />
        )
    }
    if (!mother && !father && parent) {
        parents.push(<div>Parents</div>)
        parent.forEach((p, i) => {
            parents.push(
                <SectionLink key={`parent_${i}`} label="Parent" section={p} />
            )
        })
    }
    if (parents.length > 0) {
        return <div className="meta-detail parents">{parents}</div>
    }
}

export function buildPersonalDetails(itemDetail, t) {
    let { personGender, hasFather, hasMother, hasParent } = itemDetail

    let gender = buildGender(personGender, t)
    let parents = buildParents(hasFather, hasMother, hasParent)

    return (
        <React.Fragment>
            <div>{gender}</div>
            <div>{parents}</div>
        </React.Fragment>
    )
}
