import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavItem from '../containers/NavItem'
import { withNamespaces } from 'react-i18next'

//{ navigation, t, lang }
const NavBar = (props) => {
    // matching page nav with translated 'pages' object // t('pages')[nav.match] // obj[key]
    const slugs = props.navigation.map(nav => {
      //console.log('from nav', nav.match, props.t('pages')[nav.match])
      //const p = nav.match === 'home' ? '' : `/${props.t('pages')[nav.match]}`
      const p = nav.match === 'home' ? '' : `/${nav.match}`
        return (
          <NavItem key={nav.slug} selectedPage={nav.match}>
            <Link to={`/${props.lng}${p}`}>
              {props.t('pages')[nav.match]}
            </Link>
          </NavItem>
        );
      });
    return (
		<ul className="nav-list">
			{slugs}
		</ul>
    );
}

const createNavigation = (pages) => {
    return pages.map(c => {
        return {
          match: c.slug.substring(0,4),
          title: c.slug.substring(0,4) ==='home' ? 'Home' : c.title.rendered,
          slug: c.slug,
          order: c.menu_order
        }
      });
}

const mapStateToProps = (state) => ({
    navigation: createNavigation(state.pages.items[state.selectedLanguage]),
    lang: state.selectedLanguage,
    page: state.selectedPage
})

const withN = new withNamespaces()(NavBar)
export default connect(mapStateToProps)(withN)