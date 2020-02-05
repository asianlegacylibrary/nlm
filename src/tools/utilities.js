export class UniqueLabelSet extends Set {
    constructor(values) {
        super(values)
        const labels = []

        for (let item of this) {
            if (labels.some(e => e.label === item.label)) {
                this.delete(item)
            } else {
                labels.push(item)
            }
        }
    }
}

export function uniqueFilters(filters, isActive, isFilterTerm) {
    const filterArray = []
    for (let item of filters) {
        if (filterArray.some(e => e.label === item.label)) {
            filters.filter(f => f.label !== item.label)
        } else if (!isActive && isFilterTerm === item.label) {
            filters.filter(f => f.label !== item.label)
        } else {
            filterArray.push(item)
        }
    }

    return filterArray
}
export const log = (...msgs) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(...msgs)
    }
}

export function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// return a unique map
export const uniqBy = (a, key) => {
    return [...new Map(a.map(x => [key(x), x])).values()]
}

// using hash tables and filter
export const uniq = a => {
    var prims = { boolean: {}, number: {}, string: {} },
        objs = []

    return a.filter(function(item) {
        var type = typeof item
        if (type in prims)
            return prims[type].hasOwnProperty(item)
                ? false
                : (prims[type][item] = true)
        else return objs.indexOf(item) >= 0 ? false : objs.push(item)
    })
}

// ES6 sort
export const sortNestedES6 = (nestedItem, prop, arr) => {
    return arr.sort((a, b) => {
        return a[nestedItem][prop].localeCompare(b[nestedItem][prop])
    })
}

// arr is the array of objects, prop is the property to sort by
export const sortNested = (nestedObj, prop, arr) => {
    return arr.sort((a, b) => {
        if (a[nestedObj][prop] < b[nestedObj][prop]) {
            return -1
        } else if (a[nestedObj][prop] > b[nestedObj][prop]) {
            return 1
        } else {
            return 0
        }
    })
}
