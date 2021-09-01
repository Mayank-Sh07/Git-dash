import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3700B3",
    },
    secondary: {
      main: "#5658dd",
    },
    error: {
      main: "#CF6679",
    },
    background: {
      default: "#151719",
      paper: "#000000",
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
