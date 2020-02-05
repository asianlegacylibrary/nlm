import '../assets/sass/nlm/header.scss'
import React from 'react'

import Languages from './Languages'
import Nav from './Nav'

export default ({ history, match }) => {
    return (
        <React.Fragment>
            <header>
                <div className="section header">
                    <div className="row no-margin">
                        <Languages />
                        <Nav history={history} match={match} />
                    </div>
                </div>
            </header>
        </React.Fragment>
    )
}
