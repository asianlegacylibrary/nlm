import { constants } from '../_constants'
let { status } = constants
const getAsyncAction = ({ actionType, asyncFunc }) => {
    const actionTypeRequest = `${status.REQUEST}_${actionType}`
    const actionTypeReceive = `${status.RECEIVE}_${actionType}`
    const actionTypeError = `${status.ERROR}_${actionType}`
    //const actionTypeResources = `RECEIVE_ASSOCIATED_RECORDS`

    const startAction = () => {
        return {
            type: actionTypeRequest,
        }
    }

    const successAction = payload => {
        return {
            type: actionTypeReceive,
            payload: payload,
        }
    }

    const failureAction = error => {
        return {
            type: actionTypeError,
            payload: error,
        }
    }

    const asyncAction = args => {
        return async dispatch => {
            dispatch(startAction())
            try {
                const { data } = await asyncFunc(args)
                dispatch(successAction(data))
            } catch (error) {
                dispatch(failureAction(error))
            }
        }
    }

    return asyncAction
}

export default getAsyncAction
