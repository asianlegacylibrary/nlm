import React from 'react'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'

import Sidebar from './Sidebar'
import Items from './Items'

import '../assets/css/archives.css'

/* of interest 

// ID & Category
@id - bdr:...
type (Work, Person, Topic)

// LINKS 
creatorMainAuthor
workCreator
workGenre
workIsAbout (can be an array)
workHasPart (usually array)

// For any of these, check the @language
// TIBETAN bo-x-ewts
note.noteText['@value']
['skos:prefLabel']['@value'] && ['@language']
workTitle['rdfs:label'] (can be an array)

// ENGLISH (might be)
workBiblioNote
workCatalogInfo

*/
const Archives = ({browse}) => {
    return (
            <div className="content">
                <Sidebar />
                <div className="grid">
                    <h1 className="archives-title">{`${browse}s`}</h1>
                    <Items />
                </div>
            </div>
        )
    }

const mapStateToProps = (state) => ({
    browse: state.setBrowse,
    collapse: state.setCollapse
})

const withN = new withNamespaces()(Archives)
export default connect(mapStateToProps)(withN)
