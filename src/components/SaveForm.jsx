const SaveForm = ({ selectedQuiz }) => {
  return <div>{selectedQuiz?.title ?? 'CREATE'}</div>
}

export default SaveForm
