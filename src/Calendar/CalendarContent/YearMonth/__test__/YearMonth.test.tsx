import { render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../../context";
import YearMonth from "../YearMonth";
import { CalendarContentView } from "../../../../utils/constant";

describe("YearMonth Component", () => {
  const mockDate = new Date(2024, 0, 1); // January 1, 2024

  const renderYearMonth = () => {
    return render(
      <CalendarProvider
        value={{
          firstDayOfWeek: 0,
          date: null,
          activeDate: mockDate,
          onDateSelect: jest.fn(),
          setActiveDate: jest.fn(),
          formatDate: (date, format) =>
            format === "MMM"
              ? date.toLocaleString("default", { month: "short" })
              : date.getMonth().toString(),
          setDate: jest.fn(),
          currentContentView: CalendarContentView.MONTH,
          setCurrentContentView: jest.fn(),
        }}
      >
        <YearMonth />
      </CalendarProvider>
    );
  };

  it("renders all 12 months", () => {
    renderYearMonth();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    months.forEach((month) => {
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });
});
