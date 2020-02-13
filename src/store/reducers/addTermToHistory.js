import { actions } from '../types'
// SEARCH RESULTS
export default (state = [], action) => {
    switch (action.type) {
        case actions.ADD_TERM_TO_HISTORY:
            return Array.from(new Set([...state, action.term])).sort()
        default:
            return state
    }
}
