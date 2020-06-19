import { actions } from '../types'
import { initialState } from '../initialState'

export default (state = initialState.ES, action) => {
    switch (action.type) {
        /* REQUESTS */
        case actions.REQUEST_RESULTS:
            return {
                ...state,
                search: {
                    ...state.search,
                    isFetching: true,
                    currentSearch: false,
                },
            }
        case actions.REQUEST_ID:
            return {
                ...state,
                id: {
                    ...state.id,
                    isFetching: true,
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
        case actions.REQUEST_AUTHORS:
            return {
                ...state,
                authors: {
                    ...state.authors,
                    isFetching: true,
                },
            }
        case actions.REQUEST_SUBJECTS:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    isFetching: true,
                },
            }
        // case actions.REQUEST_PLACES:
        //     return {
        //         ...state,
        //         places: {
        //             ...state.places,
        //             isFetching: true,
        //         },
        //     }
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
                // places: {
                //     ...state.places,
                //     isFetching: true,
                // },
            }
        /* RECEIVES */
        case actions.RECEIVE_RESULTS:
            return {
                ...state,
                search: {
                    ...state.search,
                    isFetching: false,
                    currentSearch: true,
                    error: false,
                    errorStatus: null,
                    items: {
                        hits: action.payload.RESULTS,
                    },
                    aggregations: Object.keys(action.payload.AGGS)
                        .sort()
                        .reduce(
                            // eslint-disable-next-line
                            (r, k) => ((r[k] = action.payload.AGGS[k]), r),
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
                // places: {
                //     ...state.places,
                //     isFetching: false,
                //     items: action.payload.PLACES,
                //     lastUpdated: Date.now(),
                // },
            }
        case actions.RECEIVE_ID:
            return {
                ...state,
                id: {
                    ...state.id,
                    isFetching: false,
                    items: action.payload.ID,
                    lastUpdated: Date.now(),
                    related: action.payload.RELATED,
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
        case actions.RECEIVE_AUTHORS:
            return {
                ...state,
                authors: {
                    ...state.authors,
                    isFetching: false,
                    items: action.payload,
                    lastUpdated: Date.now(),
                },
            }
        case actions.RECEIVE_SUBJECTS:
            return {
                ...state,
                subjects: {
                    ...state.subjects,
                    isFetching: false,
                    items: action.payload,
                    lastUpdated: Date.now(),
                },
            }
        // case actions.RECEIVE_PLACES:
        //     return {
        //         ...state,
        //         places: {
        //             ...state.places,
        //             isFetching: false,
        //             items: action.payload,
        //             lastUpdated: Date.now(),
        //         },
        //     }
        case actions.CLEAR_ID:
            console.log('this is clear id')
            return {
                ...state,
                id: initialState.ES.id,
            }
        default:
            return state
    }
}
