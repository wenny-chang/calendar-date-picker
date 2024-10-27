import { Box, IconButton, Button } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import useCalendar from "../useCalendar";
import {
  NextCalendarContentView,
  CalendarContentView,
} from "../../utils/constant";
import { getDecadeRange } from "../../utils/function";
const YearMonthPicker = () => {
  const calendarContext = useCalendar();
  const {
    setActiveDate,
    activeDate,
    currentContentView,
    setCurrentContentView,
  } = {
    ...calendarContext,
  };
  const handlePrev = () => {
    switch (currentContentView) {
      case CalendarContentView.DAY:
        setActiveDate(
          new Date(activeDate.getFullYear(), activeDate.getMonth() - 1)
        );
        break;
      case CalendarContentView.MONTH:
        setActiveDate(new Date(activeDate.getFullYear() - 1, 0));
        break;
      case CalendarContentView.YEAR:
        setActiveDate(new Date(activeDate.getFullYear() - 10, 0));
        break;
    }
  };

  const handleNext = () => {
    switch (currentContentView) {
      case CalendarContentView.DAY:
        setActiveDate(
          new Date(activeDate.getFullYear(), activeDate.getMonth() + 1)
        );
        break;
      case CalendarContentView.MONTH:
        setActiveDate(new Date(activeDate.getFullYear() + 1, 0));
        break;
      case CalendarContentView.YEAR:
        setActiveDate(new Date(activeDate.getFullYear() + 10, 0));
        break;
    }
  };

  const handleClickPicker = () => {
    if (currentContentView !== CalendarContentView.YEAR) {
      setCurrentContentView(NextCalendarContentView[currentContentView]);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={4}
      mb={1}
    >
      <IconButton onClick={handlePrev} size="small">
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <Button
        fullWidth
        variant="text"
        color="grey.900"
        onClick={handleClickPicker}
        sx={{ fontWeight: "bold" }}
      >
        {currentContentView === CalendarContentView.DAY
          ? activeDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })
          : currentContentView === CalendarContentView.MONTH
          ? activeDate.getFullYear()
          : getDecadeRange(activeDate).join(" - ")}
      </Button>
      <IconButton onClick={handleNext} size="small">
        <ArrowForwardIosIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default YearMonthPicker;
