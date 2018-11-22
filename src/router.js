import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Page from './components/Page'

const Routes = () => {
 
    return (
        <Router>
            <Switch>
                <Route path="/:page" component={Page} />
            </Switch>
        </Router>
    )

};

export default Routes;