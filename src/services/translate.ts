import { type FromLanguage, type Language } from '../types'

interface Translate {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}

export async function translate ({ fromLanguage, toLanguage, text }: Translate) {
  if (fromLanguage === toLanguage) return text
  if (fromLanguage === 'auto') fromLanguage = 'es'
  const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${fromLanguage}|${toLanguage}`)
  const data = await response.json()

  return data.responseData.translatedText
}
