import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import useCalendar from "../../useCalendar";
import isSameDay from "date-fns/isSameDay";
import isSameMonth from "date-fns/isSameMonth";
const style = {
  width: 36,
  height: 36,
  margin: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 50,
  cursor: "pointer",
};

const isTodayStyle = {
  color: "#db3d44",
};

const isSelectedStyle = {
  backgroundColor: "#db3d44",
  color: "white",
};

const isNotSameMonthStyle = {
  color: "#eeeeee",
};

const Day = forwardRef(({ date, ...rest }, ref) => {
  const calendarContext = useCalendar();
  const {
    setActiveDate,
    formatDate,
    date: selectedDate,
    activeDate,
    onDateSelect,
  } = { ...calendarContext };

  const handleClick = useCallback(() => {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    onDateSelect({ day, month, year });
    setActiveDate(date);
  }, [date, onDateSelect, setActiveDate]);

  const isToday = isSameDay(date, new Date());
  const isSelected = isSameDay(date, selectedDate);
  const isNotSameMonth = !isSameMonth(date, activeDate);

  return (
    <Box
      display="flex"
      ref={ref}
      sx={{
        ...style,
        ...(isToday && isTodayStyle),
        ...(isSelected && isSelectedStyle),
        ...(isNotSameMonth && isNotSameMonthStyle),
        "&:hover": { backgroundColor: "#db3d44", color: "white" },
      }}
      onClick={handleClick}
      {...rest}
    >
      {formatDate(date, "d")}
    </Box>
  );
});

Day.displayName = "Day";
Day.propTypes = {
  date: PropTypes.instanceOf(Date),
};
export default Day;
