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
        results: {
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
    menu: 'works',
    offsets: {
        works: 0,
        results: 0,
    },
    filterTerm: '',
}
