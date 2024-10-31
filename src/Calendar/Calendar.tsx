import PropTypes from "prop-types";
import { useState, useMemo, useCallback, forwardRef, useEffect } from "react";
import { Box } from "@mui/material";
import { CalendarProvider } from "./context";
import { format, isDate, isValid } from "date-fns";
import YearMonthPicker from "./YearMonthPicker";
import { CalendarContentView } from "../utils/constant";
import CalendarContent from "./CalendarContent";
import { CalendarContextType } from "./context";

const mapValueToDate = (value: Date | string | number | undefined | null) => {
  if (value === undefined || value === null) {
    return null;
  }
  const date = new Date(value);
  return isDate(date) && isValid(date) ? date : null;
};

type CalendarProps = {
  date?: Date | string | undefined | null;
  defaultDate?: Date | string | undefined | null;
  firstDayOfWeek?: number;
  onDateSelect?: (date: Date) => void;
};

const Calendar = forwardRef((props: CalendarProps, ref) => {
  const {
    date: dateProp, // Controlled date prop
    defaultDate: defaultDateProp, // Default date prop
    firstDayOfWeek = 0, // Default to Sunday
    onDateSelect: onDateSelectProp, // Callback for date selection
  } = props;
  const initialDate = useMemo(
    () => mapValueToDate(dateProp) ?? mapValueToDate(defaultDateProp) ?? null,
    [dateProp, defaultDateProp]
  );
  const initialActiveDate = useMemo(() => new Date(), []);
  const [activeDate, setActiveDate] = useState(initialActiveDate);
  const [date, setDate] = useState(initialDate);
  const [currentContentView, setCurrentContentView] = useState(
    CalendarContentView.DAY
  );

  const formatDate = useCallback((_date: Date, _format: string) => {
    if (!_date) return "";
    return format(_date, _format);
  }, []);

  const onDateSelect = useCallback(
    ({ year, month, day }: { year: number; month: number; day: number }) => {
      const selectedDate = new Date(year, month, day);
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

  useEffect(() => {
    setDate(initialDate);
  }, [initialDate]);

  useEffect(() => {
    date && setActiveDate(date);
  }, [date]);

  const context: CalendarContextType = useMemo(
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
        data-testid="calendar"
      >
        <YearMonthPicker />
        <CalendarContent />
      </Box>
    </CalendarProvider>
  );
});

Calendar.displayName = "Calendar";

Calendar.propTypes = {
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  firstDayOfWeek: PropTypes.number,
  onDateSelect: PropTypes.func,
};

export default Calendar;
