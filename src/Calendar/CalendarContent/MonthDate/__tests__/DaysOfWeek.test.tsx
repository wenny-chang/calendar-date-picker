import { render, screen } from "@testing-library/react";
import { CalendarProvider } from "../../../context";
import DaysOfWeek from "../DaysOfWeek";
import { CalendarContentView } from "../../../../utils/constant";

describe("DaysOfWeek Component", () => {
  const renderDaysOfWeek = (firstDayOfWeek = 0) => {
    return render(
      <CalendarProvider
        value={{
          firstDayOfWeek,
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
        <DaysOfWeek />
      </CalendarProvider>
    );
  };

  it("renders all days of the week", () => {
    renderDaysOfWeek();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayElements = screen.getAllByTestId("days-of-week");
    dayElements.forEach((element, i) => {
      expect(element).toHaveTextContent(days[i]);
    });
  });

  it("reorders days based on firstDayOfWeek", () => {
    renderDaysOfWeek(1); // Start with Monday
    const orderedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Get all day elements
    const dayElements = screen.getAllByTestId("days-of-week");
    const renderedDays = dayElements.map((element) => element.textContent);

    expect(renderedDays).toEqual(orderedDays);
  });
});
