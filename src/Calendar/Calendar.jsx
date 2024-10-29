import PropTypes from "prop-types";
import { useState, useMemo, useCallback, forwardRef } from "react";
import { Box } from "@mui/material";
import { CalendarProvider } from "./context";
import format from "date-fns/format";
import isDate from "date-fns/isDate";
import isValid from "date-fns/isValid";
import YearMonthPicker from "./YearMonthPicker";
import { CalendarContentView } from "../utils/constant";
import CalendarContent from "./CalendarContent";

const mapValueToDate = (value) => {
  if (value === undefined || value === null) {
    return null;
  }
  const date = new Date(value);
  return isDate(date) && isValid(date) ? date : null;
};

const Calendar = forwardRef((props, ref) => {
  const {
    date: dateProp, // Controlled date prop
    formatDate: formatDateProp, // Custom date formatting function
    firstDayOfWeek = 0, // Default to Sunday
    onDateSelect: onDateSelectProp, // Callback for date selection
  } = props;

  const initialDate = useMemo(
    () => mapValueToDate(dateProp) ?? null,
    [dateProp]
  );
  const initialActiveDate = useMemo(() => new Date(), []);
  const [activeDate, setActiveDate] = useState(initialActiveDate);
  const [date, setDate] = useState(initialDate);
  const [currentContentView, setCurrentContentView] = useState(
    CalendarContentView.DAY
  );

  const formatDate = useCallback(
    (_date, _format, _options) => {
      if (!_date) return null;
      return typeof formatDateProp === "function"
        ? formatDateProp(_date, _format, _options)
        : format(_date, _format, _options);
    },
    [formatDateProp]
  );

  const onDateSelect = useCallback(
    (nextDate) => {
      const selectedDate = new Date(
        nextDate.year,
        nextDate.month,
        nextDate.day
      );
      const isControlled = dateProp !== undefined;
      if (!isControlled) {
        setDate(selectedDate);
      }
      if (currentContentView === CalendarContentView.DAY) {
        onDateSelectProp?.(selectedDate);
      }
    },
    [currentContentView, dateProp, onDateSelectProp]
  );

  const context = useMemo(
    () => ({
      activeDate,
      setActiveDate,
      formatDate,
      date,
      setDate,
      currentContentView,
      setCurrentContentView,
      firstDayOfWeek,
      onDateSelect,
    }),
    [
      activeDate,
      formatDate,
      date,
      currentContentView,
      firstDayOfWeek,
      onDateSelect,
    ]
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
        <CalendarContent />
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = "Calendar";

Calendar.propTypes = {
  date: PropTypes.instanceOf(Date),
  formatDate: PropTypes.func,
  firstDayOfWeek: PropTypes.number,
  onDateSelect: PropTypes.func,
};

export default Calendar;
