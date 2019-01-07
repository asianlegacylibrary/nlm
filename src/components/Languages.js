import React from 'react'
import { connect } from 'react-redux'
import Language from '../containers/Language'


import { withNamespaces } from 'react-i18next'

import { withRouter, Link } from 'react-router-dom'

// language codes, ISO 639-1
// mongolian - mn, english - en, tibetan - bo
const Languages = (props) => {
    console.log(`${props.lng}/${props.page}`)
    console.log(props)
    let list = []
    //if(props.tReady) {
        list = Object.entries(props.t('languages')).map(([k, l]) => {
            return (
                <Language key={l} selectedLanguage={k}>
                    <Link to={`/${props.lng}/${props.page}`} >
                    {l}
                    </Link>
                </Language>
            )
        })
    //}
    return (
        <ul className="language-list">{list}</ul>
    );
}

const mapStateToProps = (state) => ({
    page: state.selectedPage
})

const withN = new withNamespaces()(Languages)
export default withRouter(connect(mapStateToProps)(withN))

//export default withRouter(withNamespaces()(Languages))
