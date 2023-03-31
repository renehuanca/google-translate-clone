import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { ChangeIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SectionType } from './types.d'
import TextArea from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App () {
  const {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    setFromLanguage,
    setToLanguage,
    interchangeLanguage,
    setFromText,
    setResult
  } = useStore()

  useEffect(() => {
    void translate({ fromLanguage, toLanguage, text: fromText })
      .then(result => {
        if (result == null) return
        setResult(result)
        console.log(result)
      })
      .catch(() => setResult('Error'))
  }, [fromText, fromLanguage, toLanguage])
  return (
    <div className='container mx-auto px-4'>
      <h1 className='text-2xl text-center my-8'>Google Translate Clone</h1>
      <div className='flex items-start max-w-[600px] mx-auto'>
        <div className='w-full'>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
          <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
        </div>
        <button
          className={`px-4 py-1 ${fromLanguage === AUTO_LANGUAGE ? 'opacity-50' : ''}`}
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
          <TextArea
            type={SectionType.To}
            value={result}
            onChange={setResult}
            loading={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default App
