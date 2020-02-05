import { constants } from '../_constants'
import { initialState } from '../initialState'

let { actions } = constants

// SEARCH RESULTS
export default (state = initialState.offsets, action) => {
    switch (action.type) {
        case actions.RESET_OFFSETS:
            return initialState.offsets
        case actions.SET_OFFSETS:
            return {
                ...state,
                [action.offsetType]: action.offset,
            }
        default:
            return state
    }
}
