import React from 'react'

import Header from './Header'
import Show from './Show'
import Empty from './Empty'
import Form from './Form'
import useVisualMode from '../../hooks/useVisualMode'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'

import "components/Appointment/styles.scss";

// constants for web flow
const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


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
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE))
  }
// =========================================================================
  function removeInterview() {
    transition(DELETING);
    props
    .cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(() => transition(ERROR_DELETE))
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {mode === CONFIRM && <Confirm 
        message="Delete appointment"
        onConfirm={removeInterview}
        onCancel={() => transition(SHOW)}
        />
      }
      {mode === EDIT && <Form 
        interviewers={props.interviewers} 
        onCancel={back}
        onSave={save}
        name={props.interview.student}
        interviewer={props.interview.interviewer.id}
        />
      }
      {mode === SAVING && <Status message="Saving"/>}
      {mode === ERROR_SAVE && <Error message="Could not save appointment"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === ERROR_DELETE && <Error message="Could not delete appointment"/>}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}/>}
      {mode === SHOW && <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
        />
      }
      {mode === CREATE && <Form 
        interviewers={props.interviewers} 
        onCancel={back}
        onSave={save}
        />
      }
    </article>
  )
}

export default Appointment

 
