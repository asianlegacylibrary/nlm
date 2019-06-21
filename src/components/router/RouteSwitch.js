import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import Header from '../Header'
import Footer from '../Footer'
import Archives from '../Archives'
import Stats from '../Stats'
import Posts from '../Posts'
import Modal from '../Modal'

import { languages, defaultLanguage, log, 
    fetchSpecificID, setPage, setLanguage } from '../../store/actions'

class RouteSwitch extends Component {
    
    constructor(props) {
        super(props)
        this.previousLocation = this.props.location
        this.l = Object.keys(languages).map(l => l).join('|')
        this.pages = [ 'home', 'archives' ]
        //this.isModal = false
    }

    componentDidMount() {
        this.languageCheckAndUpdate()
    }
    
    componentDidUpdate(prevProps) {
      
        window.onpopstate  = (e) => {
            e.preventDefault()
        }
     
        if(!this.props.location.state) { this.previousLocation = prevProps.location }

    }

    languageCheckAndUpdate() {
        log('RS check lang and page', this.props)

        const { history, dispatch, t } = this.props
        const url = history.location.pathname

        if(url.split('/')[2] !== undefined) {
            if(Object.keys(t('pages')).includes(url.split('/')[2])) {
                dispatch(setPage('archives'))
            } else {
                dispatch(setPage('home'))
                history.push(`/${url.split('/')[1]}`)
            }
        } 
    
        if(url.split('/')[1] in languages) { 
            this.setLang(url.split('/')[1])
        } else {
            this.setLang(defaultLanguage)
            dispatch(setPage('home'))
            history.push(defaultLanguage)
            
        }  
    }

  setLang = (lng) => {

    const { i18n, dispatch } = this.props;
    i18n.changeLanguage(lng) // change locale
    dispatch(setLanguage(lng)) // set redux language

  }

    render() {

        return (
            <div>
                {/* pass location prop to switch and it will ignore 
                router location to continue showing gallery in background */}
                
                {/* Passing data to a component through a route
                <Route path="/somepath" render={() => <SomeComponent somedata={somedata} />} /> */}

                {/* Anytime you have a match.params like :lng 
                You will have to match the param to your data */}

                <Route path={`/:lng(${this.l})`} component={Header} />

                <Switch>  

                    <Route exact path={`/:lng(${this.l})`} render={() => 
                    <div className="container">
                        <Stats />
                        <Posts />
                    </div>
                    } />

                    {/* if we add other pages, would be something like this...
                    <Route path={`/:lng(${this.l})/:page`} component={Page} /> */}
                    
                    <Route path={`/:lng(${this.l})/archives`} render={({match, history}) =>
                        <div className="container">
                            <Archives match={match} history={history} />
                        </div>
                    } />

                    <Route render={() => <Redirect selectedPage="home" to="/en" /> } />

                </Switch>

                <Footer />
            
                <Route exact path={`/:lng(${this.l})/archives/doc/:id`} render={({match, history}) => {
                    
                    let label = this.props.location.state ? this.props.location.state.label : null
                    this.props.dispatch(fetchSpecificID(match.params.id))
                    this.props.dispatch({ type: 'DETAIL_MODAL', modalID: match.params.id, show: true })
                    
                    return <Modal 
                        key={match.params.id}
                        history={history}
                        doc_id={match.params.id}
                        show={true}
                        label={label}
                        />
                    }} />
            </div>
        )
    }
  }

  const withN = new withNamespaces()(RouteSwitch)
  export default connect()(withN)