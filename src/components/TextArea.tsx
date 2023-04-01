import { type ChangeEvent } from 'react'
import { SectionType } from '../enums'

interface Props {
  type: SectionType
  loading?: boolean
  onChange: (value: string) => void
  value: string
}

const commonClasses = 'block w-full p-6 resize-none border-0 font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 outline-none placeholder:text-gray-400 text-lg sm:text-2xl sm:leading-8'

const getPlaceholder = (type: SectionType, loading?: boolean) => {
  if (type === SectionType.From) return 'Ingresar texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const classes = type === SectionType.From
    ? commonClasses
    : `${commonClasses} bg-gray-100`

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
      onChange={handleChange}
      value={value}
    >
    </textarea>
  )
}

export default TextArea
