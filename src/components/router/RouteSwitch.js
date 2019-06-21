import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Header from '../Header'
import Footer from '../Footer'
import Archives from '../Archives'
import Stats from '../Stats'
import Posts from '../Posts'
import Modal from '../Modal'

import { languages, log, fetchSpecificID } from '../../store/actions'

class RouteSwitch extends Component {
    
    constructor(props) {
        super(props)
        this.previousLocation = this.props.location
        this.l = Object.keys(languages).map(l => l).join('|')
        this.pages = [
            'home', 'archives'
        ]
        this.isModal = false
    }

    componentDidMount() {
        let { location } = this.props
        console.log('RS mount, set page here based on URL?', location)
    }
    
    componentDidUpdate(prevProps) {
      
        window.onpopstate  = (e) => {
            e.preventDefault()
        }
      
        let { location } = this.props
     
        if(!location.state) { this.previousLocation = prevProps.location }

    }

    render() {

      let { location } = this.props;
  
      this.isModal = !!(
        location.state 
        && location.state.modal 
        && this.previousLocation !== location
      ) // not initial render

        return (
            <div>
                {/* pass location prop to switch and it will ignore 
                router location to continue showing gallery in background */}
                
                {/* Passing data to a component through a route
                <Route path="/somepath" render={() => <SomeComponent somedata={somedata} />} /> */}

                {/* Anytime you have a match.params like :lng 
                You will have to match the param to your data */}

                <Route path={`/:lng(${this.l})`} component={Header} />

                {/* location={ this.isModal ? this.previousLocation : location } > */}
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
                    
                    let label = location.state ? location.state.label : null
                    this.props.dispatch(fetchSpecificID(match.params.id))
                    this.props.dispatch({ type: 'DETAIL_MODAL', modalID: match.params.id, show: true })
                    
                    return <Modal 
                        showing={true} 
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

  export default connect()(RouteSwitch)