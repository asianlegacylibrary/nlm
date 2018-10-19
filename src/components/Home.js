import React, { Component } from 'react';
import { connect } from 'react-redux';

//import Header from './Header';

class HomePage extends Component {

  render() {

    const nav = this.props.navigation.map(nav => {
      return (
        <li key={nav.slug} className="something">{nav.title}</li>
      );
    });

    const homepage = this.props.homepage.map(page => {
      return (
        <div>
          {page.title}
          <img alt={page.title} src={page.img} />
        </div>
      );
    });

    const posts = this.props.posts.map(post => {
      return (
        <div key={post.id}>
          <div>{post.title}</div>
          <div>{post.subtitle}</div>
          <div dangerouslySetInnerHTML={{__html: post.content}} />
          <img alt={post.title} src={post.img} />
        </div>
      );
    });

    return (
      <div className="container">
        {/* <Header /> */}
        <ul className="navbar">{nav}</ul>
        <div>{homepage}</div>
        <div className="content">{posts}</div>
      </div>
    );
  }

}

const currentLanguage = 'English';

const processPosts = (posts) => {
  return posts[currentLanguage].items.map(c => {
    return {
      id: c.id,
      title: c.acf.title,
      subtitle: c.acf.subtitle,
      content: c.content.rendered,
      img: c._embedded["wp:featuredmedia"][0].source_url
    }
  });
}

const processHomepage = (pages) => {
  return pages[currentLanguage].items
    .filter(h => h.slug === 'home')
    .map(h => {
      return {
        id: h.id,
        title: h.acf.title,
        subtitle: h.acf.subtitle,
        content: h.content.rendered,
        img: h._embedded["wp:featuredmedia"][0].source_url
      }
    }); 
};

const createNavigation = (pages) => {
  return pages[currentLanguage].items.map(c => {
    return {
      title: c.title.rendered,
      slug: c.slug,
      order: c.menu_order
    }
  });
}

const mapStateToProps = state => {
  console.log('STATE ', state);
  return {
    homepage: processHomepage(state.pagesByLanguage),
    posts: processPosts(state.postsByLanguage),
    navigation: createNavigation(state.pagesByLanguage)
  }
}

const Home = connect(mapStateToProps)(HomePage);

export default Home;

