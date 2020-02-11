import React from 'react'
import Sidebar from './Sidebar'
import SearchResults from './SearchResults'
import SearchMenu from './SearchMenu'

export default ({ match, history }) => {
    return (
        <React.Fragment>
            <div className="row flex no-margin">
                <div className="col m4 l3 col-white no-padding"></div>
                <div className="col s12 m8 l9 no-padding">
                    <SearchMenu />
                </div>
            </div>
            <div className="row flex no-margin">
                <div className="col m4 l3 side-nav">
                    <div className="pad-it">
                        <div className="sidenav-sections">
                            <Sidebar />
                        </div>
                    </div>
                </div>
                <div className="col s12 m8 l9 search-section">
                    <SearchResults match={match} history={history} />
                </div>
            </div>
        </React.Fragment>
    )
}
