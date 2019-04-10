import { SET_LANG, SET_PAGE } from './types'

export * from './searchActions'
export * from './iiifActions'
export * from './googleSheetsActions'
export * from './WPPagesActions'
export * from './WPPostsActions'
export * from './utilityActions'

export const buildYear = '2018'
export const defaultLanguage = 'en'
export const languages = {
  en: "English",
  mn: "Mongolian"
}

export const searchParams = {
  initialIndex: 'v1_bdrc_work',
  type: '_doc',
  size: 10
}

export const v1Indices = ['v1_*']
export const v2Indices = ['v2_*']

const IIIFImageAPI = {
  region: 'full',
  size: 'max', //',184', //',92', 'max'
  rotation: '0',
  qualityAndFormat: 'default.jpg'
}

export const IIIFsuffix = 
  `/${IIIFImageAPI.region}/${IIIFImageAPI.size}/${IIIFImageAPI.rotation}/${IIIFImageAPI.qualityAndFormat}`

export const setLanguage = language => ({
  type: SET_LANG,
  language
})

export const setPage = page => ({
    type: SET_PAGE,
    page
})