import { useMemo } from "react";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import addWeeks from "date-fns/addWeeks";
import Week from "./Week";
import useCalendar from "../../useCalendar";
import Grid from "@mui/material/Grid2";

const Weeks = () => {
  const { activeDate, firstDayOfWeek } = useCalendar();

  const weeks = useMemo(() => {
    const firstDayOfMonth = startOfMonth(activeDate);
    const firstWeekStart = startOfWeek(firstDayOfMonth, {
      weekStartsOn: firstDayOfWeek,
    });

    return Array.from({ length: 6 }, (_, i) => addWeeks(firstWeekStart, i));
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
