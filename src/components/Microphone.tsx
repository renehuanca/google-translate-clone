import React from 'react'
import { MicrophoneIcon } from './Icons'

interface Props {
  onVoice: (transcript: string) => void
}

const Microphone: React.FC<Props> = ({ onVoice }) => {
  const handleVoiceInput = () => {
    const recognition = new window.webkitSpeechRecognition()

    recognition.lang = 'es-ES'

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript

      onVoice(transcript)
    }

    recognition.start()
  }

  return (
    <button onClick={handleVoiceInput}>
      <MicrophoneIcon />
    </button>
  )
}

export default Microphone
