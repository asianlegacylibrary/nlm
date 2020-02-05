import { wpURL } from '../endpoints'
import { constants } from '../../../store/_constants'
let { languages } = constants

export default async type => {
    try {
        const data = await wpURL.get(`${type}?_embed`)

        const d = data.data.reduce((r, a) => {
            const x = Object.keys(languages).find(
                key => languages[key] === a.acf.language
            )
            r[x] = r[x] || []
            r[x].push(a)
            return r
        }, [])
        return { data: d }
    } catch (error) {
        console.error('fetch ID error! ', error)
        return error
    }
}
