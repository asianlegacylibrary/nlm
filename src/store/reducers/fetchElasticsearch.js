import { constants } from '../_constants'
import { initialState } from '../initialState'
let { actions } = constants

export default (state = initialState.ES, action) => {
    switch (action.type) {
        case actions.REQUEST_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
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

        case actions.RECEIVE_RESULTS:
            return {
                ...state,
                results: {
                    ...state.results,
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
