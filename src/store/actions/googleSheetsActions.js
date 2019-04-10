import Tabletop from 'tabletop'
import * as types from './types'
import { log } from './index'

const d = `https://docs.google.com/spreadsheets/d/`
const gsKey = `1hPqe-Y2TWwMTAxIEXYvc8du_GMFUJQNPvZbJou7veAY`
//const testKey = `1P6Dk9SN0af7GDitw7-tRXGc5N22AEXoaOpDIKzVdlK0`
const spreadSheet = `${d}${gsKey}/edit?usp=sharing`

function requestGS() {
    return {
        type: types.REQUEST_GS
    }
}

function receiveGS(gs) {
    return {
        type: types.RECEIVE_GS,
        gs: gs,
        receivedAt: Date.now()
    }
}

const tableTopInit = async () => {
    return await new Promise((response, error) => {
        Tabletop.init({
            key: spreadSheet,
            callback: (data, tabletop) => { 
                response(data.Stats.elements)
                error(tabletop)
            }
            //, simpleSheet: true
        })
    })
}

export function getGS() {
    return async dispatch => {
        dispatch(requestGS())
        try {
            const data = await tableTopInit()
            log('GS Data:', data)
            // add some data processing
            let gsData = {}
            data.map(d => {
                const key = d.StatName.split(' ').join('')
                gsData[key] = isNaN(d.Value) ? d.Value : String(d.Value).replace(/(.)(?=(\d{3})+$)/g,'$1,')
            })
            return dispatch(receiveGS(gsData))
        } catch(error) {
            console.error('error from tabletop', error)
        }
    }
}
