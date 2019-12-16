import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import fetchWordpress from './fetchWordpress'
import fetchGoogleSheets from './fetchGoogleSheets'
import fetchElasticsearch from './fetchElasticsearch'
import details from './details'
import modal from './modal'
import selectLanguage from './selectLanguage'
import selectPage from './selectPage'
import setCollapse from './setCollapse'
import setBrowse from './setBrowse'
import setCollection from './setCollection'

export default history =>
    combineReducers({
        router: connectRouter(history),
        selectedLanguage: selectLanguage,
        selectedPage: selectPage,
        setCollapse,
        setBrowse,
        setCollection,
        WP: fetchWordpress,
        GS: fetchGoogleSheets,
        ES: fetchElasticsearch,
        details,
        modal,
    })
