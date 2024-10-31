import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import useCalendar from "../../useCalendar";
import { isSameDay, isSameMonth } from "date-fns";
import useCalendarStyle from "../../useCalenderStyle";

const Day = forwardRef(({ date, ...rest }: { date: Date }, ref) => {
  const {
    setActiveDate,
    formatDate,
    date: selectedDate,
    activeDate,
    onDateSelect,
  } = useCalendar();

  const handleClick = useCallback(() => {
    onDateSelect({
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    });
    setActiveDate(date);
  }, [date, onDateSelect, setActiveDate]);

  const isToday = isSameDay(date, new Date());
  const isSelected = isSameDay(date, selectedDate ?? "");
  const isNotSameMonth = !isSameMonth(date, activeDate);

  const dayStyle = useCalendarStyle(isToday, isSelected, isNotSameMonth);

  return (
    <Box
      ref={ref}
      sx={dayStyle}
      onClick={handleClick}
      {...rest}
      data-testid="day"
    >
      {formatDate(date, "d")}
    </Box>
  );
});

Day.displayName = "Day";

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Day;
