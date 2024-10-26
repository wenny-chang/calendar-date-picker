import { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Day from "./components/Day";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const renderDays = () => {
    const days = [];
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(month, year);

    // Get the first day of the month (0 = Sunday, 6 = Saturday)
    const firstDay = new Date(year, month, 1).getDay();

    // Add blank days for the beginning of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<Day color="transparent" key={`empty-${i}`}></Day>);
    }

    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(<Day key={day}>{day}</Day>);
    }

    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  return (
    <Box
      className="calendar"
      width={300}
      p={1.5}
      border="1px solid #ccc"
      borderRadius={1}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={4}
        mb={1}
      >
        <IconButton onClick={handlePrevMonth} size="small">
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        <Typography fontWeight="bold">
          {currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-between" fontWeight="bold">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </Box>
      <Box display="grid" gridTemplateColumns="repeat(7, 1fr)">
        {renderDays()}
      </Box>
    </Box>
  );
};

export default Calendar;
