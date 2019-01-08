import React from 'react'
import { connect } from 'react-redux'
import Language from '../containers/Language'


import { withNamespaces } from 'react-i18next'

import { Link } from 'react-router-dom'

// language codes, ISO 639-1
// mongolian - mn, english - en, tibetan - bo
const Languages = (props) => {
    let list = []
    //list = Object.entries(props.t('languageCodes')).map(([k, l]) => {
        list = Object.entries(props.t('languages')).map(([k, l]) => {
            //const p = props.page === 'home' ? '' : `/${props.t('pages')[props.page]}`
            const p = props.page === 'home' ? '' : `/${props.page}`
            return (
                <Language key={l} selectedLanguage={k}>
                    <Link to={`/${k}${p}`} >
                        {l}
                    </Link>
                </Language>
            )
        })
    return (
        <ul className="language-list">{list}</ul>
    );
}

const mapStateToProps = (state) => ({
    page: state.selectedPage
})

const withN = new withNamespaces()(Languages)
//export default withRouter(connect(mapStateToProps)(withN))
export default connect(mapStateToProps)(withN)
//export default withRouter(withNamespaces()(Languages))
