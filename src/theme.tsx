import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: { black: "rgba(0, 0, 0, 1)", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      main: "#4a90e2",
      contrastText: "#fff",
    },
    secondary: {
      main: "#343434",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f44336",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

export default theme;
