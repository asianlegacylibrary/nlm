import { constants } from '../_constants'
let { actions } = constants

export default (state = { items: {} }, action) => {
    switch (action.type) {
        case actions.REQUEST_GS:
            return {
                ...state,
                isFetching: true,
            }
        case actions.RECEIVE_GS:
            return {
                ...state,
                isFetching: false,
                items: action.payload,
                lastUpdated: Date.now(),
            }
        default:
            return state
    }
}
