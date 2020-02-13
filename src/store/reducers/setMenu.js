import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState.menu, action) => {
    switch (action.type) {
        case actions.SET_MENU:
            return action.menu
        default:
            return state
    }
}
