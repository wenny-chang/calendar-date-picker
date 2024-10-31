import { useMemo } from "react";
import { startOfMonth, startOfWeek, addWeeks, Day } from "date-fns";
import Week from "./Week";
import useCalendar from "../../useCalendar";

const Weeks = () => {
  const { activeDate, firstDayOfWeek } = useCalendar();

  const weeks = useMemo(() => {
    const firstDayOfMonth = startOfMonth(activeDate);
    const firstWeekStart = startOfWeek(firstDayOfMonth, {
      weekStartsOn: firstDayOfWeek as Day,
    });

    return Array.from({ length: 6 }, (_, i) => addWeeks(firstWeekStart, i));
  }, [activeDate, firstDayOfWeek]);

  return (
    <>
      {weeks.map((startDateOfWeek, index) => (
        <Week startDateOfWeek={startDateOfWeek} key={index} />
      ))}
    </>
  );
};

export default Weeks;
