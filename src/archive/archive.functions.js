export const REQUEST_PAGES = 'REQUEST_PAGES';
function requestPages(lang) {
    return {
        type: REQUEST_PAGES,
        lang
    }
}

export const RECEIVE_PAGES = 'RECEIVE_PAGES';
function receivePages(lang, json) {
    return {
        type: RECEIVE_PAGES,
        lang,
        pages: json.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now()
    }
}

export function fetchPages(lang) {
    return function(dispatch) {
        dispatch(requestPages(lang))
        return fetch(`http://206.189.71.52/wp-json/wp/v2/pages?_embed`)
            .then(
                response => response.json(),
                error => console.log('An error ', error)    
            )
            .then(json =>
                dispatch(receivePages(lang, json))
            )
    }
}


// .then(json => {
            //     //reduce using empty obj to group by language
            //     return json.reduce(function (r, a) {
            //         r[a.acf.language] = r[a.acf.language] || [];
            //         r[a.acf.language].push(a);
            //         return r;
            //     }, Object.create(null));
            // })
            