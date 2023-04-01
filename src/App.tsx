import { AUTO_LANGUAGE } from './constants'
import { useStore } from './hooks/useStore'
import { ChangeIcon, ChatgptIcon, GithubIcon, ReactIcon, TailwindcssIcon } from './components/Icons'
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
      .catch(() => setResult('Error in API'))
  }, [deboundeFromText, fromLanguage, toLanguage])

  return (
    <div className='container mx-auto md:px-4 text-gray-600'>
      <h1 className='text-2xl md:text-3xl text-center mt-12 text-indigo-500 font-bold'>
        Google Translate Clone
      </h1>
      <div className='flex justify-center mt-4 gap-2'>
        <ReactIcon />
        <ChatgptIcon />
        <TailwindcssIcon />
      </div>
      <div className='flex items-center max-w-[800px] mx-auto border-x border-t mt-8'>
        <div className='w-full'>
          <LanguageSelector
            type={SectionType.From}
            value={fromLanguage}
            onChange={setFromLanguage}
          />
        </div>
        <button
          className={`p-4 mx-4 hover:bg-gray-200 rounded-full ${fromLanguage === AUTO_LANGUAGE ? 'opacity-50 hover:bg-transparent' : ''}`}
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
        </div>
      </div>
      <div className='flex flex-col md:flex-row max-w-[800px] mx-auto shadow-md'>
        <div className='relative w-full'>
          <TextArea
            type={SectionType.From}
            value={fromText}
            onChange={setFromText}
          />
          <div className='absolute bottom-0 p-2'>
            <Microphone onVoice={setFromText}/>
            <Speakerphone
              type={SectionType.From}
              language={fromLanguage}
              result={fromText}
            />
          </div>
        </div>
        <div className='relative w-full'>
          <TextArea
            type={SectionType.To}
            value={result}
            onChange={setResult}
            loading={loading}
          />
          <div className='absolute bottom-0 p-2'>
            <Speakerphone
              type={SectionType.To}
              language={toLanguage}
              result={result}
            />
            <Clipboard result={result}/>
          </div>
        </div>
      </div>
      <footer className='text-center mt-8'>
        Rene Huanca - {new Date().getFullYear()}
      </footer>
      <div className='fixed -top-20 -left-20 rotate-45 bg-gray-800 text-gray-50 w-[160px] h-[160px]'></div>
      <a href="#" className='fixed top-3 left-3 hover:scale-125 transition-transform'>
        <GithubIcon width={40} height={40} color={'#DDD'}/>
      </a>
    </div>
  )
}

export default App
