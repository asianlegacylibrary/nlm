export const detectorOptions = {
    // order and from where user language should be detected
    // we're using path /en /mn
    order: ['path', 'localStorage'],
    lookupFromPathIndex: 0, //1st element on path
    lookupLocalStorage: 'i18nextLng', // caching to localStorage
    
    // cache user language on
    caches: ['localStorage'],
    excludeCacheFor: false
}