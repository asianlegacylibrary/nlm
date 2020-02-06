export const initialState = {
    ES: {
        works: {
            isFetching: false,
            items: {
                hits: {
                    total: 0,
                    hits: [],
                },
            },
            lastUpdated: null,
        },
        authors: {
            isFetching: false,
            items: {
                hits: {
                    total: 0,
                    hits: [],
                },
            },
            lastUpdated: null,
        },
        subjects: {
            isFetching: false,
            items: {
                hits: {
                    total: 0,
                    hits: [],
                },
            },
            lastUpdated: null,
        },
        search: {
            isFetching: false,
            currentSearch: false,
            items: {
                hits: {
                    total: 0,
                    hits: [],
                },
            },
            aggregations: {},
            lastUpdated: null,
        },
    },
    detailsItem: {
        isFetching: false,
        item: {
            hits: {
                total: 0,
                hits: [],
            },
        },
        lastUpdated: null,
    },
    menu: 'browse',
    browse: 'works',
    offsets: {
        works: 0,
        authors: 0,
        subjects: 0,
        search: 0,
    },
    filterArray: [],
}
