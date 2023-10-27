import { v4 as uuidv4 } from 'uuid'
import { useMemo } from 'react'

const TextInput = ({ name, value, onChange, label }) => {
  const identifier = useMemo(() => uuidv4(), [])

  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={identifier}>
        {label}
      </label>
      <input
        required
        type="text"
        className="form-control"
        name={name}
        id={identifier}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
export default TextInput
