import { constants } from '../_constants'
let { actions } = constants

export default (state = false, action) => {
    switch (action.type) {
        case actions.SET_MODAL:
            return action.payload
        default:
            return state
    }
}
