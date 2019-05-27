import React from 'react'
import { withNamespaces } from 'react-i18next'

import Sidebar from './Sidebar'
import Items from './Items'

import '../assets/css/archives.css'

const Archives = ({browse}) => {
    return (
            <div className="content">
                <Sidebar />
                <div className="grid">
                    <h1 className="archives-title">{`${browse}s`}</h1>
                    <Items />
                </div>
            </div>
        )
    }

const withN = new withNamespaces()(Archives)
export default withN
