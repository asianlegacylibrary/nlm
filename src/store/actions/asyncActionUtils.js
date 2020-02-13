import { status } from '../types'

const getAsyncAction = ({ actionType, asyncFunc }) => {
    const actionTypeRequest = `${status.REQUEST}_${actionType}`
    const actionTypeReceive = `${status.RECEIVE}_${actionType}`
    const actionTypeClear = `${status.CLEAR}_${actionType}`
    const actionTypeError = `${status.ERROR}_${actionType}`
    //const actionTypeResources = `RECEIVE_ASSOCIATED_RECORDS`

    const startAction = () => {
        return {
            type: actionTypeRequest,
        }
    }

    const clearAction = () => {
        return {
            type: actionTypeClear,
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
            if (['ID', 'RESULTS'].some(el => actionType.includes(el))) {
                dispatch(clearAction())
            }
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
