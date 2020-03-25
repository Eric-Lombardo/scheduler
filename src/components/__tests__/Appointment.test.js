import React from "react";
import { render, cleanup } from "@testing-library/react";
import Appointment from "../Appointment/index";

afterEach(cleanup);

// THIS TEST IS NOT NEEDED BUT JEST WILL COMPLAIN IF THERE ISN'T AT LEAST 1 TEST
describe('Appointment component', () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});
