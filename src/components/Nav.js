import React from 'react'
import { connect } from 'react-redux'
import NavItem from '../containers/NavItem'

const NavBar = ({ navigation }) => {
    console.log(navigation);
    const slugs = navigation.map(nav => {
        return (
          <NavItem key={nav.slug} page={nav.match}>{nav.title}</NavItem>
        );
      });
    return (
		<ul class="nav-list">
			{slugs}
		</ul>
    );
}

const createNavigation = (pages) => {
    return pages.items.map(c => {
        return {
          match: c.slug.substring(0,4),
          title: c.title.rendered,
          slug: c.slug,
          order: c.menu_order
        }
      });
}

const mapStateToProps = (state) => ({
    navigation: createNavigation(state.pagesByLanguage[state.language])
})

export default connect(mapStateToProps)(NavBar)