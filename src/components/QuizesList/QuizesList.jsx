import './QuizesList.css'

const QuizesList = ({ quizes, toggleForm }) => {
  return (
    <div class="list-group m-3">
      {quizes.map((quiz) => {
        return (
          <button
            type="button"
            key={quiz.id}
            class="list-group-item list-group-item-action quiz-item"
            onClick={() => toggleForm(quiz)}
          >
            {quiz.title}
          </button>
        )
      })}
    </div>
  )
}

export default QuizesList
