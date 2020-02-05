import { constants } from '../_constants'
let { actions } = constants

export default (state = {}, action) => {
    switch (action.type) {
        case actions.REQUEST_PAGES:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    isFetching: true,
                },
            }
        case actions.RECEIVE_PAGES:
            return {
                ...state,
                pages: {
                    ...state.pages,
                    isFetching: false,
                    items: action.payload,
                    lastUpdated: Date.now(),
                },
            }
        case actions.REQUEST_POSTS:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    isFetching: true,
                },
            }
        case actions.RECEIVE_POSTS:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    isFetching: false,
                    items: action.payload,
                    lastUpdated: Date.now(),
                },
            }
        default:
            return state
    }
}
