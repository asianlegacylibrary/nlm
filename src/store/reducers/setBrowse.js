import { constants } from '../_constants'
import { initialState } from '../initialState'

let { actions } = constants

export default (state = initialState.menu, action) => {
    switch (action.type) {
        case actions.SET_BROWSE:
            return action.browse
        default:
            return state
    }
}
