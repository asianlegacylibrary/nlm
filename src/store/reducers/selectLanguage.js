import { constants } from '../_constants'
import { actions } from '../types'
let { defaultLanguage, routerActions } = constants

// should use defaultLanguage code here
export default (state = defaultLanguage, action) => {
    switch (action.type) {
        case actions.SET_LANG:
            return action.language
        case routerActions.LOCATION_CHANGE:
            if (action.payload.location.pathname.split('/')[1].length === 0) {
                return state
            }
            return action.payload.location.pathname.split('/')[1]
        default:
            return state
    }
}
