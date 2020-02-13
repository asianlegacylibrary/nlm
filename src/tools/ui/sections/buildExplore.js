import React from 'react'
import { SectionLinks } from '../../../components/SectionLinks'
import { constants } from '../../../store/_constants'
let { sectionLinks } = constants

export default (itemDetail, ...args) => {
    const items = args.map(a => {
        let node = sectionLinks.find(r => r.key === a)

        return (
            <SectionLinks key={a} label={a} section={itemDetail[node.node]} />
        )
    })

    return <React.Fragment>{items}</React.Fragment>
}
