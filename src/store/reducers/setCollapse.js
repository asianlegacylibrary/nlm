import { constants } from '../_constants'
let { actions } = constants

export default (state = true, action) => {
    switch (action.type) {
        case actions.SET_COLLAPSE:
            return action.collapse
        default:
            return state
    }
}
