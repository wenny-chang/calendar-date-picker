import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import useCalendar from "../../useCalendar";
import isSameMonth from "date-fns/isSameMonth";
import { CalendarContentView } from "../../../utils/constant";

const style = {
  width: 60,
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
};

const isCurrentMonthStyle = {
  color: "#db3d44",
};

const isSelectedStyle = {
  backgroundColor: "#db3d44",
  color: "white",
};

const Month = forwardRef(({ date, ...rest }, ref) => {
  const calendarContext = useCalendar();
  const {
    setActiveDate,
    formatDate,
    date: selectedDate,
    setCurrentContentView,
    onDateSelect,
  } = { ...calendarContext };

  const handleClick = useCallback(() => {
    onDateSelect({ day: 1, month: date.getMonth(), year: date.getFullYear() });
    setActiveDate(date);
    setCurrentContentView(CalendarContentView.DAY);
  }, [onDateSelect, date, setActiveDate, setCurrentContentView]);

  const isCurrentMonth = isSameMonth(date, new Date());
  const isSelected = isSameMonth(date, selectedDate);

  return (
    <Box
      ref={ref}
      sx={{
        ...style,
        ...(isCurrentMonth && isCurrentMonthStyle),
        ...(isSelected && isSelectedStyle),
        "&:hover": { backgroundColor: "#db3d44", color: "white" },
      }}
      onClick={handleClick}
      {...rest}
    >
      {formatDate(date, "MMM")}
    </Box>
  );
});

Month.displayName = "Month";
Month.propTypes = {
  date: PropTypes.instanceOf(Date),
  month: PropTypes.number,
};

export default Month;
