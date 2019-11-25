import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { defaultLanguage, setLanguage, log } from '../store/actions/index'

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

    this.rgbLight = [239, 239, 239]
    this.rgbDark = [0, 0, 0]
    
  }

  resetPage = () => {
    this.props.dispatch({ type: 'SET_PAGE', page: 'home' });
    this.props.i18n.changeLanguage(defaultLanguage) // change locale
    this.props.dispatch(setLanguage(defaultLanguage)) // set redux language
  }

  renderPage(selectedPage, pages) {
    if (!pages.some(e => e.slug.split('-')[0] === selectedPage)) {
      log('page not there');
      this.resetPage();
    }
    return pages
      .filter(page => page.slug.split('-')[0] === selectedPage)
      .map((page, i) => {
        let mediaURL = null
        if(page._embedded["wp:featuredmedia"]) {
          mediaURL = page._embedded["wp:featuredmedia"][0].source_url
        }
        // `linear-gradient(to bottom, 
        //     rgba(${this.rgbLight},0.1) 70%,
        //     rgba(${this.rgbLight},1.0) 100%), 
        return (
          <div key={page.slug}>
            <section 
              id="banner" 
              key={page.id}
              style={{
                backgroundImage: `url(${mediaURL})`
              }}>
              <header className="major">
                <h1>{page.acf.title}</h1>
                <h3>{page.acf.subtitle}</h3>
                <div className="inner-page">
                  <section className="spotlights-page">
                    <p dangerouslySetInnerHTML={{__html: page.content.rendered}} />
                  </section>
                </div>
              </header>
            </section>
          </div>
        )
    })
  }

  render() {
   
    if(this.props.fetchingWP) {
        return (
          <div className="blinky">{this.props.t('technical.loading')}</div>
        )
    }
    return (
      <div className="container">
        
        { this.renderPage(this.props.selectedPage, this.props.pages) }
        
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
    fetchingWP: (state.pages.isFetching || state.posts.isFetching),
    selectedLanguage: state.selectedLanguage || defaultLanguage,
    selectedPage: 
      state.pages.isFetching 
      ? [] 
      : state.pages.items[state.selectedLanguage].some(page => page.slug.split('-')[0] === state.selectedPage) 
      ? state.selectedPage 
      : "home",
    pages: state.pages.isFetching ? [] : state.pages.items[state.selectedLanguage]
})

const withN = new withNamespaces()(Page)
export default connect(mapStateToProps)(withN);