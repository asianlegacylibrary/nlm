import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import SearchResults from './SearchResults'
import SearchMenu from './SearchMenu'
import SearchFilterSidebar from './SearchFilterSidebar'
import { useWindowSize } from '../store/hooks/useWindowSize'

// const Sidebar = () => {
//     let { width } = useWindowSize(80)
//     let currentSidebar
//     if (width > 600) {
//         currentSidebar = (
//             <div className="pad-it">
//                 <div className="sidenav-sections">
//                     <Sidebar />
//                 </div>
//             </div>
//         )
//     } else {
//         currentSidebar = (
//             <React.Fragment>
//                 <a
//                     className="btn dropdown-btn left sidenav-trigger show-on-large valign-wrapper"
//                     data-target="filter-slide-out"
//                     href="#!"
//                 >
//                     <i className="fal fa-arrow-right" /> Filter Results
//                 </a>
//                 {/* <SearchFilterSidebar /> */}
//                 <Sidebar />
//             </React.Fragment>
//         )
//     }
//     return currentSidebar
// }

export default ({ match, history }) => {
    const selectedMenu = useSelector(state => state.selectedMenu)

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
