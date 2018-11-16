import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './Header';
import { Footer } from './Footer';
import Posts from './Posts'
import Archives from './Archives'

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
      .map((page, i) => {
        let mediaURL = null
        if(page._embedded["wp:featuredmedia"]) {
          mediaURL = page._embedded["wp:featuredmedia"][0].source_url
        }
        return (
          <div key={page.slug}>
          <section 
            id="banner" 
            key={page.id}
            style={{
              backgroundImage: 
                `linear-gradient(to bottom, 
                  rgba(239, 239, 239,0.1) 50%,
                  rgba(239, 239, 239,1.0) 100%), 
                  url(${mediaURL})`
              //backgroundImage: `url(${mediaURL}`
            }}>
            <header className="major">
              <span className="icon fa-angellist style7"></span>
              <h1>{page.acf.title}</h1>
              <h3>{page.acf.subtitle}</h3>
            </header>
            {/* <ul className="actions">
              <li><a href="#1" className="button scrolly">Proceed</a></li>
            </ul> */}
          </section>
          {selectedPage === 'home' ? null : 
          <section className={`wrapper special style1`}>
            <div className="inner-page">
                <section className="spotlights">
                  <p dangerouslySetInnerHTML={{__html: page.content.rendered}} />
                  {/* <ul className="actions">
                    <li>{page.acf.subtitle}</li>
                  </ul> */}
                </section>
            </div>
          </section>
          }
          </div>
        )
    })
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
        
        { this.renderPage(this.props.selectedPage, this.props.pages, this.props.meowPage) }
        { this.props.selectedPage === 'home' ? <Posts /> : null }
        { this.props.selectedPage === 'arch' ? <Archives /> : null }
        <Footer />
      </div>
    );
  }

}

const mapStateToProps = state => ({
  fetchingPages: state.pages.isFetching,
  selectedLanguage: state.selectedLanguage,
  selectedPage: 
    state.pages.isFetching ? 
    [] : 
    state.pages.items[state.selectedLanguage].some(page => page.slug.substring(0,4) === state.selectedPage) ? 
    state.selectedPage : "home",
  pages: state.pages.isFetching ? [] : state.pages.items[state.selectedLanguage]
});

export default connect(mapStateToProps)(Page);