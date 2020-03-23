import React from 'react'
import PropTypes from 'prop-types'

import InterviewerListItem from './InterviewerListItem'

import 'components/InterviewerList.scss'

// the props it takes
// interviewers:array - an array of objects containing the information of each interviewer
// value:number - the id of an interviewer
// onChange:function - a function that accepts an interviewer id

function InterviewerList(props) {

    InterviewerList.propTypes = {
      value: PropTypes.number,
      onChange: PropTypes.func.isRequired
    }

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(item => <InterviewerListItem 
          key={item.id}
          name={item.name}
          avatar={item.avatar}
          selected={item.id === props.value ? true : false}
          setInterviewer={() => props.onChange(item.id)}
          />
        )}
      </ul>
    </section>
  )
}

export default InterviewerList