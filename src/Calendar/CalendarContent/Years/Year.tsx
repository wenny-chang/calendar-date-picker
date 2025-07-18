import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
import useCalendar from "../../useCalendar";
import { isSameYear } from "date-fns";
import { CalendarContentView } from "../../../utils/constant";
import { getDecadeRange } from "../../../utils/function";
import useCalendarStyle from "../../useCalenderStyle";

const Year = forwardRef(({ year, ...rest }: { year: number }, ref) => {
  const {
    activeDate,
    setCurrentContentView,
    onDateSelect,
    date: selectedDate,
    setActiveDate,
  } = useCalendar();

  const handleClick = useCallback(() => {
    onDateSelect({ day: 1, month: 0, year });
    setCurrentContentView(CalendarContentView.MONTH);
    setActiveDate(new Date(year, 0, 1));
  }, [year, setCurrentContentView, onDateSelect, setActiveDate]);

  const isCurrentYear = isSameYear(new Date(year, 0, 1), new Date());
  const isSelected = isSameYear(new Date(year, 0, 1), selectedDate ?? "");
  const decadeRange = getDecadeRange(activeDate);
  const isNotInDecade = year < decadeRange[0] || year > decadeRange[1];

  const yearStyle = useCalendarStyle(isCurrentYear, isSelected, isNotInDecade);

  return (
    <Box
      ref={ref}
      sx={yearStyle}
      onClick={handleClick}
      {...rest}
      data-testid="year"
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
