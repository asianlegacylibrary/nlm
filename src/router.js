import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
//import { LanguageArray } from './actions'

import Page from './components/Page'

const Routes = () => {

    // <Switch> 
    //     <Route exact path="/:lng(en|mn)?" component={LandingPage} />
    // </Switch>

    //check to see if it's /:l or just l 
    // const route = Object.entries(languages).map(([l, k]) => {
    //     console.log('creating routes', k, l)
    //     return <Route key={l} path={`/${k}/:page`} component={Page} />
    // })

    //return <Route key={l} path={`/${l}/:page`} component={Page} />
    //using the full lang names here, change to use codes
    // const route = LanguageArray.map(l => {
    //     return (
    //         <Route key={l} path={`/${l}`} component={Page} />
    //     )
    // })
 
    return (
        <Router>
            <Switch>
                {/* <Route exact path="/" component={Page} /> */}
                {/* <Route path={`/en/home`} component={Page} />
                <Route path={`/en/arch`} component={Page} /> */}
                {/* <Route key="en" path={`/en/:page`} component={Page} />
                <Route key="mn" path={`/mn/:page`} component={Page} /> */}
                {/* {route} */}
                <Route path={`/English`} component={Page} />
                <Route path={`/Mongolian`} component={Page} />
                <Route path={`/English/arch`} component={Page} />
                <Route path={`/Mongolian/arch`} component={Page} />
                <Redirect push from="*" to="/English" component={Page} />
            </Switch>
        </Router>
    )

};

export default Routes;