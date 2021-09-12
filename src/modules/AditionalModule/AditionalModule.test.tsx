import React from "react";
import { render } from "@testing-library/react";
import { AditionalModule } from "./AditionalModule";

test("renders learn react link", () => {
  const component = render(<AditionalModule />);
  expect(component).toBeDefined();
});
