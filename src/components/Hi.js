import React from 'react'

export default ({ show }) => {
    if (!show) {
        return null
    }
    return <div>HI!</div>
}
