import { forwardRef } from "react";
import { Box, IconButton, Button } from "@mui/material";
import useCalendar from "../useCalendar";
import {
  NextCalendarContentView,
  CalendarContentView,
} from "../../utils/constant";
import { getDecadeRange } from "../../utils/function";
import NextIcon from "../../assets/next-arrow.svg";
import PrevIcon from "../../assets/prev-arrow.svg";

const YearMonthPicker = forwardRef((_props, ref) => {
  const {
    setActiveDate,
    activeDate,
    currentContentView,
    setCurrentContentView,
  } = useCalendar();

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
      default:
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
      default:
        break;
    }
  };

  const handleClickPicker = () => {
    if (currentContentView !== CalendarContentView.YEAR) {
      setCurrentContentView(
        NextCalendarContentView[currentContentView] as CalendarContentView
      );
    }
  };

  return (
    <Box
      ref={ref}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={4}
      mb={1}
    >
      <IconButton onClick={handlePrev} size="small" data-testid="prev-button">
        <img src={PrevIcon} alt="prev-icon" width={16} height={16} />
      </IconButton>
      <Button
        fullWidth
        variant="text"
        onClick={handleClickPicker}
        sx={{ fontWeight: "bold", color: "grey.900" }}
        data-testid="picker"
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
      <IconButton onClick={handleNext} size="small" data-testid="next-button">
        <img src={NextIcon} alt="next-icon" width={16} height={16} />
      </IconButton>
    </Box>
  );
});

YearMonthPicker.displayName = "YearMonthPicker";

export default YearMonthPicker;
