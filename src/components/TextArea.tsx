import { type ChangeEvent } from 'react'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonClasses = 'block w-full mt-4 p-2 resize-none rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:py-1.5 sm:text-sm sm:leading-6'

const getPlaceholder = (type: SectionType, loading?: boolean) => {
  if (type === SectionType.From) return 'Ingresar texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const classes = type === SectionType.From
    ? commonClasses
    : `${commonClasses} bg-gray-50`

  const handleChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(evt.target.value)
  }

  return (
    <textarea
      className={classes}
      cols={30}
      rows={10}
      disabled={type === SectionType.To && loading === true}
      placeholder={getPlaceholder(type, loading)}
      autoFocus={type === SectionType.From}
      onChange={(evet) => handleChange}
    >
      {value}
    </textarea>
  )
}

export default TextArea
