import Year from "./Year";
import { getDecadeRange } from "../../../utils/function";
import Grid from "@mui/material/Grid2";
import useCalendar from "../../useCalendar";

const Years = () => {
  const calendarContext = useCalendar();
  const { activeDate } = {
    ...calendarContext,
  };
  const [startYear] = getDecadeRange(activeDate);

  const allYearsInDecade = Array.from(
    { length: 12 },
    (_, index) => startYear - 1 + index
  );

  return (
    <Grid container>
      {allYearsInDecade.map((year) => (
        <Grid key={year} size={3}>
          <Year year={year} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Years;
