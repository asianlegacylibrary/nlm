import React from 'react'

import Languages from './Languages'
import NavBar from './Nav'
import Page from './Page'

import '../assets/css/header.css'

export default({ history }) => {
    
    return (
        <div className="wrapper">
        <header id="header">
			<Languages />
            <NavBar history={history} />
		</header>
        <Page />
        </div>
    )
}