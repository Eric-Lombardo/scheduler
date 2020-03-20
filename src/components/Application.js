import React from "react";

import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index'
import useApplicationData from '../hooks/useApplicationData'
import { getAppointmentsForDay, getInterviewersForDay, getInterview } from '../helpers/selectors'

function Application(props) {
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  
  // create an array of Appointment components to render out
  const appointments = getAppointmentsForDay(state, state.day)
  const appointmentComponents = appointments.map(item => {
    const interview = getInterview(state, item.interview)
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
        {appointmentComponents}
      </section>
    </main>
  );
}

export default Application
