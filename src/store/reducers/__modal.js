import { constants } from '../_constants'
let { actions } = constants

export default (state = { modalID: 0, initialRender: false }, action) => {
    switch (action.type) {
        case actions.SET_MODAL:
            return {
                ...state,
                modalID: action.modalID,
                show: action.show,
                initialRender: action.initialRender,
            }
        default:
            return state
    }
}
