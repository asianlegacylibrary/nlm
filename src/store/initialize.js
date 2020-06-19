import {
    fetchGSAction,
    fetchAllAction,
    fetchWPPostsAction,
    fetchWPPagesAction,
} from './actions'

export default function initialize(store) {
    // Wordpress data
    store.dispatch(fetchWPPagesAction('pages'))
    store.dispatch(fetchWPPostsAction('posts'))

    // Google sheet data from NLM cataloguing
    store.dispatch(fetchGSAction())

    // ES data
    //store.dispatch(fetchWorksAction({ offset: 0 }))
    store.dispatch(fetchAllAction())
}
