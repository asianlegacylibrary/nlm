import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './Header';
import NavBar from './Nav'

class Page extends Component {

  render() {
   
    const page = this.props.pages.map(page => {
      return (
        <section id="banner" key={page.id}>
            <header class="major">
                <span class="icon fa-code style3"></span>
                <h1>{page.title}</h1>
                <p dangerouslySetInnerHTML={{__html: page.content}} />
            </header>
            <ul class="actions">
                <li><a href="#1" class="button scrolly">Proceed</a></li>
            </ul>
        </section>
        
          
        //   <img alt={page.title} src={page.img} />
      );
    });
    
    const posts = this.props.posts.map((post, i) => {
        return (
            <section id={i} class="wrapper style1 special">
                <div class="inner">
                    <header class="major alt style2">
                        <h2>{post.title}</h2>
                        <p>{post.subtitle}</p>
                    </header>
                    <section class="split">
                        <article>
                            <h4>Sed imperdiet</h4>
                            <p dangerouslySetInnerHTML={{__html: post.content}} />
                            <ul class="actions">
                                <li><a href="#" class="button">Learn More</a></li>
                            </ul>
                        </article>
                        <article>
                            <h4>Magna Feugiat</h4>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla imperdiet, lorem in pretium aliquet, lacus dui tristique lacus, vel convallis justo lectus in augue. Tempus pellentesque iaculis imperdiet et elementum.</p>
                            <ul class="actions">
                                <li><a href="#" class="button">Learn More</a></li>
                            </ul>
                        </article>
                    </section>
                </div>
            </section>
        //   <img alt={post.title} src={post.img} />
      );
    });
    

    return (
        
      <div className="container">
        <Header />
        <div>{page}</div>
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

const processPages = (pages, currentPage) => {
  return pages.items
    .filter(h => h.slug.substring(0,4) === currentPage)
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
  if(state.page === 'home') {
      console.log('we home');
      return {
        pages: processPages(state.pagesByLanguage[state.language], state.page),
        posts: processPosts(state.postsByLanguage[state.language])
      }
  }
  return {
    pages: processPages(state.pagesByLanguage[state.language], state.page),
    posts: []
  }
}

export default connect(mapStateToProps)(Page);

//export default Home;

