import { type ChangeEvent } from 'react'
import { SectionType, type FromLanguage, type Language } from '../types.d'
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
      className='inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none focus:ring focus:border-gray-500 hover:bg-gray-50'
      onChange={handleChange}
      value={value}
    >
      {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar Idioma</option> }

      {Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
        <option key={key} value={key}>
          {literal}
        </option>
      ))}
    </select>
  )
}

export default LanguageSelector
