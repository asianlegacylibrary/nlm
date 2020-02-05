import { constants } from '../_constants'
let { actions } = constants

export default (state = 'home', action) => {
    switch (action.type) {
        case actions.SET_PAGE:
            return action.page
        default:
            return state
    }
}
