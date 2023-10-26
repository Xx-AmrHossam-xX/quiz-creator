import { useState } from 'react'
import SaveForm from './components/SaveForm'
import QuizesList from './components/QuizesList'
import './App.css'

function App() {
  const [quizes, setQuizes] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  return (
    <div className="App">
      <h1>Quiz Creator/Editor</h1>
      {!isSaving && (
        <button
          class="btn btn-primary btn-lg mt-5"
          type="button"
          onClick={() => setIsSaving(true)}
        >
          Create a quiz
        </button>
      )}
      {isSaving ? <SaveForm /> : <QuizesList />}
    </div>
  )
}

export default App
