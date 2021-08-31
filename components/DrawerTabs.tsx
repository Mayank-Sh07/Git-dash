import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import Logo from "@material-ui/icons/SportsVolleyball";
import GithubIcon from "@material-ui/icons/GitHub";
import DashboardIcon from "@material-ui/icons/DashboardRounded";
import AnalyticsIcon from "@material-ui/icons/AssessmentRounded";
import ReportsIcon from "@material-ui/icons/AssignmentRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import SwapIcon from "@material-ui/icons/UnfoldMoreRounded";
import UserIcon from "@material-ui/icons/AccountCircleRounded";
import OptionsIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: "flex",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
      ...theme.mixins.toolbar,
    },
    logo: {
      fontWeight: 600,
      marginLeft: theme.spacing(1),
    },
    repoBox: {
      borderRadius: theme.spacing(1),
      margin: theme.spacing(2, 0),
      backgroundColor: theme.palette.grey[100],
    },
    label: {
      fontWeight: 600,
    },
    bottomContainer: { display: "flex", height: "100%" },
    bottomBox: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      alignSelf: "flex-end",
    },
    infoBox: {
      padding: theme.spacing(2),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.grey[100],
    },
  })
);

export default function ResponsiveDrawer() {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div>
        <div className={classes.toolbar}>
          <Logo fontSize="large" />
          <Typography variant="h5" className={classes.logo}>
            Git Dash
          </Typography>
        </div>
        <Divider variant="middle" />
        <List>
          <ListItem dense className={classes.repoBox}>
            <ListItemAvatar>
              <Avatar variant="rounded">
                <GithubIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Photos"
              secondary="Jan 9, 2014"
              primaryTypographyProps={{ className: classes.label }}
            />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="swap" size="small">
                <SwapIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
          {primaryNavs.map(({ label, index, icon }) => (
            <ListItem
              key={label}
              dense
              button
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              SHORTCUTS
            </ListSubheader>
          }
        >
          {secondaryNavs.map(({ label, index, icon }) => (
            <ListItem
              key={label}
              button
              dense
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          ))}
        </List>
      </div>
      <div className={classes.bottomContainer}>
        <div className={classes.bottomBox}>
          <Paper className={classes.infoBox} variant="outlined">
            <Typography>Whats new?</Typography>
            <Typography gutterBottom variant="caption">
              Description of all new feature for better performance....
            </Typography>
          </Paper>
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar variant="circular">
                  <UserIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="User name" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="options" size="small">
                  <OptionsIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </div>
      </div>
    </>
  );
}

const primaryNavs = [
  {
    label: "Dashboard",
    index: 0,
    icon: <DashboardIcon />,
  },
  {
    label: "Analytics",
    index: 1,
    icon: <AnalyticsIcon />,
  },
];

const secondaryNavs = [
  {
    label: "Reports",
    index: 2,
    icon: <ReportsIcon />,
  },
  {
    label: "Settings",
    index: 3,
    icon: <SettingsIcon />,
  },
];
