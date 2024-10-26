import { Box } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

const Day = forwardRef(({ selected, children }, ref) => {
  return (
    <Box
      ref={ref}
      width={40}
      height={40}
      display="flex"
      alignItems="center"
      justifyContent="center"
      borderRadius={100}
      backgroundColor={selected ? "#db3d44" : "transparent"}
      color={selected ? "white" : "black"}
      sx={{ "&:hover": { backgroundColor: "#db3d44", color: "white" } }}
    >
      {children}
    </Box>
  );
});

Day.displayName = "Day";

Day.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default Day;
