import React from 'react'
import classNames from 'classnames'

import 'components/InterviewerListItem.scss'

// === THE PROPS IT TAKES ==========================
// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// selected:boolean - to determine if an interview is selected or not
// setInterviewer:function - sets the interviewer upon selection

function InterviewerListItem(props) {

  // CSS style classes
  const interviewerClass = classNames({
    'interviewers__item': true,
    'interviewers__item--selected': props.selected
  })

  return (
    <li 
      key={props.id} 
      className={interviewerClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  )
}

export default InterviewerListItem