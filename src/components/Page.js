import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Header } from './Header'
import Footer from './Footer'
import Posts from './Posts'
import Stats from './Stats'
import Archives from './Archives'

import { defaultLanguage, 
  setLanguage, setLanguage2,
  languages,
  setPage,
  log
} from '../store/actions/index'

import { withNamespaces } from 'react-i18next'

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

  componentWillMount() { 
    this.languageCheckAndUpdate()
  }

  componentDidUpdate() {
    window.onpopstate  = (e) => {
      e.preventDefault()
      this.languageCheckAndUpdate()
    }
  }

  languageCheckAndUpdate() {
    const { history, url, selectedPage, dispatch, t } = this.props;
    if(url.split('/')[2] !== undefined) {
      if(Object.keys(t('pages')).includes(url.split('/')[2])) {
        dispatch(setPage('archives'))
      } else {
        dispatch(setPage('home'))
        history.push(`/${url.split('/')[1]}`)
      }
    } else {
      dispatch(setPage('home'))
    }
    if(url.split('/')[1] in languages) { 
      this.setLang(url.split('/')[1])
    } else {
      this.setLang(defaultLanguage)
      history.push(defaultLanguage)
    }  
  }

  setLang = (lng) => {
    const { i18n, dispatch } = this.props;
    i18n.changeLanguage(lng) // change locale
    dispatch(setLanguage(lng)) // set redux language

  }

  resetPage = () => {
    this.props.dispatch({ type: 'SET_PAGE', page: 'home' });
    this.setLang(defaultLanguage)
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
   
    if(this.props.fetchingPages || this.props.fetchingPosts) {
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

const mapStateToProps = (state) => {
  //log('state in Page component', state)
  //log('ownProps in Page component', ownProps)
  
  return {
    router: state.router,
    url: state.router.location.pathname,
    fetchingPages: state.pages.isFetching,
    selectedLanguage: state.selectedLanguage || defaultLanguage,
    selectedPage: 
      state.pages.isFetching ? 
      [] : 
      state.pages.items[state.selectedLanguage].some(page => page.slug.split('-')[0] === state.selectedPage) ? 
      state.selectedPage : "home",
    pages: state.pages.isFetching ? [] : state.pages.items[state.selectedLanguage],
    gs: state.gsData.isFetching ? {} : state.gsData.gs,
    browse: state.setBrowse
  }
};

const withN = new withNamespaces()(Page)
export default connect(mapStateToProps)(withN);