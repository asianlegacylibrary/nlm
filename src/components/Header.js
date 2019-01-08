import React from 'react'

import Languages from './Languages'
import NavBar from './Nav'

export const Header = () => {
    return (
        <header id="header">
			<Languages />
            <NavBar />
		</header>
    )
}