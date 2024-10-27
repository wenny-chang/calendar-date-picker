import DaysOfWeek from "./DaysOfWeek";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { forwardRef } from "react";
import Weeks from "./Weeks";

const MonthDate = forwardRef(({ startDay = 0, ...rest }, ref) => {
  return (
    <Box ref={ref} {...rest}>
      <DaysOfWeek startDay={startDay} />
      <Weeks />
    </Box>
  );
});

MonthDate.displayName = "MonthDate";
MonthDate.propTypes = {
  startDay: PropTypes.number,
};

export default MonthDate;
