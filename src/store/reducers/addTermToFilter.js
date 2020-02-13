//import { UniqueLabelSet } from '../../tools/utilities'
import { uniqueFilters } from '../../tools/utilities'

import { actions } from '../types'

// SEARCH RESULTS
export default (state = [], action) => {
    switch (action.type) {
        case actions.ADD_TERM_TO_FILTER:
            let { filter, isActive } = action.payload
            return uniqueFilters([...state, filter], isActive, filter.label)
        case actions.REMOVE_FILTER:
            return [...state].filter(f => f.label !== action.payload)
        //return Array.from(new UniqueLabelSet([...state, action.term])) //.sort()
        case actions.CLEAR_FILTER_ARRAY:
            return []
        default:
            return state
    }
}
