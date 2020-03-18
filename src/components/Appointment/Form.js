import React, { useState } from 'react'


// The Form component should track the following state:
// - name:String
// - interviewer:Number

// The Form component should have the following actions:
// - setName:Function
// - setInterviewer:Function

// The Form component should take the following props:
// - name:String
// - interviewers:Array
// - interviewer:Number
// - onSave:Function
// - onCancel:Function

import Button from '../Button'
import InterviewerList from '../InterviewerList'

function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("")
    setInterviewer(null)
  }

  function cancel() {
    reset()
    props.onCancel()
  }

  function save() {
    props.onSave(name, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={event => {
              setName(event.target.value)
            }}
          />
        </form>
        <InterviewerList 
          interviewers={props.interviewers} 
          value={interviewer}  
          onChange={interviewerId => {
            setInterviewer(interviewerId)
          }} 
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={save} confirm>Save</Button>
        </section>
      </section>
    </main>
  )
}

export default Form