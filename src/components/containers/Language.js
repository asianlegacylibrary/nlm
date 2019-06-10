import React from 'react'
import { connect } from 'react-redux'
import { withNamespaces } from 'react-i18next'

import { defaultLanguage, setLanguage } from '../../store/actions'

import '../../assets/css/navbar.css'

const Language = ({ active, children, dispatch, lang, i18n }) => {

  const changeI18n = (lng) => { i18n.changeLanguage(lng) }
  
  return (
    <li
      key={children}
      onClick={() => {
        dispatch(setLanguage(lang))
        changeI18n(lang)
        }}
      className={active ? "lang-active" : "lang"}
      style={active ? 
        { color: 'red', } :
        { color: 'black', } 
        }
    >
    <button
      key={children}
      disabled={active ? true : false}
      className="btn-lang">
      {children}
    </button>
    </li>
  )
}

const mapStateToProps = (state, ownProps) => ({
  active: ownProps.selectedLanguage === state.selectedLanguage,
  lang: ownProps.selectedLanguage || defaultLanguage
})

const withN = new withNamespaces()(Language)
export default connect(mapStateToProps)(withN)
