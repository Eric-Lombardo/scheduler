import React from 'react'

// takes in these props
// time:String eg. "12pm"

function Header(props) {
  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  )
}

export default Header