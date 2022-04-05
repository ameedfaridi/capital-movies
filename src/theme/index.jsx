import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "rgba(115,128,141)",
      withOpacity: (opacity) => `rgb(115,128,141,${opacity})`,
    },
    secondary: {
      main: "rgba(216,30,38)",
      withOpacity: (opacity) => `rgba(216,30,38,${opacity})`,
    },
    error: {
      main: red.A400,
    },
    title:{
      main:"rgba(62,79,92)"
    }
  },
});

export default theme;
