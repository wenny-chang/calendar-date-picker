import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Calendar from "./Calendar/Calendar";
import DatePicker from "./DatePicker";
import { Box } from "@mui/material";

function App() {
  const theme = createTheme({
    palette: {
      secondary: grey,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" gap={12}>
        <Calendar />
        <DatePicker />
      </Box>
    </ThemeProvider>
  );
}

export default App;
