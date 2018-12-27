import React, { Component } from 'react'
import { setLanguage } from '../actions'
import { connect } from 'react-redux'

import { withNamespaces } from 'react-i18next'

class Language extends Component {
    
    changeLanguage = (lng) => {
      this.props.i18n.changeLanguage(lng);
    }

    render() {
      return (
        <li
          key={this.props.children}
          onClick={() => {
            this.props.dispatch(setLanguage(this.props.lang))
            this.changeLanguage(this.props.lang)
          }}
          className={this.props.active ? "lang-active" : "lang"}
          style={this.props.active ? 
            { color: 'red', } :
            { color: 'black', } 
          }
        >
          <button
            key={this.props.children}
            className="btn-lang">
            {this.props.children}
          </button>
        </li>
      )
    }
    
  }


const mapStateToProps = (state, ownProps) => ({
  active: ownProps.selectedLanguage === state.selectedLanguage,
  lang: ownProps.selectedLanguage
})

const withN = new withNamespaces()(Language)
export default connect(
  mapStateToProps,
  //mapDispatchToProps
)(withN)
