import * as types from '../types'
export default (state = 'home', action) => {
    switch (action.type) {
        case types.SET_PAGE:
            return action.page
        default:
            return state
    }
}
