import { useState } from 'react'
import { cloneDeep } from 'lodash'
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
  const saveQuiz = (quiz) => {
    if (!selectedQuiz?.id) {
      setQuizes([...quizes, quiz])
    } else {
      const clonedQuizes = cloneDeep(quizes)
      const modifiedQuizIndex = clonedQuizes.findIndex(
        ({ id }) => id === selectedQuiz.id,
      )
      clonedQuizes[modifiedQuizIndex] = quiz
      setQuizes(clonedQuizes)
    }
    setIsSaving((prev) => !prev)
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
        <SaveForm selectedQuiz={selectedQuiz} saveQuiz={saveQuiz} />
      ) : (
        <QuizesList quizes={QUIZES} toggleForm={toggleForm} />
      )}
    </div>
  )
}

export default App
