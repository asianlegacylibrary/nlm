import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { detectorOptions } from './detector'
import { initReactI18next } from 'react-i18next'
import { languages } from '../actions'

const debug = process.env.NODE_ENV !== 'production' ? true : false

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  
  .init({
    fallbackLng: 'en',
    debug: debug,
    //load: 'languageOnly',
    preload: Object.keys(languages).map(l => l),
    returnObjects: true,

    detection: detectorOptions,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },

    react: {
      wait: true,
      useSuspense: false
    }

  })

export default i18n
