import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import useCalendar from "../../useCalendar";
import isSameYear from "date-fns/isSameYear";
import { CalendarContentView } from "../../../utils/constant";
import { getDecadeRange } from "../../../utils/function";

const style = {
  width: 60,
  height: 60,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  cursor: "pointer",
};

const isCurrentYearStyle = {
  color: "#db3d44",
};

const isSelectedStyle = {
  backgroundColor: "#db3d44",
  color: "white",
};

const isNotInDecadeStyle = {
  color: "#eeeeee",
};

const Year = forwardRef(({ year, ...rest }, ref) => {
  const calendarContext = useCalendar();
  const {
    activeDate,
    onChange,
    setCurrentContentView,
    setSelectedYear,
    selectedYear,
    setSelectedMonth,
  } = { ...calendarContext };

  const handleClick = useCallback(() => {
    const newDate = new Date(year, 0, 1);
    setSelectedYear(year);
    setSelectedMonth(null);
    onChange(newDate);
    setCurrentContentView(CalendarContentView.MONTH);
  }, [
    year,
    setSelectedYear,
    onChange,
    setCurrentContentView,
    setSelectedMonth,
  ]);

  const isCurrentYear = isSameYear(new Date(year, 0, 1), new Date());
  const isSelected = activeDate
    ? year === activeDate.getFullYear()
    : year === selectedYear;
  const decadeRange = getDecadeRange(activeDate);
  const isNotInDecade = year < decadeRange[0] || year > decadeRange[1];
  return (
    <Box
      ref={ref}
      sx={{
        ...style,
        ...(isCurrentYear && isCurrentYearStyle),
        ...(isSelected && isSelectedStyle),
        ...(isNotInDecade && isNotInDecadeStyle),
        "&:hover": { backgroundColor: "#db3d44", color: "white" },
      }}
      onClick={handleClick}
      {...rest}
    >
      {year}
    </Box>
  );
});

Year.displayName = "Year";
Year.propTypes = {
  year: PropTypes.number.isRequired,
};

export default Year;
