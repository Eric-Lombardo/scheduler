import React from "react";
import axios from "axios";

import { waitForElementToBeRemoved, render, cleanup, waitForElement, getByText, getAllByTestId, getByAltText, prettyDOM, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import { fireEvent } from "@testing-library/react/dist";

import Application from "components/Application";

afterEach(cleanup);

describe("Application Component", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    
    return waitForElement(() => getByText('Monday'))
      .then(() => {
        fireEvent.click(getByText('Tuesday'));
        expect(getByText('Leopold Silvers')).toBeInTheDocument();
      });
  });
  
  it("loads data, books an interview and reduces the spots remaining for Monday by 1", async() => {
    const { container } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const targetFirstAppointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(targetFirstAppointment, "Add"));
    fireEvent.change(getByPlaceholderText(targetFirstAppointment, "Enter Student Name"), {target: {value: "Lydia Miller-Jones"}});
    fireEvent.click(getByAltText(targetFirstAppointment, "Sylvia Palmer"));
    fireEvent.click(getByText(targetFirstAppointment, "Save"));

    expect(getByText(targetFirstAppointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(targetFirstAppointment, "Lydia Miller-Jones"));
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
  
    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
  
    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Delete appointment")
    ).toBeInTheDocument();
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async() => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "edit" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(queryByAltText(appointment, "Edit"));
  
    // 4. target input with placeholder "enter name" and change name
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {target: {value: "Eric"}});

    // 7. fireevent to click on save
    fireEvent.click(getByText(appointment, "Save"));

    // 8. check if the name and interviwer chosen is in the dom
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Eric"));
  });

  it("shows the delete error when failing to delete an appointment", async() => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "Delete appointment")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    
    expect(getByText(appointment, "Could not delete appointment")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async() => {
    axios.put.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment, "Enter Student Name"), {target: { value: "Lydia Miller-Jones" }});
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));

    expect(getByText(appointment, "Could not save appointment")).toBeInTheDocument();
    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(container, "Archie Cohen")).toBeInTheDocument();
  });
});


