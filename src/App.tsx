import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { ChangeIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SectionType } from './types.d'

function App () {
  const { fromLanguage, toLanguage, setFromLanguage, setToLanguage, interchangeLanguage } = useStore()

  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl text-center my-8'>Google Translate Clone</h1>
      <div className='flex max-w-[600px] mx-auto'>
        <div className='w-full'>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          {fromLanguage}
        </div>
        <button
          className={`px-4 ${fromLanguage === AUTO_LANGUAGE ? 'opacity-50' : ''}`}
          disabled={fromLanguage === AUTO_LANGUAGE}
          onClick={() => {
            interchangeLanguage()
          }}
        >
          <ChangeIcon />
        </button>
        <div className='w-full'>
          <LanguageSelector
            type={SectionType.To}
            value={toLanguage}
            onChange={setToLanguage}
          />
          {toLanguage}
        </div>
      </div>
    </div>
  )
}

export default App
