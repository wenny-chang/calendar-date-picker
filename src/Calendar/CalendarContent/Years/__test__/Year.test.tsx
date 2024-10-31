import { render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../../context";
import Year from "../Year";
import { CalendarContentView } from "../../../../utils/constant";
import userEvent from "@testing-library/user-event";

describe("Year Component", () => {
  const mockDate = new Date(2024, 0, 1); // January 1, 2024
  const mockOnDateSelect = jest.fn();
  const mockSetActiveDate = jest.fn();
  const mockSetCurrentContentView = jest.fn();

  const renderYear = (
    year: number = 2024,
    selectedDate: Date | null = mockDate,
    activeDate: Date = mockDate
  ) => {
    return render(
      <CalendarProvider
        value={{
          date: selectedDate,
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
        <Year year={year} />
      </CalendarProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders year correctly", () => {
    renderYear();
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("handles click event correctly", async () => {
    renderYear();
    const user = userEvent.setup();

    await user.click(screen.getByText("2024"));

    expect(mockOnDateSelect).toHaveBeenCalledWith({
      day: 1,
      month: 0,
      year: 2024,
    });
    expect(mockSetActiveDate).toHaveBeenCalledWith(new Date(2024, 0, 1));
    expect(mockSetCurrentContentView).toHaveBeenCalledWith(
      CalendarContentView.MONTH
    );
  });

  it("applies selected styles when year is selected", () => {
    renderYear();
    const yearElement = screen.getByText("2024");
    expect(yearElement).toHaveStyle({
      backgroundColor: "#db3d44",
      color: "white",
    });
  });

  it("applies current year styles when year is current year", () => {
    const currentYear = new Date().getFullYear();
    renderYear(currentYear, null, new Date());
    const yearElement = screen.getByText(currentYear.toString());
    expect(yearElement).toHaveStyle({ color: "#db3d44" });
  });

  it("applies different decade styles when year is from different decade", () => {
    renderYear(2035); // Outside the decade of 2024
    const yearElement = screen.getByText("2035");
    expect(yearElement).toHaveStyle({ color: "#eeeeee" });
  });
});
