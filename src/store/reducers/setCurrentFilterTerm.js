import { constants } from '../_constants'
import { initialState } from '../initialState'
let { actions } = constants

// SEARCH RESULTS
export default (state = initialState.filterTerm, action) => {
    switch (action.type) {
        case actions.SET_CURRENT_FILTER_TERM:
            return action.payload
        case actions.CLEAR_FILTER_TERM:
            return initialState.filterTerm
        default:
            return state
    }
}
