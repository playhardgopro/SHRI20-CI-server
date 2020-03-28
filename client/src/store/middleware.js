export const storeLogger = (store) => (next) => (action) => {
  console.log('dispatching action', action)
  const result = next(action)
  console.log('next state', store.getState())
  return result
}

export const thunk = (store) => (next) => (action) => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState)
  }
  return next(action)
}
