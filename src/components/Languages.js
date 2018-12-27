import React from 'react'
import Language from '../containers/Language'

import { withNamespaces } from 'react-i18next'

// language codes, ISO 639-1
// mongolian - mn, english - en, tibetan - bo
const Languages = (props) => {
    let list = []
    if(props.tReady) {
        list = Object.entries(props.t('languages')).map(([k, l]) => {
            return (
                <Language key={l} selectedLanguage={k}>{l}</Language>
            )
        })
    }
    return (
        <ul className="language-list">{list}</ul>
    );
}

export default withNamespaces()(Languages)
