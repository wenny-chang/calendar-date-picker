import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
import Calendar from "./Calendar/Calendar";

function App() {
  const theme = createTheme({
    palette: {
      secondary: grey,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Calendar />
    </ThemeProvider>
  );
}

export default App;
