import * as types from '../types'
export default (state = { modalID: 0, initialRender: false }, action) => {
    switch (action.type) {
        case types.SET_MODAL:
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
