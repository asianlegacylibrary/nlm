import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import Sidebar from './Sidebar'
import Items from './Items'

import '../assets/css/archives.css'

const Archives = ({t, browse, match, history}) => {
    console.log('ARCHIVES', match)
    console.log('ARCHIVES', history)
    return (
            <div className="content">
                <Sidebar />
                <div className="grid">
                    <h1 className="archives-title">{`${t(`browse.${browse}`)}s`}</h1>
                    <Items />
                </div>
            </div>
        )
    }

const mapStateToProps = (state) => ({
    browse: state.setBrowse
})

const withN = new withNamespaces()(Archives)
export default connect(mapStateToProps)(withN)
