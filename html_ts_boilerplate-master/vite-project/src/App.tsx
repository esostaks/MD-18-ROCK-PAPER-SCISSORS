import Play from './Components/Play/Play'
import Home from '../src/Components/Home/Home'
import Statistics from '../src/Components/Statistics/Statistics'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import i18n from 'i18next'
import { useTranslation } from 'react-i18next'
import { translationsEn, translationsLv, translationsRu } from '../public/localise/languages'
import { initReactI18next} from 'react-i18next'


// import './App.css'

i18n
.use(initReactI18next)
.init( {
  resources: {
    en: {translation: translationsEn},
    lv: {translation: translationsLv},
    ru: {translation: translationsRu},
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false},
})



function App() {

  const {t} = useTranslation()

  const client = new QueryClient() 

  //@ts-ignore
  const selectLanguage = (event) => {
    i18n.changeLanguage(event.target.value)
  }


 
  return (
    <QueryClientProvider client={client}>
      <Router>
        <div className='navigation'>
          <div className='navigation'>
            <div  className='link'><Link to="/">{t('home')}</Link></div>
            <div  className='link'><Link to="/game">{t('play')}</Link></div>
            <div  className='link'><Link to="/statistics">{t('statistics')}</Link></div>
          </div>
          <div className="languageSelect">
            <select name="language" onChange={selectLanguage} >
              <option value="en">EN</option>
              <option value="lv">LV</option>
              <option value="ru">RU</option>
            </select>
          </div>

        </div>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/game" element={<Play />}/>
            <Route path="/statistics" element={<Statistics />}/>
          </Routes>
          
      </Router>
    </QueryClientProvider>    
  )
}

export default App
