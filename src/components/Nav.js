import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import NavItem from '../containers/NavItem'

const NavBar = ({ navigation }) => {
    //console.log(navigation);
    const slugs = navigation.map(nav => {
        return (
          <NavItem key={nav.slug} selectedPage={nav.match}><Link to={nav.slug}>{nav.title}</Link></NavItem>
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
    //navigation: createNavigation(state.pagesByLanguage[state.selectedLanguage])
    navigation: createNavigation(state.pages.items[state.selectedLanguage])
})

export default connect(mapStateToProps)(NavBar)