import { fireEvent, render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../context";
import YearMonthPicker from "../YearMonthPicker";
import { CalendarContentView } from "../../../utils/constant";

describe("YearMonthPicker Component", () => {
  const mockDate = new Date(2024, 0, 1); // January 1, 2024
  const mockSetActiveDate = jest.fn();
  const mockSetCurrentContentView = jest.fn();

  const renderYearMonthPicker = (contentView: CalendarContentView) => {
    return render(
      <CalendarProvider
        value={{
          date: null,
          activeDate: mockDate,
          onDateSelect: jest.fn(),
          setActiveDate: mockSetActiveDate,
          formatDate: jest.fn(),
          setDate: jest.fn(),
          currentContentView: contentView,
          setCurrentContentView: mockSetCurrentContentView,
          firstDayOfWeek: 0,
        }}
      >
        <YearMonthPicker />
      </CalendarProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays month and year when contentView is DAY", () => {
    renderYearMonthPicker(CalendarContentView.DAY);
    expect(screen.getByText("January 2024")).toBeInTheDocument();
  });

  it("displays year when contentView is MONTH", () => {
    renderYearMonthPicker(CalendarContentView.MONTH);
    expect(screen.getByText("2024")).toBeInTheDocument();
  });

  it("displays decade range when contentView is YEAR", () => {
    renderYearMonthPicker(CalendarContentView.YEAR);
    expect(screen.getByText("2020 - 2029")).toBeInTheDocument();
  });

  it("handles previous button click correctly for DAY view", () => {
    renderYearMonthPicker(CalendarContentView.DAY);
    fireEvent.click(screen.getByTestId("prev-button"));
    expect(mockSetActiveDate).toHaveBeenCalledWith(new Date(2023, 11, 1));
  });

  it("handles next button click correctly for DAY view", () => {
    renderYearMonthPicker(CalendarContentView.DAY);
    fireEvent.click(screen.getByTestId("next-button"));
    expect(mockSetActiveDate).toHaveBeenCalledWith(new Date(2024, 1, 1));
  });

  it("handles picker click to change view from DAY to MONTH", () => {
    renderYearMonthPicker(CalendarContentView.DAY);
    fireEvent.click(screen.getByTestId("picker"));
    expect(mockSetCurrentContentView).toHaveBeenCalledWith(
      CalendarContentView.MONTH
    );
  });

  it("handles picker click to change view from MONTH to YEAR", () => {
    renderYearMonthPicker(CalendarContentView.MONTH);
    fireEvent.click(screen.getByTestId("picker"));
    expect(mockSetCurrentContentView).toHaveBeenCalledWith(
      CalendarContentView.YEAR
    );
  });

  it("does not change view when clicking picker in YEAR view", () => {
    renderYearMonthPicker(CalendarContentView.YEAR);
    fireEvent.click(screen.getByTestId("picker"));
    expect(mockSetCurrentContentView).not.toHaveBeenCalled();
  });
});
