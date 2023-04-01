import { type ChangeEvent } from 'react'
import { SectionType } from '../enums'
import { type FromLanguage, type Language } from '../types'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'

type Props =
  | { type: SectionType.From, value: FromLanguage, onChange: (Language: FromLanguage) => void }
  | { type: SectionType.To, value: Language, onChange: (Language: Language) => void }

const LanguageSelector = ({ onChange, type, value }: Props) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <select
      className='inline-flex w-full justify-center rounded-md bg-white px-6 py-6 text-sm font-bold text-indigo-500 outline-none hover:bg-gray-100'
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>{'Detectar Idioma'.toLocaleUpperCase()}</option> }

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal.toLocaleUpperCase()}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
