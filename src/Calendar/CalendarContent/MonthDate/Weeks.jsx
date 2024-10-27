import { useState, useEffect } from "react";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import addWeeks from "date-fns/addWeeks";
import Week from "./Week";
import useCalendar from "../../useCalendar";
import Grid from "@mui/material/Grid2";

const Weeks = () => {
  const { activeDate, firstDayOfWeek } = useCalendar();
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const firstDayOfMonth = startOfMonth(activeDate);
    const firstWeekStart = startOfWeek(firstDayOfMonth, {
      weekStartsOn: firstDayOfWeek,
    });

    const weeksInMonth = Array.from({ length: 6 }, (_, i) =>
      addWeeks(firstWeekStart, i)
    );

    const monthStart = firstDayOfMonth;
    const monthEnd = new Date(
      monthStart.getFullYear(),
      monthStart.getMonth() + 1,
      0
    );

    const filteredWeeks = weeksInMonth.filter((weekStart) => {
      const weekEnd = addWeeks(weekStart, 1);
      return weekStart <= monthEnd && weekEnd >= monthStart;
    });

    setWeeks(filteredWeeks);
  }, [activeDate, firstDayOfWeek]);

  return (
    <>
      {weeks.map((startDateOfWeek, index) => (
        <Grid container key={index}>
          <Week startDateOfWeek={startDateOfWeek} />
        </Grid>
      ))}
    </>
  );
};

export default Weeks;
