import React from 'react';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';

import Page from './components/Page'

const Routes = () => {

    // <Switch> 
    //     <Route exact path="/:lng(en|mn)?" component={LandingPage} />
    // </Switch>
 
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Page} />
                <Route path="/:page" component={Page} />
                <Redirect push to="/" />
            </Switch>
        </Router>
    )

};

export default Routes;