import React from 'react'

import Languages from './Languages'
import NavBar from './Nav'

import '../assets/css/header.css'

export const Header = () => {
    return (
        <header id="header">
			<Languages />
            <NavBar />
		</header>
    )
}