import { actions } from '../types'
import { initialState } from '../initialState'

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
