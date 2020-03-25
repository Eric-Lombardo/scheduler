import { useState, useEffect } from 'react'
import axios from 'axios'


function useApplicationData() {
  // state logic
  const [state, setState] = useState({
    day: "Monday",
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
  }, [])    

  // allow us to change the local state when we book an interview
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
      .then(() => axios.get('/api/days'))
      .then(response => {
        setState({...state, appointments, days: response.data})
      });
  }

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
      .then(() => axios.get('/api/days'))
      .then(response => setState({...state, appointments, days: response.data}))

  }

  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData