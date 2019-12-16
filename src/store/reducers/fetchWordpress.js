import * as types from '../types'

export default (state = {}, action) => {
    switch (action.type) {
        case types.REQUEST_PAGES:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    isFetching: true,
                },
            }
        case types.RECEIVE_PAGES:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    isFetching: false,
                    items: action.pages,
                    lastUpdated: action.receivedAt,
                },
            }
        case types.REQUEST_POSTS:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    isFetching: true,
                },
            }
        case types.RECEIVE_POSTS:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    isFetching: false,
                    items: action.posts,
                    lastUpdated: action.receivedAt,
                },
            }
        default:
            return state
    }
}
