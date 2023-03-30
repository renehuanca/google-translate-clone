import { useStore } from './hooks/useStore'

function App () {
  const { fromLanguage, setFromLanguage } = useStore()

  return (
    <div className="App">
      <h1>Google translate clone</h1>
      <button onClick={() => {
        setFromLanguage('es')
      }}>Cambiar loading</button>
      {fromLanguage}
    </div>
  )
}

export default App
