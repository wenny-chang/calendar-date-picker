import { render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../../context";
import Month from "../Month";
import { CalendarContentView } from "../../../../utils/constant";
import userEvent from "@testing-library/user-event";

describe("Month Component", () => {
  const mockDate = new Date(2024, 0, 1); // January 1, 2024
  const mockOnDateSelect = jest.fn();
  const mockSetActiveDate = jest.fn();
  const mockSetCurrentContentView = jest.fn();

  const renderMonth = (
    date: Date = mockDate,
    selectedDate: Date | null = mockDate,
    activeDate: Date = mockDate
  ) => {
    return render(
      <CalendarProvider
        value={{
          firstDayOfWeek: 0,
          date: selectedDate,
          activeDate,
          onDateSelect: mockOnDateSelect,
          setActiveDate: mockSetActiveDate,
          formatDate: (date, format) =>
            format === "MMM" ? "Jan" : date.getMonth().toString(),
          setDate: jest.fn(),
          currentContentView: CalendarContentView.MONTH,
          setCurrentContentView: mockSetCurrentContentView,
        }}
      >
        <Month date={date} />
      </CalendarProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders month name correctly", () => {
    renderMonth();
    expect(screen.getByText("Jan")).toBeInTheDocument();
  });

  it("handles click event correctly", async () => {
    renderMonth();
    const user = userEvent.setup();

    const monthElement = screen.getByTestId("month");

    await user.click(monthElement);

    expect(mockOnDateSelect).toHaveBeenCalledWith({
      day: 1,
      month: 0,
      year: 2024,
    });
    expect(mockSetActiveDate).toHaveBeenCalledWith(mockDate);
    expect(mockSetCurrentContentView).toHaveBeenCalledWith(
      CalendarContentView.DAY
    );
  });
  it("applies selected styles when date is selected", () => {
    renderMonth();
    const monthElement = screen.getByTestId("month");
    expect(monthElement).toHaveStyle({
      backgroundColor: "#db3d44",
      color: "white",
    });
  });

  it("applies this month styles when date is this month", () => {
    renderMonth(new Date(), null, new Date());
    const monthElement = screen.getByTestId("month");
    expect(monthElement).toHaveStyle({ color: "#db3d44" });
  });
});
