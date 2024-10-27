import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import useCalendar from "../../useCalendar";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
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

const isNotSameYearStyle = {
  color: "#eeeeee",
};

const Month = forwardRef(({ date, month, ...rest }, ref) => {
  const calendarContext = useCalendar();
  const {
    setActiveDate,
    formatDate,
    activeDate,
    onChange,
    setCurrentContentView,
    selectedMonth,
    setSelectedMonth,
  } = { ...calendarContext };

  const handleClick = useCallback(() => {
    setActiveDate(date);
    onChange(date);
    setCurrentContentView(CalendarContentView.DAY);
    setSelectedMonth(month);
  }, [
    setActiveDate,
    date,
    onChange,
    setCurrentContentView,
    setSelectedMonth,
    month,
  ]);

  const isCurrentMonth = isSameMonth(date, new Date());
  const isSelected =
    month === selectedMonth ||
    (activeDate && month === activeDate.getMonth() + 1);
  const isNotSameYear = !isSameYear(date, activeDate);

  return (
    <Box
      ref={ref}
      sx={{
        ...style,
        ...(isCurrentMonth && isCurrentMonthStyle),
        ...(isSelected && isSelectedStyle),
        ...(isNotSameYear && isNotSameYearStyle),
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
