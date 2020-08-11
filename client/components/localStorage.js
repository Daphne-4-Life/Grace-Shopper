// function that loads the state from localStorage. loadState will look at browser's localStorage and if there is a serialized string of the state, it will parse as JSON
// loads the state from localStorage
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
// state is serialized into a string using JSON.stringify. Serialized state is a general recommendation in Redux.
// saves the state to localStorage
export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('state', serializedState)
  } catch {
    //
  }
}

// This will be exported to the index.js of the Store folder
