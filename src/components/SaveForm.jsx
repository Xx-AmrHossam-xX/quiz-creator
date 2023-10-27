import { useState } from 'react'
import { cloneDeep } from 'lodash'
import { emptyQuestions_answers, emptyAnswer } from '../constants'

const SaveForm = ({ selectedQuiz, saveQuiz }) => {
  const [data, setData] = useState(selectedQuiz)
  const updateData = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    })
  }

  const updateQuestionsAnswers = (key, name, value) => {
    const clonedQuestions_answers = cloneDeep(data.questions_answers)
    clonedQuestions_answers[key][name] = value
    setData({
      ...data,
      questions_answers: clonedQuestions_answers,
    })
  }
  const addQuestionsAnswers = () => {
    setData({
      ...data,
      questions_answers: [
        ...data.questions_answers,
        cloneDeep(emptyQuestions_answers),
      ],
    })
  }
  const removeQuestionsAnswers = (key) => {
    const clonedQuestions_answers = cloneDeep(data.questions_answers)
    clonedQuestions_answers.splice(key)
    setData({
      ...data,
      questions_answers: clonedQuestions_answers,
    })
  }
  const updateAnswers = (key, answerKey, name, value) => {
    const clonedQuestions_answers = cloneDeep(data.questions_answers)
    if (name !== 'is_true') {
      clonedQuestions_answers[key].answers[answerKey][name] = value
    } else {
      clonedQuestions_answers[key].answers = clonedQuestions_answers[
        key
      ].answers.map((answer, index) => {
        return { ...answer, is_true: index === answerKey }
      })
    }

    setData({
      ...data,
      questions_answers: clonedQuestions_answers,
    })
  }
  const addAnswer = (key) => {
    const clonedData = cloneDeep(data)
    clonedData.questions_answers[key].answers.push(emptyAnswer)
    setData(clonedData)
  }
  const removeAnswer = (key, answerKey) => {
    const clonedQuestions_answers = cloneDeep(data.questions_answers)
    clonedQuestions_answers[key].answers.splice(answerKey, 1)
    setData({
      ...data,
      questions_answers: clonedQuestions_answers,
    })
  }
  const submit = (event) => {
    event.preventDefault()
    saveQuiz(data)
    return false
  }
  return (
    <form className="row g-3" onSubmit={(event) => submit(event)}>
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          title
        </label>
        <input
          required
          type="text"
          className="form-control"
          name="title"
          id="title"
          placeholder="title"
          value={data.title}
          onChange={updateData}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">description</label>
        <textarea
          required
          className="form-control"
          name="description"
          rows="3"
          value={data.description}
          onChange={updateData}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">url</label>
        <input
          required
          type="url"
          inputMode="url"
          className="form-control"
          name="url"
          placeholder="url"
          value={data.url}
          onChange={updateData}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">score</label>
        <input
          required
          type="number"
          className="form-control"
          name="score"
          placeholder="score"
          value={data.score || ''}
          onChange={updateData}
        />
      </div>

      <h3>Questions</h3>

      {data.questions_answers.map((questions_answer, key) => {
        return (
          <div className="questions" key={`questions_${key}`}>
            <h4>{`Question ${key + 1}`}</h4>
            <div className="mb-3">
              <label className="form-label">false feedback</label>
              <input
                required
                type="text"
                className="form-control"
                name="feedback_false"
                placeholder="false feedback"
                value={questions_answer.feedback_false}
                onChange={(e) =>
                  updateQuestionsAnswers(key, 'feedback_false', e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">true feedback</label>
              <input
                required
                type="text"
                className="form-control"
                name="feedback_true"
                placeholder="true feedback"
                value={questions_answer.feedback_true}
                onChange={(e) =>
                  updateQuestionsAnswers(key, 'feedback_true', e.target.value)
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">text</label>
              <input
                required
                type="text"
                className="form-control"
                name="text"
                placeholder="text"
                value={questions_answer.text}
                onChange={(e) =>
                  updateQuestionsAnswers(key, 'text', e.target.value)
                }
              />
            </div>
            {questions_answer.answers.map((answer, answerKey) => {
              return (
                <div className="answer" key={`answer-${answerKey}`}>
                  <h5>{`Answer ${answerKey + 1}`}</h5>
                  <div className="mb-3">
                    <label className="form-label">text</label>
                    <input
                      required
                      type="text"
                      className="form-control"
                      name="text"
                      placeholder="text"
                      value={answer.text}
                      onChange={(e) =>
                        updateAnswers(key, answerKey, 'text', e.target.value)
                      }
                    />
                  </div>
                  <input
                    required
                    className="form-check-input"
                    type="radio"
                    name={`is_true_${key}`}
                    id={`is_true_${key}_${answerKey}`}
                    checked={answer.is_true}
                    onChange={(e) => updateAnswers(key, answerKey, 'is_true')}
                  />
                  <label
                    className="form-check-label ms-2 mb-3"
                    htmlFor={`is_true_${key}_${answerKey}`}
                  >
                    is the correct answer
                  </label>
                  {questions_answer.answers.length > 2 && (
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => removeAnswer(key, answerKey)}
                      >
                        remove answer
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
            <button
              className="btn btn-primary btn-md mt-2 mb-2"
              type="button"
              onClick={() => addAnswer(key)}
            >
              Add an answer
            </button>
            {data.questions_answers.length > 2 && (
              <button
                type="button"
                className="btn btn-danger ms-3"
                onClick={() => removeQuestionsAnswers(key)}
              >
                remove question
              </button>
            )}
          </div>
        )
      })}
      <button
        className="btn btn-primary btn-md mt-2 mb-2"
        type="button"
        onClick={() => addQuestionsAnswers()}
      >
        Add a question
      </button>
      <div className="mb-3 d-flex justify-content center">
        <button type="submit" className="btn btn-success btn-lg mb-3">
          Save
        </button>
      </div>
    </form>
  )
}

export default SaveForm
