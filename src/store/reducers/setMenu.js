import { constants } from '../_constants'
import { initialState } from '../initialState'

let { actions } = constants

export default (state = initialState.menu, action) => {
    switch (action.type) {
        case actions.SET_MENU:
            return action.menu
        default:
            return state
    }
}
