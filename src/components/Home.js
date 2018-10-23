import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './Header';
import NavBar from './Nav'

class Page extends Component {

  render() {
   
    const homepage = this.props.homepage.map(page => {
      return (
        <div key={page.id}>
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
        <Header />
        <NavBar />
        <div>{homepage}</div>
        <div className="content">{posts}</div>
      </div>
    );
  }

}

const processPosts = (posts) => {
  return posts.items.map(c => {
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
  return pages.items
    .filter(h => h.slug.substring(0,4) === 'home')
    .map(h => {
      return {
        id: h.id,
        title: h.acf.title,
        subtitle: h.acf.subtitle,
        content: h.content.rendered,
        img: h._embedded["wp:featuredmedia"][0].source_url
      }
    }); 
}

const mapStateToProps = state => {
  //console.log('STATE ', state);
  return {
    homepage: processHomepage(state.pagesByLanguage[state.language]),
    posts: processPosts(state.postsByLanguage[state.language])
  }
}

export default connect(mapStateToProps)(Page);

//export default Home;

