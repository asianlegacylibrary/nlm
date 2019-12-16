import * as types from '../types'
export default (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_GS:
            return {
                ...state,
                isFetching: true,
            }
        case types.RECEIVE_GS:
            return {
                ...state,
                isFetching: false,
                items: action.gs,
                lastUpdated: action.receivedAt,
            }
        default:
            return state
    }
}
