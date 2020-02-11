import { constants } from '../_constants'
import { initialState } from '../initialState'

let { actions } = constants

export default (state = initialState.detailsItem, action) => {
    switch (action.type) {
        case actions.REQUEST_ID:
            return {
                ...state,
                isFetching: true,
            }
        case actions.RECEIVE_ID:
            return {
                ...state,
                isFetching: false,
                item: action.payload,
                lastUpdated: Date.now(),
            }
        default:
            return state
    }
}
