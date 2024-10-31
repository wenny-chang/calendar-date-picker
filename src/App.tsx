import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Calendar from "./Calendar/Calendar";
import DatePicker from "./DatePicker";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";

function App() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const theme = createTheme({
    palette: {
      secondary: grey,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" gap={12}>
        <Stack>
          <Typography>
            Selected Date: {selectedDate?.toLocaleDateString("zh-TW")}
          </Typography>
          <Calendar
            defaultDate=""
            firstDayOfWeek={3}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        </Stack>
        <DatePicker
          defaultValue={new Date()}
          firstDayOfWeek={3}
          closeOnSelect={true}
          onChange={(date) => console.log(date)}
        />
      </Box>
    </ThemeProvider>
  );
}

export default App;
