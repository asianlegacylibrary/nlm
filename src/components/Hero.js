import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'

import { defaultLanguage, 
  pages,
  setPage,
  log
} from '../store/actions/index'

import { withNamespaces } from 'react-i18next'

class Hero extends Component {

  constructor(props) {
    super(props)

    this.setNumber = {
      0: 'one',
      1: 'one',
      2: 'two',
      3: 'three',
      4: 'four'
    }

    this.rgbLight = [239, 239, 239]
    this.rgbDark = [0, 0, 0]

    this.hero = []
    
  }

  componentWillMount() {
    //this.hero = this.setHero(this.props.selectedPage, this.props.pages)
    //this.checkPage(this.props)
  }

  componentWillUpdate(nextProps) {
    this.checkPage(nextProps) 
  }

  checkPage(nextProps) {
    // const { history, url, selectedPage, dispatch, t } = this.props;
    log('check and update with next',   nextProps)
    const { pathname } = nextProps.location


    if(pathname.split('/')[2] !== undefined) {
      if(pages.includes(pathname.split('/')[2])) {
        console.log('page is archives')
        this.props.dispatch(setPage('archives'))
      }
    }

  }

  resetPage = () => {
    console.log('resetting page')
    this.props.dispatch({ type: 'SET_PAGE', page: 'home' });
    //this.props.history.push('/en')
  }

  renderHero(selectedPage, pages) {
    console.log('renderhero', selectedPage, pages)
    if (!pages.some(e => e.slug.split('-')[0] === selectedPage)) {
      log('page not there')
      this.resetPage()
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
    if(!this.props.selectedPage || !this.props.pages) {
        return (
          <div className="blinky">{this.props.t('technical.loading')}</div>
        )
    }
    return (
      this.renderHero(this.props.selectedPage, this.props.pages)
    )
  
    
   
  }

}

const mapStateToProps = (state) => {
  return {
    selectedLanguage: state.selectedLanguage || defaultLanguage,
    selectedPage: 
      state.pages.isFetching ? 
      [] : 
      state.pages.items[state.selectedLanguage].some(page => page.slug.split('-')[0] === state.selectedPage) ? 
      state.selectedPage : "home",
    pages: state.pages.isFetching ? [] : state.pages.items[state.selectedLanguage]
  }
}

const withN = new withNamespaces()(Hero)
export default withRouter(connect(mapStateToProps)(withN))