import '../assets/sass/nlm/navbar.scss'
import React from 'react'
import SearchBar from './SearchBar'

const NavSub = () => {
    //let e = document.getElementsByClassName('search-input')

    return (
        <React.Fragment>
            <div className="row no-margin valign-wrapper nav-sub">
                <div className="col s2 m3 center-align">
                    <i className="fa fa-search search-form-icon" />
                </div>
                <div className="col s10 m9">
                    <SearchBar />
                </div>
            </div>
        </React.Fragment>
    )
}
export default NavSub
