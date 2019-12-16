import * as types from '../types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_WORKS:
            return {
                ...state,
                works: {
                    ...state.works,
                    isFetching: true,
                },
            }
        case types.REQUEST_AUTHORS:
            return {
                ...state,
                authors: {
                    ...state.authors,
                    isFetching: true,
                },
            }
        case types.REQUEST_SUBJECTS:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    isFetching: true,
                },
            }
        case types.RECEIVE_WORKS:
            return {
                ...state,
                works: {
                    ...state.works,
                    isFetching: false,
                    items: action.data,
                    lastUpdated: action.receivedAt,
                },
            }
        case types.RECEIVE_AUTHORS:
            return {
                ...state,
                authors: {
                    ...state.authors,
                    isFetching: false,
                    items: action.data,
                    lastUpdated: action.receivedAt,
                },
            }
        case types.RECEIVE_SUBJECTS:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    isFetching: false,
                    items: action.data,
                    lastUpdated: action.receivedAt,
                },
            }
        default:
            return state
    }
}
