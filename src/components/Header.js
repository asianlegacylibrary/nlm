import React from 'react'

import Languages from './Languages'
import NavBar from './Nav'

export const Header = () => {
    return (
        <header id="header">
			{/* <a href="#menu">Menu</a> */}
			<Languages />
            <NavBar />
		</header>
    )
}