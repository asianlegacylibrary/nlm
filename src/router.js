import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Home from './components/Home';
import WPPosts from './components/WPPosts';

// const componentRoutes = {
//     component: Home,
//     path: '/',
//     indexRoute: { component: WPPosts },
//     childRoutes: [
//         {
//             path: ''
//         }
//     ]
// }

const Routes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/posts" component={WPPosts} />
            </Switch>
        </Router>
    )
};

export default Routes;