import '../assets/sass/nlm/page.scss'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'
import { setLanguage } from '../store/actions'
import { constants } from '../store/_constants'
import nlm_logo from '../assets/images/nlm_logo_transparent.png'
let { defaultLanguage } = constants

class Page extends Component {
    constructor(props) {
        super(props)

        this.setNumber = {
            0: 'one',
            1: 'one',
            2: 'two',
            3: 'three',
            4: 'four',
        }

        this.rgbLight = [239, 239, 239]
        this.rgbDark = [0, 0, 0]
    }

    renderContent = page => {
        //console.log('render content of page', page)
        if (parseInt(page.acf.columns) === 2) {
            return (
                <div key={page.slug} className="row">
                    <div className="col s12 posts-col">
                        <h2>{page.acf.title}</h2>

                        <div className="row flex">
                            <div className="col s12 m6">
                                {/* <span className="image left">
                                    <img src={mediaURL} alt="" />
                                </span> */}
                            </div>
                            <div className="col s12 m6">
                                <p
                                    className="down-push"
                                    dangerouslySetInnerHTML={{
                                        __html: page.content.rendered,
                                    }}
                                />
                            </div>
                        </div>
                        <div className="divider-with-logo">
                            <div className="hr-line-left"></div>
                            <img src={nlm_logo} width="24px" alt="logo" />
                            <div className="hr-line-right"></div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div key={page.slug} className="row">
                        <div className="col s12 posts-col">
                            <h2>{page.title.rendered}</h2>
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: page.content.rendered,
                                }}
                            />
                            <div className="divider-with-logo">
                                <div className="hr-line-left"></div>
                                <img src={nlm_logo} width="24px" alt="logo" />
                                <div className="hr-line-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    resetPage = () => {
        this.props.dispatch({ type: 'SET_PAGE', page: 'home' })
        this.props.i18n.changeLanguage(defaultLanguage) // change locale
        this.props.dispatch(setLanguage(defaultLanguage)) // set redux language
    }

    renderPage(selectedPage, pages) {
        if (!pages.some(e => e.slug.split('-')[0] === selectedPage)) {
            console.log('page not there')
            this.resetPage()
        }

        return pages
            .filter(page => page.slug.split('-')[0] === selectedPage)
            .map((page, i) => {
                let mediaURL = null
                if (page._embedded['wp:featuredmedia']) {
                    mediaURL = page._embedded['wp:featuredmedia'][0].source_url
                }

                return (
                    <React.Fragment key={page.id}>
                        <section
                            id="banner"
                            style={{
                                backgroundImage: `linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(117, 19, 93, 0.73)), url(${mediaURL})`,
                                backgroundSize: 'cover',
                            }}
                        >
                            <header className="major">
                                <h1>{page.acf.title}</h1>
                                <div className="divider" />
                                <h3>{page.acf.subtitle}</h3>
                            </header>
                        </section>
                        {selectedPage !== 'home'
                            ? this.renderContent(page)
                            : null}
                    </React.Fragment>
                )
            })
    }

    render() {
        if (this.props.fetchingWP) {
            return (
                <div className="blinky">
                    {this.props.t('technical.loading')}
                </div>
            )
        }
        if (this.props.selectedPage === 'archives') {
            return null
        }
        return (
            // <div className="container">
            <React.Fragment>
                {this.renderPage(this.props.selectedPage, this.props.pages)}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    fetchingWP: state.WP.pages.isFetching || state.WP.posts.isFetching,
    selectedLanguage: state.selectedLanguage || defaultLanguage,
    selectedPage: state.WP.pages.isFetching
        ? []
        : state.WP.pages.items[state.selectedLanguage].some(
              page => page.slug.split('-')[0] === state.selectedPage
          )
        ? state.selectedPage
        : 'home',
    pages: state.WP.pages.isFetching
        ? []
        : state.WP.pages.items[state.selectedLanguage],
})

const withN = new withNamespaces()(Page)
export default connect(mapStateToProps)(withN)
