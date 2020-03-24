import React from 'react'
import classNames from 'classnames'

import "components/DayListItem.scss";

// 4 props it takes
// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

function DayListItem(props) {
  const dayClass = classNames({
    'day-list__item': true,
    'day-list__item--selected': props.selected,
    'day-list__item--full': !props.spots
  })

  function formatSpots(spots) {
    if (spots === 0) {
      return "no spots remaining"
    } else if (spots === 1) {
      return "1 spot remaining"
    } else {
      return `${spots} spots remaining`
    }
  }

  return (
    <li
      data-testid="day" 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
  </li>
  )
}

export default DayListItem