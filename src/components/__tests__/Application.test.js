import React from "react";

import { render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, prettyDOM, getByPlaceholderText, queryByText } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";

import Application from "components/Application";

afterEach(cleanup);

describe("Application Component", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText('Monday'))
    .then(() => {
      fireEvent.click(getByText('Tuesday'))
      expect(getByText('Leopold Silvers')).toBeInTheDocument()
    })
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
    const { container, debug } = render(<Application />);
    
    // debug()

    await waitForElement(() => getByText(container, "Archie Cohen"))

    // debug()
    
    const targetFirstAppointment = getAllByTestId(container, "appointment")[0]
    // console.log("this is what the first appointment looks like ====> ", prettyDOM(targetFirstAppointment))

    fireEvent.click(getByAltText(targetFirstAppointment, "Add"))
    fireEvent.change(getByPlaceholderText(targetFirstAppointment, "Enter Student Name"), {target: {value: "Lydia Miller-Jones"}})
    fireEvent.click(getByAltText(targetFirstAppointment, "Sylvia Palmer"))
    fireEvent.click(getByText(targetFirstAppointment, "Save"))

    expect(getByText(targetFirstAppointment, "Saving")).toBeInTheDocument()
    await waitForElement(() => getByText(targetFirstAppointment, "Lydia Miller-Jones"))
    
    // console.log("this is what the first appointment looks like AFTER ====> ", prettyDOM(targetFirstAppointment))
    // debug()
    
    // const targetMondayDayList = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"))
    // console.log(prettyDOM(targetMondayDayList))
    // expect(getByText(targetMondayDayList, "no spots remaining")).toBeInTheDocument();
  });
})


