import PropTypes from "prop-types";
import { useState, useMemo, useCallback, forwardRef } from "react";
import { Box } from "@mui/material";
import { CalendarProvider } from "./context";
import format from "date-fns/format";
import isDate from "date-fns/isDate";
import isValid from "date-fns/isValid";
import YearMonthPicker from "./YearMonthPicker";
import { CalendarContentView } from "../utils/constant";
const mapValueToDate = (value) => {
  if (value === undefined || value === null) {
    return null;
  }
  const date = new Date(value);
  return isDate(date) && isValid(date) ? date : null;
};

const Calendar = forwardRef((props, ref) => {
  const { date: dateProp, formatDate: formatDateProp } = props;
  const initialDate = useMemo(
    () => mapValueToDate(dateProp) ?? new Date(),
    [dateProp]
  );
  const initialActiveDate = new Date();
  const [activeDate, setActiveDate] = useState(initialActiveDate);
  // const [date, setDate] = useState(initialDate);
  const [currentContentView, setCurrentContentView] = useState(
    CalendarContentView.DAY
  );

  const formatDate = useCallback(
    (_date, _format, _options) => {
      if (!_date) {
        return null;
      }
      if (typeof formatDateProp === "function") {
        return formatDateProp(_date, _format, _options);
      }
      return format(_date, _format, _options);
    },
    [formatDateProp]
  );

  const context = useMemo(
    () => ({
      activeDate,
      setActiveDate,
      formatDate,
      date: initialDate,
      currentContentView,
      setCurrentContentView,
    }),
    [activeDate, currentContentView, formatDate, initialDate]
  );
  return (
    <CalendarProvider value={context}>
      <Box
        width={300}
        p={1.5}
        border="1px solid #ccc"
        borderRadius={1}
        ref={ref}
      >
        <YearMonthPicker />
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = "Calendar";

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  defaultDate: PropTypes.instanceOf(Date),
  formatDate: PropTypes.func,
};

export default Calendar;
