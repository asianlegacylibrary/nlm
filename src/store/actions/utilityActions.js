export const log = (...msgs) => {
	if (process.env.NODE_ENV === 'development') {
		console.log(...msgs)
	}
}

// return a unique map
export const uniqBy = (a, key) => {
    return [
        ...new Map(
            a.map(x => [key(x), x])
        ).values()
    ]
}

// using hash tables and filter
export const uniq = (a) => {
    var prims = {"boolean":{}, "number":{}, "string":{}}, objs = [];

    return a.filter(function(item) {
        var type = typeof item;
        if(type in prims)
            return prims[type].hasOwnProperty(item) ? false : (prims[type][item] = true);
        else
            return objs.indexOf(item) >= 0 ? false : objs.push(item);
    });
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
