import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { ChangeIcon } from './components/Icons'
import LanguageSelector from './components/LanguageSelector'
import { SectionType } from './enums'
import TextArea from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import Speakerphone from './components/Speakphone'
import Clipboard from './components/Clipboard'
import Microphone from './components/Microphone'

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

  const deboundeFromText = useDebounce(fromText, 500)

  useEffect(() => {
    translate({ fromLanguage, toLanguage, text: deboundeFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
        console.log(result)
      })
      .catch(() => setResult(''))
  }, [deboundeFromText, fromLanguage, toLanguage])

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
          <div className='relative'>
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
            <div className='absolute bottom-0'>
              <Microphone onVoice={setFromText}/>
              <Speakerphone
                type={SectionType.From}
                language={fromLanguage}
                result={fromText}
              />
            </div>
          </div>
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
          <div className='relative'>
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
            <div className='absolute bottom-0'>
              <Speakerphone
                type={SectionType.To}
                language={toLanguage}
                result={result}
              />
              <Clipboard result={result}/>
            </div>
         </div>
        </div>
      </div>
    </div>
  )
}

export default App
