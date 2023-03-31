import { ClipboardIcon } from './Icons'

interface Props {
  result: string
}
const Clipboard = ({ result }: Props) => {
  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }
  return (
    <button
      className='p-2'
      onClick={handleClipboard}
    >
      <ClipboardIcon />
    </button>
  )
}

export default Clipboard
