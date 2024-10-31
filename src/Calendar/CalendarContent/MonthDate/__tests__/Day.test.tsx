import { render, screen, fireEvent } from "@testing-library/react";
import { CalendarProvider } from "../../../context";
import Day from "../Day";
import { CalendarContentView } from "../../../../utils/constant";

describe("Day Component", () => {
  const mockTestDate = new Date(2024, 0, 15); // January 15, 2024
  const mockOnDateSelect = jest.fn();
  const mockSetActiveDate = jest.fn();

  const renderDay = (
    date: Date = mockTestDate,
    selectedDate: Date | null = mockTestDate,
    activeDate: Date = mockTestDate
  ) => {
    return render(
      <CalendarProvider
        value={{
          date: selectedDate,
          activeDate,
          onDateSelect: mockOnDateSelect,
          setActiveDate: mockSetActiveDate,
          formatDate: (date) => date.getDate().toString(),
          setDate: jest.fn(),
          currentContentView: CalendarContentView.DAY,
          setCurrentContentView: jest.fn(),
          firstDayOfWeek: 0,
        }}
      >
        <Day date={date} />
      </CalendarProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the day number correctly", () => {
    renderDay(mockTestDate);
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  it("calls onDateSelect and setActiveDate when clicked", () => {
    renderDay(mockTestDate);
    fireEvent.click(screen.getByText("15"));

    expect(mockOnDateSelect).toHaveBeenCalledWith({
      day: 15,
      month: 0,
      year: 2024,
    });
    expect(mockSetActiveDate).toHaveBeenCalledWith(mockTestDate);
  });

  it("applies selected styles when date is selected", () => {
    renderDay(mockTestDate);
    const dayElement = screen.getByText("15");
    expect(dayElement).toHaveStyle({
      backgroundColor: "#db3d44",
      color: "white",
    });
  });

  it("applies today styles", () => {
    renderDay(new Date(), null, new Date());
    const dayElement = screen.getByTestId("day");
    expect(dayElement).toHaveStyle({ color: "#db3d44" });
  });

  it("applies different month styles when date is from different month", () => {
    const differentMonthDate = new Date(2024, 1, 15); // February 15, 2024
    renderDay(differentMonthDate);
    const dayElement = screen.getByText("15");
    expect(dayElement).toHaveStyle({ color: "#eeeeee" });
  });
});
