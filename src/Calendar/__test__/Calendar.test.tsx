import { render, screen, fireEvent } from "@testing-library/react";
import Calendar from "../Calendar";

describe("Calendar Component", () => {
  const mockDate = new Date(2024, 0, 1); // January 1, 2024
  const mockOnDateSelect = jest.fn();
  const renderCalendar = () => {
    return render(<Calendar date={mockDate} onDateSelect={mockOnDateSelect} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders calendar with default props", () => {
    renderCalendar();
    expect(screen.getByText("January 2024")).toBeInTheDocument();
  });

  it("renders calendar with provided date", () => {
    renderCalendar();
    expect(screen.getByText("January 2024")).toBeInTheDocument();
  });

  it("handles date selection", () => {
    renderCalendar();
    const dayComponents = screen.getAllByTestId("day");
    fireEvent.click(dayComponents[2]);
    expect(mockOnDateSelect).toHaveBeenCalled();
  });

  it("handles first day of week prop", () => {
    renderCalendar();
    const weekdays = screen.getAllByTestId("days-of-week");
    expect(weekdays[0]).toHaveTextContent("Sun");
  });

  it("changes view when clicking on month-year header", () => {
    renderCalendar();
    const monthYearHeader = screen.getByText("January 2024");
    fireEvent.click(monthYearHeader);
    expect(screen.getByTestId("year-month")).toBeInTheDocument();
  });

  it("changes view when clicking on year header", () => {
    renderCalendar();
    const monthYearHeader = screen.getByText("January 2024");
    fireEvent.click(monthYearHeader);
    const yearHeader = screen.getByText("2024");
    fireEvent.click(yearHeader);
    expect(screen.getByTestId("years")).toBeInTheDocument();
  });

  it("navigates to previous month", () => {
    renderCalendar();
    const prevButton = screen.getByTestId("prev-button");
    fireEvent.click(prevButton);
    expect(screen.getByText("December 2023")).toBeInTheDocument();
  });

  it("navigates to next month", () => {
    renderCalendar();
    const nextButton = screen.getByTestId("next-button");
    fireEvent.click(nextButton);
    expect(screen.getByText("February 2024")).toBeInTheDocument();
  });
});
