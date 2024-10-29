import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import useCalendar from "../../useCalendar";

const DaysOfWeek = () => {
  const { firstDayOfWeek } = useCalendar();
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const orderedDays = [
    ...daysOfWeek.slice(firstDayOfWeek),
    ...daysOfWeek.slice(0, firstDayOfWeek),
  ];

  return (
    <Grid container>
      {orderedDays.map((day) => (
        <Grid key={day} size="grow">
          <Typography variant="subtitle2" align="center" width={40}>
            {day}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};

export default DaysOfWeek;
