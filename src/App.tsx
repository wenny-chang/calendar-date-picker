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
      <Box display="flex" gap={12} width="100%" justifyContent="center">
        <Stack>
          <Typography variant="h4" color="success" mb={2}>
            Calendar
          </Typography>
          <Typography>
            Selected Date: {selectedDate?.toLocaleDateString("zh-TW")}
          </Typography>
          <Calendar
            defaultDate=""
            firstDayOfWeek={3}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        </Stack>
        <Stack>
          <Typography variant="h4" color="success" mb={2}>
            Date Picker
          </Typography>
          <DatePicker
            inputFormat="MM-dd-yyyy"
            defaultValue={new Date()}
            firstDayOfWeek={3}
            closeOnSelect={true}
            onChange={(date) => console.log(date)}
          />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}

export default App;
