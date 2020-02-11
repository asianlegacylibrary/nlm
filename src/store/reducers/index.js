import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import fetchWordpress from './fetchWordpress'
import fetchGoogleSheets from './fetchGoogleSheets'
import fetchElasticsearch from './fetchElasticsearch'
//import detailsItem from './detailsItem'
import selectLanguage from './selectLanguage'
import selectPage from './selectPage'
import setCollapse from './setCollapse'
import setMenu from './setMenu'
import setCollection from './setCollection'
import setCurrentSearchTerm from './setCurrentSearchTerm'
import setOffsets from './setOffsets'
import setModal from './setModal'
import addTermToHistory from './addTermToHistory'
import addTermToFilter from './addTermToFilter'
import setBrowse from './setBrowse'

export default history =>
    combineReducers({
        router: connectRouter(history),
        history: addTermToHistory,
        filterArray: addTermToFilter,
        selectedLanguage: selectLanguage,
        selectedPage: selectPage,
        selectedMenu: setMenu,
        selectedBrowse: setBrowse,
        setCollapse,
        setCollection,
        setModal,
        offsets: setOffsets,
        currentSearchTerm: setCurrentSearchTerm,
        WP: fetchWordpress,
        GS: fetchGoogleSheets,
        ES: fetchElasticsearch,
        //detailsItem,
    })
