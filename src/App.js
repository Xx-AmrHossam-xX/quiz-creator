import { useState } from 'react'
import { cloneDeep } from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import SaveForm from './components/SaveForm'
import QuizesList from './components/QuizesList/QuizesList'
import { emptyForm } from './constants'
import './App.css'

function App() {
  const [quizes, setQuizes] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [selectedQuiz, setSelectedQuiz] = useState(emptyForm)

  const toggleForm = (quiz = emptyForm) => {
    setIsSaving((prev) => !prev)
    setSelectedQuiz(quiz)
  }
  const saveQuiz = (quiz) => {
    quiz.modified = new Date().toISOString()
    if (!selectedQuiz?.id) {
      const quizWithIds = {
        ...quiz,
        id: uuidv4(),
        created: new Date().toISOString(),
        questions_answers: quiz.questions_answers.map((question) => {
          return {
            ...question,
            id: uuidv4(),
            answers: question.answers.map((answer) => {
              return {
                ...answer,
                id: uuidv4(),
              }
            }),
          }
        }),
      }
      setQuizes([...quizes, quizWithIds])
    } else {
      const clonedQuizes = cloneDeep(quizes)
      const modifiedQuizIndex = clonedQuizes.findIndex(
        ({ id }) => id === selectedQuiz.id,
      )
      clonedQuizes[modifiedQuizIndex] = quiz
      setQuizes(clonedQuizes)
    }
    toggleForm()
  }

  return (
    <div className="App">
      <h1>Quiz Creator/Editor</h1>
      {!isSaving && (
        <button
          className="btn btn-primary btn-lg mt-5"
          type="button"
          onClick={() => toggleForm()}
        >
          Create a quiz
        </button>
      )}
      {isSaving ? (
        <SaveForm selectedQuiz={selectedQuiz} saveQuiz={saveQuiz} />
      ) : (
        <QuizesList quizes={quizes} toggleForm={toggleForm} />
      )}
    </div>
  )
}

export default App
