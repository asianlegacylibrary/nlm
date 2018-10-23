import React from 'react'
import PropTypes from 'prop-types'
import { setLanguage } from '../actions'
import { connect } from 'react-redux'

const Language = ({ active, children, onClick }) => (
    <li
      key={children}
       onClick={active ? null : onClick}
       className={active ? "lang-active" : "lang"}
       style={active ? 
        { color: 'red', } :
        { color: 'black', } 
        }
    >
      {children}
    </li>
)

Language.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}



const mapStateToProps = (state, ownProps) => ({
  active: ownProps.language === state.language
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => dispatch(setLanguage(ownProps.language)) 
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Language)
