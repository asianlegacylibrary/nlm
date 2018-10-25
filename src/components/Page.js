import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './Header';
import { Footer } from './Footer';

class Page extends Component {

  constructor(props) {
    super(props);

    this.setNumber = {
      0: 'one',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four'
    }

  }

  resetPage = () => {
    this.props.dispatch({ type: 'SET_PAGE', page: 'home' });
  }

  renderPage(selectedPage, pages) {
    if (!pages.some(e => e.slug.substring(0,4) === selectedPage)) {
      console.log('page not there');
      this.resetPage();
    }
    return pages
      .filter(page => page.slug.substring(0,4) === selectedPage)
      .map(page => {
        const mediaURL = page._embedded["wp:featuredmedia"][0].source_url
      return (
        <section 
          id="banner" 
          key={page.id}
          style={{
            backgroundImage: `url(${mediaURL}`
          }}>
          <header className="major">
            <span className="icon fa-angellist style7"></span>
            <h1>{page.acf.title}</h1>
            <h3>{page.acf.subtitle}</h3>
          </header>
          <ul className="actions">
            <li><a href="#1" className="button scrolly">Proceed</a></li>
          </ul>
        </section>   
      )
    })
  }

  renderPosts(selectedPage, posts) {
    if(selectedPage === 'home') {
      if(posts) {
        //console.log(posts);
      return posts.map((post, i) => {
        let j = i % 2 === 0 ? 1 : 3;
        //console.log('i IS ', i)
        let mediaURL = ""
        if(post._embedded["wp:featuredmedia"]) {
          mediaURL = post._embedded["wp:featuredmedia"][0].source_url || ""
        }
        if(j === 3) {
          return (
            <section key={i} id={i} className={`wrapper special style${j}`}>
				<div className="inner">
            <section className="spotlights">
            <section>
            <h2>{post.acf.title}</h2>
							<span className="image"><img src={mediaURL} alt="" /></span>
						</section>
						<section>
							<p dangerouslySetInnerHTML={{__html: post.content.rendered}} />
							<ul className="actions">
								<li><a href={`#${i+1}`} className="button">{post.acf.subtitle}</a></li>
							</ul>
						</section>
						
					</section>
          </div>
			</section>
          )
        }
          return (
            <section key={i} id={i} className={`wrapper special style${j}`}>
				<div className="inner">
            <section className="spotlights">
						<section>
							<h2>{post.acf.title}</h2>
							<p dangerouslySetInnerHTML={{__html: post.content.rendered}} />
							<ul className="actions">
								<li><a href={`#${i+1}`} className="button">{post.acf.subtitle}</a></li>
							</ul>
						</section>
						<section>
							<span className="image"><img src={mediaURL} alt="" /></span>
              <h2>Lacus elementum</h2>	
						</section>
					</section>
          </div>
			</section>
          )
      })
      }
    }
  }

  render() {
   
    if(this.props.fetchingPages || this.props.fetchingPosts) {
        return (
          <div>LOADING</div>
        );
    }
    return (
      <div className="container">
        <Header />
        {this.renderPage(this.props.selectedPage, this.props.pages)}
        {this.renderPosts(this.props.selectedPage, this.props.posts)}
        <Footer />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  fetchingPages: state.pages.isFetching,
  fetchingPosts: state.posts.isFetching,
  selectedLanguage: state.selectedLanguage,
  selectedPage: state.selectedPage,
  pages: state.pages.isFetching ? [] : state.pages.items[state.selectedLanguage],
  posts: state.posts.isFetching ? [] : state.posts.items[state.selectedLanguage]
});

export default connect(mapStateToProps)(Page);