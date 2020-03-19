import React, { useState } from 'react'

function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode) // string
  const [history, setHistory] = useState([initialMode]); // array

  function transition(newMode, replaceBool) {
    setMode(newMode)
    replaceBool ? setHistory([initialMode]) : history.push(newMode)
  }

  function back() {
    if (history.length >= 2) {
      history.pop()
      setMode(history[history.length - 1])
    } else {
      setMode(history[0])
    }
  }

  return {mode, transition, back}
}

export default useVisualMode