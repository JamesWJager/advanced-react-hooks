// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
// state like reducer
// const countReducer = (state, action) => ({
//   ...state,
//   ...(typeof action === 'function' ? action(state) : action),
// })

// redux like reducer
const countReducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.payload,
      }
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - action.payload,
      }

    default:
      return state
  }
}

const init = initialStateFromProps => {
  const valueInLocalStorage = window.localStorage.getItem('state')
  if (valueInLocalStorage) {
    return {
      ...JSON.parse(valueInLocalStorage)
    }
  }

  return {
    ...initialStateFromProps,
  }
}

function Counter({initialCount = 0, step = 1}) {
  const [state, dispatch] = React.useReducer(countReducer, { count: initialCount }, init)
  const {count} = state

  React.useEffect(() => {
    window.localStorage.setItem('state', JSON.stringify(state))
  }, [state])

  const increment = () =>
    dispatch({type: 'INCREMENT', payload: step})

    const decrement = () =>
    dispatch({type: 'DECREMENT', payload: step})

  return (<>
  <button onClick={increment}>{count}</button>
  <button onClick={decrement}>{count}</button>
  </>)
}

function App() {
  return <Counter />
}

export default App
