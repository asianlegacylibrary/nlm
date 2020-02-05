export function selectorDetailsItem(itemDetails) {
    const newObj = {}
    Object.entries(itemDetails._source).forEach(([k, v]) => {
        if (v && !Array.isArray(v)) {
            if (typeof v === 'object') {
                // OBJECT
                newObj[k] = [v]
            } else {
                // STRING OR INT
                newObj[k] = v //[{ _id: k, _value: v }]
            }
        } else {
            // ARRAY
            newObj[k] = v
        }
    })
    return newObj
}
