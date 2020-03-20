export function getAppointmentsForDay(state, day) {
  let appointmentIdArr = []
  let outputArr = []

  // target specific day
  for (const item of state.days) {
    if (item.name === day) {
      appointmentIdArr = item.appointments;
    }
  }

  // loop over appointmentIdArr comparing where 
  // it's id matches the id of states.appointments 
  for (const key in state.appointments) {
    if (appointmentIdArr.indexOf(state.appointments[key].id) !== -1)
    outputArr.push(state.appointments[key])
  }
  return outputArr
}

// ======================================================================
export function getInterviewersForDay(state, day) {
  let interviewerList = []
  let outputArr = []

  // target specific day
  for (const item of state.days) {
    if (item.name === day) {
      interviewerList = item.interviewers;
    }
  }

  // fetching interviewers info by using the id's in interviewerList
  for (let item of interviewerList) {
    if(state.interviewers[item]) {
      outputArr.push(state.interviewers[item])
    }
  }
  return outputArr
}
// ======================================================================

export function getInterview(state, interview) {
  if (interview === null) {return null}

  let interviewerId = interview.interviewer
  let interviewerInfo = state.interviewers[interviewerId]

  return ({
    student: interview.student,
    interviewer: interviewerInfo
  })
}
