export const log = (...msgs) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...msgs)
	}
}

// ES6 sort
export const sortNestedES6 = (nestedItem, prop, arr) => {
    return arr.sort((a, b) => {
        return a[nestedItem][prop].localeCompare((b[nestedItem][prop]))
    })
}

// arr is the array of objects, prop is the property to sort by
export const sortNested = (nestedObj, prop, arr) => {
    return arr.sort((a, b) => {
        if (a[nestedObj][prop] < b[nestedObj][prop]) {
            return -1;
        } else if (a[nestedObj][prop] > b[nestedObj][prop]) {
            return 1;
        } else {
            return 0;
        }
    })
}
