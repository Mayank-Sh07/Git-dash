// React and Next
import React from "react";
// Redux
import { useSelector } from "react-redux";
// Material UI
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
  alpha,
} from "@material-ui/core/styles";
// Icons
import SearchIcon from "@material-ui/icons/Search";
import NotificationsRounded from "@material-ui/icons/NotificationsRounded";
import CalendarToday from "@material-ui/icons/CalendarToday";
// Custom Components
import DrawerTabs from "./DrawerTabs";

interface LayoutProps {
  children: React.ReactNode;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.up("md")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    flexCol: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    menuIcon: {
      margin: theme.spacing(0, 2),
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
      padding: theme.spacing(0, 2),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.04),
      "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.04),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    userGreet: {
      fontSize: "1.125rem",
      marginBottom: "-4px",
    },
    date: {
      color: theme.palette.secondary.dark,
      fontWeight: 600,
      display: "flex",
      alignItems: "center",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

export default function ResponsiveDrawer({ children }: LayoutProps) {
  const classes = useStyles();
  const theme = useTheme();
  const userFullName = useSelector((state: any) => state?.userName);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        // position="fixed"
        className={classes.appBar}
        color="inherit"
        elevation={1}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Hidden xsDown>
            <div className={classes.flexCol}>
              <Typography variant="h6" noWrap className={classes.userGreet}>
                {"Hello " + userFullName}
              </Typography>
              <Typography variant="caption" noWrap className={classes.date}>
                <CalendarToday
                  fontSize="inherit"
                  style={{ margin: "-1px 4px 0px 0px" }}
                />
                {new Date().toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </div>
          </Hidden>
          <Tooltip title="Presentation only">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          </Tooltip>
          <Tooltip title="Presentation only">
            <IconButton className={classes.menuIcon}>
              <NotificationsRounded />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <DrawerTabs />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <DrawerTabs />
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
