import '../assets/sass/nlm/navbar.scss'
import React from 'react'
import SearchBar from './SearchBar'
import logo from '../assets/images/logo_all.png'
import nlm_full from '../assets/images/nlm_logo_full_transparent.png'

const NavSub = () => {
    return (
        <React.Fragment>
            <div className="row no-margin valign-wrapper nav-sub">
                <div className="col s2 m3 center-align">
                    {/* <img src={nlm_full} alt="logo" /> */}
                    <i className="fad fa-search search-form-icon" />
                </div>
                <div className="col s10 m9">
                    <SearchBar />
                </div>
            </div>
        </React.Fragment>
    )
}
export default NavSub
