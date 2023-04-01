import { SpeakerIcon } from './Icons'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from '../constants'
import { type FromLanguage, type Language } from '../types'
import { SectionType } from '../enums'

interface Props {
  type: SectionType
  language: FromLanguage | Language
  result: string
}

const isDisabled = (type: SectionType, language: string, result: string) => {
  if (result === '') return true
  if (type === SectionType.From && language === AUTO_LANGUAGE) return true

  return false
}

const commonClasses = 'p-4 rounded-full hover:bg-gray-200'

const Speakerphone = ({ type, language, result }: Props) => {
  const handleSpeak = () => {
    if (language === AUTO_LANGUAGE) return
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[language]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }
  const classes = isDisabled(type, language, result)
    ? `${commonClasses} text-gray-400 hover:bg-transparent`
    : commonClasses

  return (
    <button
      className={classes}
      disabled={isDisabled(type, language, result)}
      onClick={handleSpeak}
    >
      <SpeakerIcon />
    </button>
  )
}

export default Speakerphone
