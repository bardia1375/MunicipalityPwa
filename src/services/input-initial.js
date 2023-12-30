export const INITIAL_VALUE = { value: "", isValid: false }
export const validate = _event => ({
  value: _event.target.value,
  isValid: _event.target.value.length > 0,
})
