import { constants } from '../_constants'
let { actions } = constants
export default (state = { items: [] }, action) => {
    switch (action.type) {
        case actions.REQUEST_ASSOCIATED_RECORDS:
            return {
                ...state,
                isFetching: true,
            }
        case actions.RECEIVE_ASSOCIATED_RECORDS:
            return {
                ...state,
                isFetching: false,
                items: action.payload,
            }
        default:
            return state
    }
}
