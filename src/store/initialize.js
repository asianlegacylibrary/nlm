import { fetchPages, fetchPosts, fetchData, getGS } from './actions'

export default function initialize(store) {
    // Wordpress data
    store.dispatch(fetchPages())
    store.dispatch(fetchPosts())

    // Google sheet data from NLM cataloguing
    store.dispatch(getGS())

    // ES data
    store.dispatch(fetchData())
}
