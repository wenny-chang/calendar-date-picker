import { useState, useRef, useEffect } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import Calendar from "../Calendar/Calendar";
import format from "date-fns/format";
import isValid from "date-fns/isValid";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
const DatePicker = () => {
  const [date, setDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const calendarRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Handle clicking outside to close calendar
    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        !inputRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // Try to parse date from input
    const parsedDate = new Date(value);
    if (isValid(parsedDate)) {
      setDate(parsedDate);
    }
  };

  const handleInputFocus = () => {
    setShowCalendar(true);
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    setInputValue(format(selectedDate, "yyyy-MM-dd"));
    setShowCalendar(false);
  };

  return (
    <Box sx={{ position: "relative", width: "fit-content" }}>
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        placeholder="YYYY-MM-DD"
        inputRef={inputRef}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          },
        }}
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
          <Calendar date={date} onDateSelect={handleDateSelect} />
        </Box>
      )}
    </Box>
  );
};

export default DatePicker;
