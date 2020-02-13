import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState.browse, action) => {
    switch (action.type) {
        case actions.SET_BROWSE:
            return action.payload
        default:
            return state
    }
}
