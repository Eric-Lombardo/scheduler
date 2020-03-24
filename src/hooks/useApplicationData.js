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

    // const daysArr = state.days
    // daysArr[getDayIdFromAppointmentId(id)].spots -= 1
    // setState({...state, days: daysArr})


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

    // const dayArr = state.days
    // dayArr[getDayIdFromAppointmentId(id)].spots += 1
    // setState({...state, days: dayArr})

    return axios
      .delete(`/api/appointments/${id}`, {interview: null})
      .then(() => axios.get('/api/days'))
      .then(response => setState({...state, appointments, days: response.data}))

  }




  // function getDayIdFromAppointmentId(id) {
  //   if (id === 1 || id === 2 || id === 3 || id === 4 || id === 5) {return 0}
  //   if (id === 6 || id === 7 || id === 8 || id === 9 || id === 10) {return 1}
  //   if (id === 11 || id === 12 || id === 13 || id === 14 || id === 15) {return 2}
  //   if (id === 16 || id === 17 || id === 18 || id === 19 || id === 20) {return 3}
  //   if (id === 21 || id === 22 || id === 23 || id === 24 || id === 25) {return 4}
  // }

  

  return {state, setDay, bookInterview, cancelInterview}
}

export default useApplicationData