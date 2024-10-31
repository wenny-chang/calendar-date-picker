import useCalendar from "../../useCalendar";
import Grid from "@mui/material/Grid2";
import Month from "./Month";

const YearMonth = () => {
  const { activeDate } = useCalendar();

  return (
    <Grid container rowSpacing={1} data-testid="year-month">
      {Array.from({ length: 12 }, (_, index) => (
        <Grid key={index} size={3}>
          <Month date={new Date(activeDate.getFullYear(), index)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default YearMonth;
