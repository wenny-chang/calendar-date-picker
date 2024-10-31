import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DatePicker from "../DatePicker";

describe("DatePicker", () => {
  it("renders input field with calendar icon", () => {
    render(<DatePicker />);
    expect(screen.getByPlaceholderText("YYYY-MM-DD")).toBeInTheDocument();
    expect(screen.getByTestId("CalendarMonthIcon")).toBeInTheDocument();
  });

  it("shows calendar on input focus", () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText("YYYY-MM-DD");
    fireEvent.focus(input);
    expect(screen.getByTestId("prev-button")).toBeInTheDocument();
  });

  it("hides calendar when clicking outside", () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText("YYYY-MM-DD");

    // Show calendar
    fireEvent.focus(input);
    expect(screen.getByTestId("prev-button")).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId("calendar")).not.toBeInTheDocument();
  });

  it("validates date input format", async () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText("YYYY-MM-DD");

    // Invalid format
    await userEvent.type(input, "2023-13-45");
    expect(screen.getByText("Invalid format")).toBeInTheDocument();

    // Clear and enter valid format
    await userEvent.clear(input);
    await userEvent.type(input, "2023-12-25");
    expect(screen.queryByText("Invalid format")).not.toBeInTheDocument();
  });

  it("updates input value when date is selected from calendar", () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText("YYYY-MM-DD");

    // Open calendar
    fireEvent.focus(input);

    // Click on a date (assuming today's date is visible)
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

    // Find and click today's date button
    const dateButton = screen.getByText(String(today.getDate()));
    fireEvent.click(dateButton);

    expect(input).toHaveValue(formattedDate);
  });

  it("handles Enter key press", async () => {
    render(<DatePicker />);
    const input = screen.getByPlaceholderText("YYYY-MM-DD");

    // Enter valid date
    await userEvent.type(input, "2023-12-25");
    fireEvent.keyDown(input, { key: "Enter" });

    expect(input).toHaveValue("2023-12-25");
    expect(screen.queryByTestId("calendar")).not.toBeInTheDocument();
  });

  describe("error state", () => {
    it("should be error when date is invalid", async () => {
      render(<DatePicker />);
      const input = screen.getByPlaceholderText("YYYY-MM-DD");
      await userEvent.type(input, "2023-13-45");
      expect(screen.getByText("Invalid format")).toBeInTheDocument();
    });

    it("should be error when date is invalid", async () => {
      render(<DatePicker />);
      const input = screen.getByPlaceholderText("YYYY-MM-DD");
      await userEvent.type(input, "2023-1");
      expect(screen.getByText("Invalid format")).toBeInTheDocument();
    });

    it("should be pass when date of month and day is one number", async () => {
      render(<DatePicker />);
      const input = screen.getByPlaceholderText("YYYY-MM-DD");
      await userEvent.type(input, "2023-1-1");
      expect(screen.queryByText("Invalid format")).not.toBeInTheDocument();
    });
  });
});
