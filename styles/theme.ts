import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#8884d8",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#000000",
      paper: "#121212",
    },
  },
  overrides: {
    MuiListItemIcon: {
      root: {
        color: "inherit",
        marginRight: 0,
        "& svg": {
          fontSize: 20,
        },
        minWidth: 36,
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: 500,
      },
    },
    MuiListItemAvatar: {
      root: {
        minWidth: 48,
      },
    },
    MuiListItem: {
      root: {
        "&$selected": {
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
