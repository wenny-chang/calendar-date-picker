import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useCallback } from "react";
// import useCalendar from "../useCalendar";

const style = {
  width: 40,
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 50,
};

const Day = forwardRef(({ date, ...rest }, ref) => {
//   const calendarContext = useCalendar();
//   const { formatDate } = { ...calendarContext };

  const handleClick = useCallback((e) => {
    console.log(e.target.value);
    // setActiveDate(date);
    // onChange(date);
  }, []);

  return (
    <Box
      ref={ref}
      //   backgroundColor={selected ? "#db3d44" : "transparent"}
      //   color={selected ? "white" : "black"}
      sx={{
        ...style,
        "&:hover": { backgroundColor: "#db3d44", color: "white" },
      }}
      onClick={handleClick}
      {...rest}
    >
      {date}
    </Box>
  );
});

Day.displayName = "Day";
Day.propTypes = {
  date: PropTypes.number,
};
export default Day;
