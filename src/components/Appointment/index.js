import React from 'react'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import useVisualMode from '../../hooks/useVisualMode'
import Status from './Status'

import "components/Appointment/styles.scss";

// constants for web flow
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


function Appointment(props) {
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  // allow us to chnage the local state when we book an interview
  // passed down from APPLICATION, and from here its going to FORM
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === SAVING && <Status />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={back}
        onSave={save} // just added now
        />
      }
    </article>
  )
}

export default Appointment

 
