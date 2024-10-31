import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import useCalendar from "../../useCalendar";
import { isSameMonth } from "date-fns";
import { CalendarContentView } from "../../../utils/constant";
import useCalendarStyle from "../../useCalenderStyle";

const Month = forwardRef(({ date, ...rest }: { date: Date }, ref) => {
  const {
    setActiveDate,
    formatDate,
    date: selectedDate,
    setCurrentContentView,
    onDateSelect,
  } = useCalendar();

  const handleClick = useCallback(() => {
    onDateSelect({ day: 1, month: date.getMonth(), year: date.getFullYear() });
    setActiveDate(date);
    setCurrentContentView(CalendarContentView.DAY);
  }, [onDateSelect, date, setActiveDate, setCurrentContentView]);

  const isCurrentMonth = isSameMonth(date, new Date());
  const isSelected = isSameMonth(date, selectedDate ?? "");
  const monthStyle = useCalendarStyle(isCurrentMonth, isSelected, false);

  return (
    <Box ref={ref} sx={monthStyle} onClick={handleClick} {...rest}>
      {formatDate(date, "MMM")}
    </Box>
  );
});

Month.displayName = "Month";
Month.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Month;
