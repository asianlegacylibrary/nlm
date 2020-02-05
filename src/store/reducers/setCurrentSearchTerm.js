import { constants } from '../_constants'
let { actions } = constants

// SEARCH RESULTS
export default (state = '', action) => {
    switch (action.type) {
        case actions.SET_CURRENT_SEARCH_TERM:
            return action.payload
        default:
            return state
    }
}
