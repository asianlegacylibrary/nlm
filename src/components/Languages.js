import '../assets/sass/nlm/navbar.scss'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'
import Language from './containers/Language'

// language codes, ISO 639-1
// mongolian - mn, english - en, tibetan - bo
const Languages = props => {
    let list = []

    list = Object.entries(props.t('languages')).map(([k, l]) => {
        //const p = props.page === 'home' ? '' : `/${props.t('pages')[props.page]}`
        const p = props.page === 'home' ? '' : `/${props.page}`
        return (
            <Link key={k} to={`/${k}${p}`}>
                <Language key={l} selectedLanguage={k}>
                    {l}
                </Language>
            </Link>
        )
    })

    return <ul className="language-list">{list}</ul>
}

const mapStateToProps = state => ({ page: state.selectedPage })

const withN = new withNamespaces()(Languages)
export default connect(mapStateToProps)(withN)
