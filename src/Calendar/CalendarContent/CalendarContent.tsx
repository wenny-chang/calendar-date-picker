import MonthDate from "./MonthDate";
import useCalendar from "../useCalendar";
import { CalendarContentView } from "../../utils/constant";
import YearMonth from "./YearMonth";
import Years from "./Years";

const CalendarContent = () => {
  const { currentContentView } = useCalendar();

  return {
    [CalendarContentView.DAY]: <MonthDate />,
    [CalendarContentView.MONTH]: <YearMonth />,
    [CalendarContentView.YEAR]: <Years />,
  }[currentContentView];
};

export default CalendarContent;
