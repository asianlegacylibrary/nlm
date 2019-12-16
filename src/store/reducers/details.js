import * as types from '../types'
export default (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_ID:
            return {
                ...state,
                isFetching: true,
            }
        case types.RECEIVE_ID:
            return {
                ...state,
                isFetching: false,
                item: action.data,
                imageAsset: action.imageAsset,
                volume: action.volume,
                lastUpdated: action.receivedAt,
            }
        case types.REQUEST_ASSOCIATED_RECORDS:
            return {
                ...state,
                resources: {
                    ...state.resources,
                    isFetching: true,
                },
            }
        case types.RECEIVE_ASSOCIATED_RECORDS:
            return {
                ...state,
                resources: {
                    ...state.resources,
                    isFetching: false,
                    items: action.resources,
                },
            }
        default:
            return state
    }
}
