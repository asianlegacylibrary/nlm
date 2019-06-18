import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// import Home from '../Home'
// import Gallery from '../Gallery'
// import ImageView from '../ImageView'
// import ModalView from '../ModalView'
// import Header from '../Header'

import Header from '../Header'
import Footer from '../Footer'
import Archives from '../Archives'
import Stats from '../Stats'
import Posts from '../Posts'


import { languages, log } from '../../store/actions'

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
    }
    
    //l = languages.map(l => l.id).join('|')

    


    componentWillMount() {
      //let { location } = this.props
      //this.languageCheckAndUpdate()
      log('will mount', this.l, this.props)
    }
  
    componentDidUpdate() {
      window.onpopstate  = (e) => {
        e.preventDefault()
      }
    }

    componentWillUpdate() {

     
      
      // this is where we could grab redirects pre render using nextProps

      //let { location } = this.props
        
      // previously: nextProps.history.action !== "POP" && (!location.state || !location.state.modal) 
      //if(!location.state) { this.previousLocation = this.props.location }
      
    }

    render() {

      let { location } = this.props;
  
    //   let isModal = !!(
    //     location.state 
    //     && location.state.modal 
    //     && this.previousLocation !== location
    //   ) // not initial render
  
      return (
        <div>
          {/* pass location prop to switch and it will ignore 
          router location to continue showing gallery in background */}
          
          {/* Passing data to a component through a route
          <Route path="/somepath" render={() => <SomeComponent somedata={somedata} />} /> */}

          {/* Anytime you have a match.params like :lng 
          You will have to match the param to your data */}

          
          {/* <Switch location={isModal ? this.previousLocation : location}> */}
          {/* <Route exact path={`/:lng(${this.l})/`} component={Home} />
            <Route exact path={`/:lng(${this.l})/archives`} component={Gallery} />
            <Route path={`/:lng(${this.l})/archives/doc/:id`} component={ImageView} />
            <Route render={() => <Redirect to="/en" /> } /> */}
          
          {/* <Header /> */}
          <Route path={`/:lng(${this.l})`} component={Header} />
          <Switch>

            <Route exact path={`/:lng(${this.l})`} render={() => 
              <div className="container">
                <Stats />
                <Posts />
              </div>
              } />

            {/* <Route path={`/:lng(${this.l})/archives`} component={Archives} /> */}
            <Route path={`/:lng(${this.l})/:page?`} component={Archives} />
            <Route render={() => <Redirect to="/en" /> } />

          </Switch>

          <Footer />
          
          {/* {isModal ? <Route path="/:lng/archives/doc/:id" component={ModalView} /> : null} */}
          
        </div>
      )

    }
  }

  export default RouteSwitch