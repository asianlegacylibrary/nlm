import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavItem from './containers/NavItem'
import { withNamespaces } from 'react-i18next'

const NavBar = (props) => {
  
  // THIS NAV BAR GETS RENDERED TOO MUCH, NEED TO REFACTOR
  //log('creating navbar with props', props.navigation)
    // matching page nav with translated 'pages' object // t('pages')[nav.match] // obj[key]
    const slugs = props.navigation.map(nav => {
      const p = nav.match === 'home' ? '' : `/${nav.match}`
        return (
          <Link key={nav.slug} to={`/${props.lng}${p}`}>
            <NavItem key={nav.slug} selectedPage={nav.match}>
              {props.t('pages')[nav.match]}
            </NavItem>
          </Link>
        )
      })

    return (
		<ul className="nav-list">
			{slugs}
		</ul>
    )

}

const createNavigation = (pages) => {
  
    return pages.map(c => {
        return {
          //match: c.slug.substring(0,4),
          match: c.slug.split('-')[0],
          title: c.slug.substring(0,4) ==='home' ? 'Home' : c.title.rendered,
          slug: c.slug,
          order: c.menu_order
        }
      })
      
}

const mapStateToProps = (state) => ({
    navigation: createNavigation(state.pages.items[state.selectedLanguage]),
    lang: state.selectedLanguage,
    page: state.selectedPage
})

const withN = new withNamespaces()(NavBar)
export default connect(mapStateToProps)(withN)