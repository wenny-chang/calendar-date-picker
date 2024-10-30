import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback, useMemo } from "react";
import useCalendar from "../../useCalendar";
import { isSameDay, isSameMonth } from "date-fns";

const baseStyle = {
  width: 36,
  height: 36,
  margin: "2px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
};

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

  const dayStyle = useMemo(
    () => ({
      ...baseStyle,
      ...(isToday && { color: "#db3d44" }),
      ...(isSelected && { backgroundColor: "#db3d44", color: "white" }),
      ...(isNotSameMonth && { color: "#eeeeee" }),
      "&:hover": { backgroundColor: "#db3d44", color: "white" },
    }),
    [isToday, isSelected, isNotSameMonth]
  );

  return (
    <Box ref={ref} sx={dayStyle} onClick={handleClick} {...rest}>
      {formatDate(date, "d")}
    </Box>
  );
});

Day.displayName = "Day";

Day.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Day;
