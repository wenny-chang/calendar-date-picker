import DaysOfWeek from "./DaysOfWeek";
import { Box } from "@mui/material";
import { forwardRef } from "react";
import Weeks from "./Weeks";

const MonthDate = forwardRef((props, ref) => {
  return (
    <Box ref={ref} {...props} data-testid="month-date">
      <DaysOfWeek />
      <Weeks />
    </Box>
  );
});

MonthDate.displayName = "MonthDate";

export default MonthDate;
