import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
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
