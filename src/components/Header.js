import '../assets/sass/nlm/header.scss'
import React from 'react'

import Languages from './Languages'
import Nav from './Nav'
import Page from './Page'

export default ({ history, match }) => {
    return (
        <React.Fragment>
            <header id="header">
                <Languages />
                <Nav history={history} match={match} />
            </header>
            <Page history={history} />
        </React.Fragment>
    )
}
