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
    
    // location.state.modal = true is set in Gallery.js
    // from gallery, we want to go to image in modal
    // keeping gallery visible behind it
    
    // to get both screens to render (ModalView & Gallery)
    // we save the previousLocation and pass it to Switch, 
    // so it will think the location
    // is still GALLERY even though its GALLERY:id

    constructor(props) {
      super(props)
      this.previousLocation = this.props.location
      this.l = Object.keys(languages).map(l => l).join('|')
      this.pages = [
        'home', 'archives'
      ]
      this.isModal = false
    }
    
    //l = languages.map(l => l.id).join('|')

    


    componentWillMount() {
      let { location } = this.props
      //this.languageCheckAndUpdate()
      log('will mount', this.l, location.pathname)
      this.checkURL(location)
    }


  
    componentDidUpdate(prevProps) {
      
      window.onpopstate  = (e) => {
        e.preventDefault()
      }
      
      let { location } = this.props
      
      log('do i need to open or close a modal?', prevProps.location, location)
      
      this.checkURL(location)
      
      if(!location.state) { this.previousLocation = prevProps.location }

    }

    // componentWillUpdate(nextProps) {
    //   // this is where we could grab redirects pre render using nextProps
    //   let { location } = this.props
    //   //log('do i need to open or close a modal?', location, nextProps.location)
    //   //this.checkURL(nextProps.location)

    //   if(nextProps.history.action === "POP") {
        
    //     if(!!this.props.location.state && !nextProps.location.state) {
          
          
    //       //this.props.dispatch({ type: 'DETAIL_MODAL', show: false})
    //       //this.props.dispatch({ type: 'NULLIFY_IIIF'})

    //     }
    //   }

    //   if(!!nextProps.location.state) {
    //     log('MUST OPEN MODAL!')
    //   }
        
    //   // previously: nextProps.history.action !== "POP" && (!location.state || !location.state.modal) 
    //   if(!location.state) { this.previousLocation = this.props.location }
      
    // }


    checkURL = (location) => {
      if(location.pathname.split('/').length > 3) {
        //Object.assign(location, {state: {modal: true }})
        log('CHECKURL', location.pathname.split('/')[4], this.props)
      }
      if(location.state) {
        log('MUST OPEN MODAL!')
        
      }
    }

    render() {

      let { location } = this.props;
  
      this.isModal = !!(
        location.state 
        && location.state.modal 
        && this.previousLocation !== location
      ) // not initial render

      console.log('ROUTESWITCH', this.isModal, location, this.previousLocation)
  
      return (
        <div>
          {/* pass location prop to switch and it will ignore 
          router location to continue showing gallery in background */}
          
          {/* Passing data to a component through a route
          <Route path="/somepath" render={() => <SomeComponent somedata={somedata} />} /> */}

          {/* Anytime you have a match.params like :lng 
          You will have to match the param to your data */}

          <Route path={`/:lng(${this.l})`} component={Header} />

          <Switch location={ this.isModal ? this.previousLocation : location } >

            <Route exact path={`/:lng(${this.l})`} render={() => 
              <div className="container">
                <Stats />
                <Posts />
              </div>
              } />

            {/* if we add other pages, would be something like this...
            <Route path={`/:lng(${this.l})/:page`} component={Page} /> */}
            
            <Route path={`/:lng(${this.l})/archives`} component={Archives} />

            <Route render={() => {
              log('no match, redirecting to /en')
              return <Redirect to="/en" /> 
            }
            } />

          </Switch>

          <Footer />
          
          <Route exact path={`/:lng(${this.l})/archives/doc/:id`} render={({match, history}) => {
            console.log('switch modal route', match.params.id, location.state)
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
            }
          } />
          
        </div>
      )

    }
  }

  export default connect()(RouteSwitch)