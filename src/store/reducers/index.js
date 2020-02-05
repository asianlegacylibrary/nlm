import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import fetchWordpress from './fetchWordpress'
import fetchGoogleSheets from './fetchGoogleSheets'
import fetchElasticsearch from './fetchElasticsearch'
import detailsItem from './detailsItem'
import selectLanguage from './selectLanguage'
import selectPage from './selectPage'
import setCollapse from './setCollapse'
import setBrowse from './setBrowse'
import setCollection from './setCollection'
import setCurrentSearchTerm from './setCurrentSearchTerm'
import setCurrentFilterTerm from './setCurrentFilterTerm'
import setOffsets from './setOffsets'
import setModal from './setModal'
import addTermToHistory from './addTermToHistory'
import addTermToFilter from './addTermToFilter'
import setFilterArray from './setFilterArray'

export default history =>
    combineReducers({
        router: connectRouter(history),
        history: addTermToHistory,
        filterArray: addTermToFilter,
        selectedLanguage: selectLanguage,
        selectedPage: selectPage,
        selectedMenu: setBrowse,
        setCollapse,
        setCollection,
        setModal,
        offsets: setOffsets,
        currentSearchTerm: setCurrentSearchTerm,
        currentFilterTerm: setCurrentFilterTerm,
        WP: fetchWordpress,
        GS: fetchGoogleSheets,
        ES: fetchElasticsearch,
        detailsItem,
    })
