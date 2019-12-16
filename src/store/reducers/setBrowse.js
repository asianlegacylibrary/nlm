import * as types from '../types'
export default (state = 'Title', action) => {
    switch (action.type) {
        case types.SET_BROWSE:
            return action.browse
        default:
            return state
    }
}
