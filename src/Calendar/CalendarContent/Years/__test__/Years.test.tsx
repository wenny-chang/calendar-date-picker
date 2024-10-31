import { render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../../context";
import Years from "../Years";
import { CalendarContentView } from "../../../../utils/constant";

describe("Years Component", () => {
  const mockDate = new Date(2024, 0, 1); // January 1, 2024
  const mockOnDateSelect = jest.fn();
  const mockSetActiveDate = jest.fn();
  const mockSetCurrentContentView = jest.fn();

  const renderYears = (activeDate: Date = mockDate) => {
    return render(
      <CalendarProvider
        value={{
          date: null,
          activeDate,
          onDateSelect: mockOnDateSelect,
          setActiveDate: mockSetActiveDate,
          formatDate: jest.fn(),
          setDate: jest.fn(),
          currentContentView: CalendarContentView.YEAR,
          setCurrentContentView: mockSetCurrentContentView,
          firstDayOfWeek: 0,
        }}
      >
        <Years />
      </CalendarProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all years in the decade correctly", () => {
    renderYears();
    // For 2024, the decade range should be 2019-2030
    // Including one year before and after the decade (2019 and 2030)
    const years = [
      2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    ];
    const yearElements = screen.getAllByTestId("year");
    yearElements.forEach((year, index) => {
      expect(year).toHaveTextContent(years[index].toString());
    });
  });

  it("renders correct number of years", () => {
    renderYears();
    const yearElements = screen.getAllByTestId("year");
    expect(yearElements).toHaveLength(12); // 12 years including before/after decade
  });
});
