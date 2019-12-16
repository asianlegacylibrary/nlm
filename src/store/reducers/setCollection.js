import * as types from '../types'
export default (state = false, action) => {
    switch (action.type) {
        case types.SET_COLLECTION:
            return action.collection
        default:
            return state
    }
}
