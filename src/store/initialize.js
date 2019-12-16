import { fetchWPType, fetchData, getGS } from './actions'

export default function initialize(store) {
    // Wordpress data
    store.dispatch(fetchWPType('pages'))
    store.dispatch(fetchWPType('posts'))

    // Google sheet data from NLM cataloguing
    store.dispatch(getGS())

    // ES data
    store.dispatch(fetchData())
}
