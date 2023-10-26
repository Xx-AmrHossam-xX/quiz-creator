import './QuizesList.css'

const QuizesList = ({ quizes, toggleForm }) => {
  return (
    <div className="list-group m-3">
      {quizes.map((quiz) => {
        const { title, description, score, url } = quiz
        return (
          <div class="quiz-card card mb-3">
            <div class="card-body">
              <h5 class="card-title"> {title}</h5>
              <p class="card-text">{`score : ${score}`}</p>
              <p class="card-text">{description}</p>
              <a href={url} target="_blank" class="card-link" rel="noreferrer">
                Url
              </a>
              <button
                type="button"
                key={quiz.id}
                className="list-group-item list-group-item-action quiz-item"
                onClick={() => toggleForm(quiz)}
              >
                Update
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QuizesList
