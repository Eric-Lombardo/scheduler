import { useState } from 'react'

function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode) // string
  const [history, setHistory] = useState([initialMode]); // array

  function transition(newMode, replaceBool) {
    setMode(newMode)
    // replaceBool ? setHistory(prev => [...prev, initialMode]) : history.push(newMode)

    if (replaceBool) {
      let copyOfHistory = [...history]
      copyOfHistory[copyOfHistory.length - 1] = newMode
      setHistory(copyOfHistory)
    } else {
      setHistory(history.concat(newMode))
    }
  }
  
  function back() {
    // if (history.length >= 2) {
    //     history.pop()
    //     setMode(history[history.length - 1])
    //   } else {
    //       setMode(history[0])
    //     }
        
    if (history.length <= 2 ) {
      setMode(history[0])
    } else {
      const updatedHistorylist = [...history]
      updatedHistorylist.pop()
      setHistory(updatedHistorylist)
      setMode(history[history.length - 2])
    }
  }

  return {mode, transition, back}
}

export default useVisualMode