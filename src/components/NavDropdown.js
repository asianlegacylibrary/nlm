import React, { useEffect } from 'react'
import M from 'materialize-css'

export default ({ pages }) => {
    let dropdownOptions = {
        alignment: 'right',
        closeOnClick: true,
        inDuration: 250,
    }
    useEffect(() => {
        const dropdownElem = document.querySelectorAll('.dropdown-trigger')
        M.Dropdown.init(dropdownElem, dropdownOptions)
    })

    return (
        <React.Fragment>
            <a
                className="dropdown-trigger btn dropdown-btn right"
                href="#"
                data-target="dropdown-nav"
            >
                <i className="fal fa-bars" />
            </a>
            <ul id="dropdown-nav" className="dropdown-content">
                {pages}
            </ul>
        </React.Fragment>
    )
}
