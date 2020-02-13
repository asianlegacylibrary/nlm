import { actions } from '../types'
export default (state = false, action) => {
    switch (action.type) {
        case actions.SET_COLLECTION:
            return action.collection
        default:
            return state
    }
}
