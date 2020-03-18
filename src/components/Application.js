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
  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([])

  useEffect(() => {
    axios
      .get('/api/days')
      .then(response => setDays(response.data))
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
            days={days}
            day={day}
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
