import { SpeakerIcon } from './Icons'
import { VOICE_FOR_LANGUAGE } from '../constants'
import { type FromLanguage, type Language } from '../types'
import { SectionType } from '../enums'

type Props =
  | { type: SectionType.From, language: FromLanguage, result: string }
  | { type: SectionType.To, language: Language, result: string }

const Speakerphone = ({ type, language, result }: Props) => {
  const handleSpeak = () => {
    if (type === SectionType.From) return
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[language]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <button
      className='p-2'
      onClick={handleSpeak}
    >
      <SpeakerIcon />
    </button>
  )
}

export default Speakerphone
