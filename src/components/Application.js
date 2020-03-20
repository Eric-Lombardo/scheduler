import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index'
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors'

function Application(props) {

  // state logic
  const [state, setState] = useState({
    day: "Tuesday",
    days: [],
    appointments: {},
    interviewers: {}
  })
  const setDay = day => setState({...state, day})
  
  // api request to fetch data
  useEffect(() => {
    const daysAPI = axios.get('/api/days')
    const appointmentsAPI = axios.get('/api/appointments')
    const interviewersAPI = axios.get('/api/interviewers')
    Promise
    .all([daysAPI, appointmentsAPI, interviewersAPI])
    .then(all => setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data})))
    // .then(all => console.log(all[1]))
  }, [])

  // allow us to chnage the local state when we book an interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios
      .put(`/api/appointments/${id}`, {interview: interview})
      .then(() => setState({...state, appointments}))
  }
// =======================================================
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios
      .delete(`/api/appointments/${id}`, {interview: null})
      .then(() => setState({...state, appointments}))
  }
  
  // create an array of Appointment components to render out
  const appointments = getAppointmentsForDay(state, state.day)
  const appointmentComponents = appointments.map(item => {
    const interview = getInterview(state, item.interview) // this was here before
    return (
      <Appointment 
        key={item.id}
        id={item.id}
        time={item.time}
        interview={interview}
        interviewers={getInterviewersForDay(state, state.day)}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    )
  })
  appointmentComponents.push(<Appointment key="last" item="5pm"/>)

  return (
    <main className="layout">
      <section className="sidebar">
        
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />

        <nav className="sidebar__menu">
          <DayList 
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />

      </section>
      <section className="schedule">
        {/* {console.log(state.interviewers)} */}
        {appointmentComponents}
      </section>
    </main>
  );
}

export default Application
