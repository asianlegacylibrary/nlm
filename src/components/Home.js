import React from 'react'

export default ({ selectedPage }) => {
    return (
        <React.Fragment>
            <Page page={selectedPage} />
            <Stats />
            <Posts />
        </React.Fragment>
    )
}
