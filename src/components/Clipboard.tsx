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
      className='p-4 rounded-full hover:bg-gray-200'
      onClick={handleClipboard}
    >
      <ClipboardIcon />
    </button>
  )
}

export default Clipboard
