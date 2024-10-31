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

      const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
      const isValidDate = dateFormatRegex.test(value);
      setError(!isValidDate);
      if (isValidDate) {
        const [year, month, day] = value.split("-").map(Number);
        const parsedDate = new Date(year, month - 1, day);

        if (
          isValid(parsedDate) &&
          parsedDate.getFullYear() === year &&
          parsedDate.getMonth() === month - 1 &&
          parsedDate.getDate() === day
        ) {
          setDate(parsedDate);
        }
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
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && date) {
        handleDateSelect(date);
        setShowCalendar(false);
      }
    },
    [date, handleDateSelect]
  );

  return (
    <Box sx={{ position: "relative", width: "fit-content" }}>
      <TextField
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleKeyDown}
        placeholder="YYYY-MM-DD"
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
          <Calendar date={date} onDateSelect={handleDateSelect} />
        </Box>
      )}
    </Box>
  );
};

export default React.memo(DatePicker);
