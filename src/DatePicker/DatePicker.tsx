import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  forwardRef,
} from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Calendar from "../Calendar/Calendar";
import { format, isValid } from "date-fns";

type DatePickerInputFormat = "yyyy-MM-dd" | "MM-dd-yyyy" | "dd-MM-yyyy";

type DatePickerProps = {
  firstDayOfWeek?: number;
  defaultValue?: string | Date;
  inputFormat?: DatePickerInputFormat;
  closeOnSelect?: boolean;
  onChange?: (value: string) => void;
};

const DatePicker = forwardRef((props: DatePickerProps, ref) => {
  const {
    firstDayOfWeek,
    defaultValue: defaultValueProp,
    inputFormat = "yyyy-MM-dd",
    closeOnSelect = false,
    onChange,
  } = props;

  const defaultValue =
    defaultValueProp instanceof Date
      ? format(defaultValueProp, inputFormat)
      : defaultValueProp;

  const [date, setDate] = useState<Date | null>(
    defaultValue ? new Date(defaultValue) : null
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>(defaultValue || "");
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setInputValue(value);
      if (value === "") {
        setDate(null);
        setError(false);
        return;
      }

      let dateFormatRegex;
      let year, month, day;

      switch (inputFormat) {
        case "yyyy-MM-dd":
          dateFormatRegex = /^\d{4}-\d{1,2}-\d{1,2}$/;
          if (dateFormatRegex.test(value)) {
            [year, month, day] = value.split("-").map(Number);
          }
          break;
        case "MM-dd-yyyy":
          dateFormatRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
          if (dateFormatRegex.test(value)) {
            [month, day, year] = value.split("-").map(Number);
          }
          break;
        case "dd-MM-yyyy":
          dateFormatRegex = /^\d{1,2}-\d{1,2}-\d{4}$/;
          if (dateFormatRegex.test(value)) {
            [day, month, year] = value.split("-").map(Number);
          }
          break;
        default:
          setError(true);
          return;
      }

      if (year !== undefined && month !== undefined && day !== undefined) {
        const parsedDate = new Date(year, month - 1, day);

        if (
          isValid(parsedDate) &&
          parsedDate.getFullYear() === year &&
          parsedDate.getMonth() === month - 1 &&
          parsedDate.getDate() === day
        ) {
          setDate(parsedDate);
          setError(false);
        } else {
          setError(true);
        }
      } else {
        setError(true);
      }
    },
    [inputFormat]
  );

  const handleInputFocus = useCallback(() => {
    setShowCalendar(true);
  }, []);

  const handleDateSelect = useCallback(
    (selectedDate: Date) => {
      setDate(selectedDate);
      setInputValue(format(selectedDate, inputFormat));
      setShowCalendar(!closeOnSelect);
    },
    [closeOnSelect]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && date) {
        handleDateSelect(date);
        setShowCalendar(false);
      }
    },
    [date, handleDateSelect]
  );

  const handleInputOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (onChange) {
        onChange(value);
      }
      handleInputChange(event);
    },
    [date, onChange, handleInputChange]
  );

  return (
    <Box sx={{ position: "relative", width: "fit-content" }} ref={ref}>
      <TextField
        value={inputValue}
        onChange={handleInputOnChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder={inputFormat}
        helperText={error ? "Invalid format" : ""}
        inputRef={inputRef}
        error={error}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          },
        }}
        aria-describedby="Date input"
      />

      {showCalendar && (
        <Box
          ref={calendarRef}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 1000,
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            marginTop: "8px",
          }}
        >
          <Calendar
            date={date}
            onDateSelect={handleDateSelect}
            firstDayOfWeek={firstDayOfWeek}
          />
        </Box>
      )}
    </Box>
  );
});

export default React.memo(DatePicker);
