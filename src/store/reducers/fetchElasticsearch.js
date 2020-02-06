import { constants } from '../_constants'
import { initialState } from '../initialState'
let { actions } = constants

export default (state = initialState.ES, action) => {
    switch (action.type) {
        case actions.REQUEST_RESULTS:
            return {
                ...state,
                search: {
                    ...state.search,
                    isFetching: true,
                    currentSearch: false,
                },
            }
        case actions.REQUEST_WORKS:
            return {
                ...state,
                works: {
                    ...state.works,
                    isFetching: true,
                },
            }
        case actions.REQUEST_ALL:
            return {
                ...state,
                works: {
                    ...state.works,
                    isFetching: true,
                },
                authors: {
                    ...state.authors,
                    isFetching: true,
                },
                subjects: {
                    ...state.subjects,
                    isFetching: true,
                },
            }

        case actions.RECEIVE_RESULTS:
            return {
                ...state,
                search: {
                    ...state.search,
                    isFetching: false,
                    currentSearch: true,
                    error: false,
                    errorStatus: null,
                    items: action.payload,
                    aggregations: Object.keys(action.secondaryPayload)
                        .sort()
                        .reduce(
                            (r, k) => ((r[k] = action.secondaryPayload[k]), r),
                            {}
                        ),
                    lastUpdated: Date.now(),
                },
            }
        case actions.RECEIVE_ALL:
            //console.log(action.payload)
            return {
                ...state,
                works: {
                    ...state.works,
                    isFetching: false,
                    items: action.payload.WORKS,
                    lastUpdated: Date.now(),
                },
                authors: {
                    ...state.authors,
                    isFetching: false,
                    items: action.payload.AUTHORS,
                    lastUpdated: Date.now(),
                },
                subjects: {
                    ...state.subjects,
                    isFetching: false,
                    items: action.payload.SUBJECTS,
                    lastUpdated: Date.now(),
                },
            }
        case actions.RECEIVE_WORKS:
            return {
                ...state,
                works: {
                    ...state.works,
                    isFetching: false,
                    items: action.payload,
                    lastUpdated: Date.now(),
                },
            }

        default:
            return state
    }
}
