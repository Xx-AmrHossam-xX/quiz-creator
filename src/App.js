import { useState } from 'react'
import SaveForm from './components/SaveForm'
import QuizesList from './components/QuizesList/QuizesList'
import { QUIZES } from './dummyData'
import './App.css'

function App() {
  const [quizes, setQuizes] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState({})

  const toggleForm = (quiz = {}) => {
    setIsSaving((prev) => !prev)
    setSelectedQuiz(quiz)
  }

  return (
    <div className="App">
      <h1>Quiz Creator/Editor</h1>
      {!isSaving && (
        <button
          class="btn btn-primary btn-lg mt-5"
          type="button"
          onClick={() => toggleForm()}
        >
          Create a quiz
        </button>
      )}
      {isSaving ? (
        <SaveForm selectedQuiz={selectedQuiz} />
      ) : (
        <QuizesList quizes={QUIZES} toggleForm={toggleForm} />
      )}
    </div>
  )
}

export default App
