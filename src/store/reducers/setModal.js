import { actions } from '../types'
export default (state = false, action) => {
    switch (action.type) {
        case actions.SET_MODAL:
            return action.payload
        default:
            return state
    }
}
