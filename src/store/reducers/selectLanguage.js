import * as types from '../types'
import { defaultLanguage } from '../actions/index'
// should use defaultLanguage code here
export default (state = defaultLanguage, action) => {
    switch (action.type) {
        case types.SET_LANG:
            return action.language
        case types.LOCATION_CHANGE:
            if (action.payload.location.pathname.split('/')[1].length === 0) {
                return state
            }
            return action.payload.location.pathname.split('/')[1]
        default:
            return state
    }
}
