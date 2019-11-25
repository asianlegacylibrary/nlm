import React from 'react'

import Languages from './Languages'
import Nav from './Nav'
import Page from './Page'

import '../assets/css/header.css'

export default({ history, match }) => {
    
    return (
        <div className="wrapper">
            <header id="header">
                <Languages />
                <Nav history={history} match={match} />
            </header>
            <Page history={history} />
        </div>
    )
}