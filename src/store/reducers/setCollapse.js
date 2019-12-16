import * as types from '../types'
export default (state = true, action) => {
    switch (action.type) {
        case types.SET_COLLAPSE:
            return action.collapse
        default:
            return state
    }
}
