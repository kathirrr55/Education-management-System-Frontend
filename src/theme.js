import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue theme
    },
    secondary: {
      main: "#f50057", // Pink accent
    },
    background: {
      default: "#f4f6f8", // Light background
    },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none", // Disable uppercase
    },
  },
});

export default theme;
