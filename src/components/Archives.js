import '../assets/sass/nlm/archives.scss'
import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import Sidebar from './Sidebar'
import Items from './Items'
import Hi from './Hi'

const Archives = ({ t, browse, match, history }) => {
    return (
        <React.Fragment>
            <Sidebar />
            <div className="content">
                <div className="grid">
                    <h1 className="archives-title">{`${t(
                        `browse.${browse}`
                    )}s`}</h1>
                    <Items match={match} history={history} />
                    <Hi show={false} />
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    browse: state.setBrowse,
})

const withN = new withNamespaces()(Archives)
export default connect(mapStateToProps)(withN)
