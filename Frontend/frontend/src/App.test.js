import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders dashboard heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/professional weather dashboard/i);
  expect(headingElement).toBeInTheDocument();
});
