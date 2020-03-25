export function getTotal(browse, menu, state) {
    if (menu === 'search') {
        return state.ES.search.items.hits.total.value
    }
    return state.ES[browse].items.hits.total.value
}
