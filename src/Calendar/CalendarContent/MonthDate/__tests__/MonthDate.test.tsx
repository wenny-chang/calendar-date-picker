import { render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../../context";
import MonthDate from "../MonthDate";
import { CalendarContentView } from "../../../../utils/constant";

describe("MonthDate Component", () => {
  const renderMonthDate = () => {
    return render(
      <CalendarProvider
        value={{
          firstDayOfWeek: 0,
          date: null,
          activeDate: new Date(),
          onDateSelect: jest.fn(),
          setActiveDate: jest.fn(),
          formatDate: (date) => date.getDate().toString(),
          setDate: jest.fn(),
          currentContentView: CalendarContentView.DAY,
          setCurrentContentView: jest.fn(),
        }}
      >
        <MonthDate />
      </CalendarProvider>
    );
  };

  it("renders DaysOfWeek component", () => {
    renderMonthDate();
    const daysOfWeek = screen.getAllByTestId("days-of-week");
    expect(daysOfWeek).toHaveLength(7);
  });

  it("should render 6 weeks", () => {
    renderMonthDate();
    const weeks = screen.getAllByTestId("week");
    expect(weeks).toHaveLength(6);
  });

  it("should render 42 days", () => {
    renderMonthDate();
    const days = screen.getAllByTestId("day");
    expect(days).toHaveLength(42);
  });
});
