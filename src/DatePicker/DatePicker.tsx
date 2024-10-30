import React, { useState, useRef, useEffect, useCallback } from "react";
import { Box, TextField, InputAdornment } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Calendar from "../Calendar/Calendar";
import { format, isValid } from "date-fns";

const DatePicker: React.FC = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const calendarRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

      const parsedDate = new Date(value);
      if (isValid(parsedDate)) {
        setDate(parsedDate);
      }
    },
    []
  );

  const handleInputFocus = useCallback(() => {
    setShowCalendar(true);
  }, []);

  const handleDateSelect = useCallback((selectedDate: Date) => {
    setDate(selectedDate);
    setInputValue(format(selectedDate, "yyyy-MM-dd"));
    setShowCalendar(false);
  }, []);

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
          <Calendar date={date} onDateSelect={handleDateSelect} />
        </Box>
      )}
    </Box>
  );
};

export default React.memo(DatePicker);
