import { createTheme } from "@mui/material/styles";

// Définition du thème avec une palette interactive et fluide
const theme = createTheme({
  palette: {
    primary: {
      main: "#1c3e84", 
      contrastText: "#fff",
    },
    secondary: {
      main: "#1b1d25", 
      contrastText: "#fff",
    },
    background: {
      default: "#F4F6F8", 
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
    button: {
      textTransform: "none", 
      fontWeight: "bold",
    },
  },
});

export default theme;
