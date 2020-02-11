import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import Header from '../Header'
import Footer from '../Footer'
import SearchContainer from '../SearchContainer'
import Stats from '../Stats'
import Posts from '../Posts'
import Page from '../Page'
import Modal from '../Modal'

import { setPage, setLanguage, fetchIDAction } from '../../store/actions'
import { constants } from '../../store/_constants'
import SearchForm from '../SearchForm'
let { languages, defaultLanguage } = constants

class RouteSwitch extends Component {
    previousLocation = this.props.location
    l = Object.keys(languages)
        .map(l => l)
        .join('|')

    componentDidMount() {
        this.languageCheckAndUpdate()
    }

    componentDidUpdate(prevProps) {
        let { location } = this.props

        if (prevProps.history.action !== 'POP') {
            this.previousLocation = location
        }
    }

    languageCheckAndUpdate() {
        const { history, dispatch, t } = this.props
        const url = history.location.pathname

        // if (url.split('/')[2] !== undefined) {
        //     if (Object.keys(t('pages')).includes(url.split('/')[2])) {
        //         dispatch(setPage('archives'))
        //     } else {
        //         dispatch(setPage('home'))
        //         history.push(`/${url.split('/')[1]}`)
        //     }
        // }

        if (url.split('/')[1] in languages) {
            this.setLang(url.split('/')[1])
        } else {
            this.setLang(defaultLanguage)
            dispatch(setPage('home'))
            history.push(defaultLanguage)
        }
    }

    setLang = lng => {
        const { i18n, dispatch } = this.props
        i18n.changeLanguage(lng) // change locale
        dispatch(setLanguage(lng)) // set redux language
    }

    render() {
        let initialRender = this.props.location === this.previousLocation

        return (
            <React.Fragment>
                {/* <div className="wrapper"> */}
                {/* pass location prop to switch and it will ignore 
                router location to continue showing gallery in background */}

                {/* Passing data to a component through a route
                <Route path="/somepath" render={() => <SomeComponent somedata={somedata} />} /> */}

                {/* Anytime you have a match.params like :lng 
                You will have to match the param to your data */}

                <Route path={`/:lng(${this.l})`} component={Header} />

                <Switch>
                    <Route
                        exact
                        path={`/:lng(${this.l})/archives/doc/:id`}
                        render={({ match, history }) => {
                            let label = this.props.location.state
                                ? this.props.location.state.label
                                : null

                            if (initialRender) {
                                this.props.dispatch(
                                    fetchIDAction(match.params.id)
                                )
                            }

                            this.props.dispatch({
                                type: 'SET_MODAL',
                                payload: true,
                            })

                            return (
                                <React.Fragment>
                                    <Modal
                                        show={true}
                                        match={match}
                                        history={history}
                                        label={label}
                                        initialRender={initialRender}
                                    />
                                </React.Fragment>
                            )
                        }}
                    />
                    <Route
                        exact
                        path={`/:lng(${this.l})/archives`}
                        render={({ match, history }) => (
                            <React.Fragment>
                                <div className="main">
                                    <SearchForm />
                                    <SearchContainer
                                        match={match}
                                        history={history}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    />

                    {/* if we add other pages, would be something like this... */}
                    <Route path={`/:lng(${this.l})/:page`} component={Page} />

                    <Route
                        exact
                        path={`/:lng(${this.l})`}
                        render={({ history, match }) => (
                            <React.Fragment>
                                <Page history={history} />
                                <Stats match={match} />
                                <div className="container">
                                    <Posts />
                                </div>
                            </React.Fragment>
                        )}
                    />

                    <Route
                        render={() => <Redirect selectedPage="home" to="/en" />}
                    />
                </Switch>

                <Footer />
                {/* </div> */}
                {/* <Route
                    exact
                    path={`/:lng(${this.l})/archives/doc/:id`}
                    render={({ match, history }) => {
                        let label = this.props.location.state
                            ? this.props.location.state.label
                            : null

                        if (initialRender) {
                            this.props.dispatch(fetchIDAction(match.params.id))
                            // this.props.dispatch({
                            //     type: 'SET_MODAL',
                            //     modalID: match.params.id,
                            //     show: true,
                            //     initialRender: true,
                            // })
                        }

                        return (
                            <Modal
                                match={match}
                                show={true}
                                history={history}
                                label={label}
                                initialRender={initialRender}
                            />
                        )
                    }}
                /> */}
            </React.Fragment>
        )
    }
}

const withN = new withNamespaces()(RouteSwitch)
export default connect()(withN)
