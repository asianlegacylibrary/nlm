import * as types from '../types'

export * from './actionsES'
export * from './actionsGS'
export * from './actionsWP'
export * from './utilityActions'
export * from './ontology'

export const buildYear = '2018'
export const defaultLanguage = 'en'
export const languages = {
    en: 'English',
    mn: 'Mongolian',
}

export const pages = ['home', 'archives']

export const browseOptions = ['Title', 'Author', 'Subject']
export const browseOptionsObj = [
    { browse: 'Title', stateType: 'esWorks' },
    { browse: 'Author', stateType: 'esAuthors' },
    { browse: 'Subject', stateType: 'esSubjects' },
]

export const bdrGender = {
    'bdr:GenderMale': 'Male',
    'bdr:GenderFemale': 'Female',
}

export const bdrObjectType = {
    'bdr:ObjectTypeBlockprint': 'Blockprint',
}

export const bdrPurlURL = `http://purl.bdrc.io/resource/`

export const collections = [
    { key: '1', name: 'Collection 1' },
    { key: '2', name: 'Collection 2' },
]

export const searchParams = {
    initialIndex: 'v1_bdrc_work',
    initialIndexPrefix: 'v1_bdrc_',
    type: '_doc',
    size: 10,
}

export const v1Indices = ['v1_*']
export const v2Indices = ['v2_*']

const IIIFImageAPI = {
    region: 'full',
    size: 'max',
    rotation: '0',
    qualityAndFormat: 'default.jpg',
}

export const IIIFsuffix = `/${IIIFImageAPI.region}/${IIIFImageAPI.size}/${IIIFImageAPI.rotation}/${IIIFImageAPI.qualityAndFormat}`

export const setLanguage = language => ({
    type: types.SET_LANG,
    language,
})

export const setLanguage2 = (language, i18n) => {
    i18n.changeLanguage(language)
    return {
        type: types.SET_LANG,
        language,
    }
}

export const setPage = page => ({
    type: types.SET_PAGE,
    page,
})

export const setCollapse = collapse => ({
    type: types.SET_COLLAPSE,
    collapse,
})

export const setCollection = collection => ({
    type: types.SET_COLLECTION,
    collection,
})

export const setBrowse = browse => ({
    type: types.SET_BROWSE,
    browse,
})

export function receiveID(json) {
    return {
        type: types.RECEIVE_ID,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        imageAsset: json.hits.hits[0]._source.workHasItemImageAsset,
        volume: json.hits.hits[0]._source.workHasItem,
        receivedAt: Date.now(),
    }
}

export function receiveESData(type, json) {
    return {
        type: type,
        data: json, //.filter(child => child.acf.language === lang), //.data.children.map(child => child.data),
        receivedAt: Date.now(),
    }
}
export function receiveAssociatedRecords(json) {
    return {
        type: types.RECEIVE_ASSOCIATED_RECORDS,
        resources: json,
        //receivedAt: Date.now(),
    }
}
