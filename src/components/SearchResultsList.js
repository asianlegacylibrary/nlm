import '../assets/sass/nlm/search.scss'
import React from 'react'
import { withNamespaces } from 'react-i18next'
import SearchResults from './SearchResults'

const SearchResultsList = ({ match, history }) => {
    return (
        <React.Fragment>
            <div className="col s9 search-section">
                <SearchResults match={match} history={history} />
            </div>
        </React.Fragment>
    )
}

const withN = new withNamespaces()(SearchResultsList)
export default withN
