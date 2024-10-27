import addDays from "date-fns/addDays";
import Day from "./Day";
import Grid from "@mui/material/Grid2";

const Week = ({ startDateOfWeek }) => {
  return [0, 1, 2, 3, 4, 5, 6].map((amountOfDays) => {
    const date = addDays(startDateOfWeek, amountOfDays);
    return (
      <Grid key={date.getTime()} size="grow">
        <Day date={date} key={date.getTime()} />
      </Grid>
    );
  });
};

Week.displayName = "Week";

export default Week;
