import React, { useState, useEffect } from "react";
import axios from 'axios'

import "components/Application.scss";
import DayList from 'components/DayList'
import Appointment from 'components/Appointment/index'

// mock data appointments
const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Person A",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm"
  },
  {
    id: 4,
    time: "3pm",
    interview: {
      student: "Person B",
      interviewer: {
        id: 1,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      }
    }
  },
  {
    id: 5,
    time: "4pm"
  }
];

function Application(props) {

  // state logic
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })
  const setDay = day => setState({...state, day})

  useEffect(() => {
    const daysAPI = axios.get('/api/days')
    const appointmentsAPI = axios.get('/api/appointments')
    Promise
      .all([daysAPI, appointmentsAPI])
      .then(all => setState(prev => ({...prev, days: all[0].data, appointments: all[1].data})))
  }, [])

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
        {appointments.map(item => <Appointment 
            key={item.id}
            {...item}
          />
        )}
      </section>
    </main>
  );
}

export default Application
