import { render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../context";
import CalendarContent from "../CalendarContent";
import { CalendarContentView } from "../../../utils/constant";

describe("CalendarContent Component", () => {
  const mockDate = new Date(2024, 0, 1); // January 1, 2024
  const mockOnDateSelect = jest.fn();
  const mockSetActiveDate = jest.fn();
  const mockSetCurrentContentView = jest.fn();

  const renderCalendarContent = (contentView: CalendarContentView) => {
    return render(
      <CalendarProvider
        value={{
          date: null,
          activeDate: mockDate,
          onDateSelect: mockOnDateSelect,
          setActiveDate: mockSetActiveDate,
          formatDate: jest.fn(),
          setDate: jest.fn(),
          currentContentView: contentView,
          setCurrentContentView: mockSetCurrentContentView,
          firstDayOfWeek: 0,
        }}
      >
        <CalendarContent />
      </CalendarProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders MonthDate component when contentView is DAY", () => {
    renderCalendarContent(CalendarContentView.DAY);
    expect(screen.getByTestId("month-date")).toBeInTheDocument();
  });

  it("renders YearMonth component when contentView is MONTH", () => {
    renderCalendarContent(CalendarContentView.MONTH);
    expect(screen.getByTestId("year-month")).toBeInTheDocument();
  });

  it("renders Years component when contentView is YEAR", () => {
    renderCalendarContent(CalendarContentView.YEAR);
    expect(screen.getByTestId("years")).toBeInTheDocument();
  });
});
