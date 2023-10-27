import { cloneDeep } from 'lodash'

export const emptyAnswer = {
  is_true: false,
  text: '',
}
export const emptyQuestions_answers = {
  answers: [{ ...emptyAnswer }, { ...emptyAnswer }],
  feedback_false: '',
  feedback_true: '',
  text: '',
}
export const emptyForm = {
  description: '',
  score: null,
  title: '',
  url: '',
  questions_answers: [
    cloneDeep(emptyQuestions_answers),
    cloneDeep(emptyQuestions_answers),
  ],
}
