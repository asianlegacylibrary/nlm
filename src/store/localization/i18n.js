import i18n from 'i18next'
import Backend from 'i18next-xhr-backend'
//import LanguageDetector from 'i18next-browser-languagedetector'
import { detectorOptions } from './detector'
import { reactI18nextModule } from 'react-i18next'
import { languages } from '../actions'


// NOTE THAT 'en' is attempting to be loaded because of LanguageDetector (probably)
// and in our case we're loading 'English'
// this is due to how I originally coded the component
// refactor to use language codes :)

const debug = process.env.NODE_ENV === 'production' ? false : true

i18n
  .use(Backend)
  //.use(LanguageDetector)
  .use(reactI18nextModule)

  .init({
    fallbackLng: 'en',
    debug: debug,
    preload: Object.keys(languages).map(l => l),

    returnObjects: true,

    detection: detectorOptions,

    interpolation: {
      escapeValue: false,
    },

    react: {
      wait: true
    }
  })

export default i18n
