import { constants } from '../_constants'
//import { initialState } from '../initialState'
let { actions } = constants

// SEARCH RESULTS
export default (state = [], action) => {
    console.log(action.type)
    switch (action.type) {
        case actions.SET_FILTER_ARRAY:
            return action.payload
        case actions.CLEAR_FILTER_ARRAY:
            return []
        default:
            return state
    }
}
