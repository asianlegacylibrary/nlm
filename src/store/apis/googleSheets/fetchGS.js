import Tabletop from 'tabletop'
import { gs } from '../endpoints'

const spreadsheet = `${gs.d}${gs.gsKey}${gs.editParam}`

const tableTopInit = async () => {
    return await new Promise((response, error) => {
        Tabletop.init({
            key: spreadsheet,
            callback: (data, tabletop) => {
                response(data.Stats.elements)
                error(tabletop)
            },
            //, simpleSheet: true
        })
    })
}

export default async () => {
    try {
        const data = await tableTopInit()
        // add some data processing
        let gsData = {}
        data.forEach(d => {
            const key = d.StatName.split(' ').join('')
            gsData[key] = isNaN(d.Value)
                ? d.Value
                : String(d.Value).replace(/(.)(?=(\d{3})+$)/g, '$1,')
        })
        return { data: gsData }
    } catch (error) {
        console.error('error from tabletop', error)
        return error
    }
}
