import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

//import { connect } from 'react-redux';

import Page from './components/Page'
//import View from './components/View'

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
    
    // const nav = navigation.map(n => {
    //     return (
    //         <Route path="/{n}" />
    //     );
    // });
    
    
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Page} />
                {/* <Route path="/viewer" component={View} /> */}
                <Route path="/:page" component={Page} />
                
            </Switch>
        </Router>
    )
};

// const createNavigation = (pages) => {
//     return pages.items.map(c => {
//         return { slug: c.slug }
//       });
// }

// const mapStateToProps = (state) => ({
//     navigation: state.pagesByLanguage[state.language].items.map(s => s.slug)
// })

export default Routes;