import PropTypes from "prop-types";
import { memo } from "react";
import { addDays } from "date-fns";
import Day from "./Day";
import Grid from "@mui/material/Grid2";

const Week = ({ startDateOfWeek }: { startDateOfWeek: Date }) => {
  const days = Array.from({ length: 7 }, (_, index) =>
    addDays(startDateOfWeek, index)
  );

  return (
    <Grid container>
      {days.map((date) => (
        <Grid key={date.getTime()} size="grow">
          <Day date={date} />
        </Grid>
      ))}
    </Grid>
  );
};

Week.propTypes = {
  startDateOfWeek: PropTypes.instanceOf(Date).isRequired,
};

export default memo(Week);
