// React
import React from "react";
// Material UI
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// Icons
import LabelIcon from "@material-ui/icons/Label";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  })
);

export default function NestedList() {
  const classes = useStyles();

  return (
    <List
      dense
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div">PIE CHART LEGEND</ListSubheader>
      }
      className={classes.root}
    >
      <ListItem button>
        <ListItemIcon>
          <LabelIcon style={{ color: "#0088FE" }} />
        </ListItemIcon>
        <ListItemText primary="Repositories Owned" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <LabelIcon style={{ color: "#00C49F" }} />
        </ListItemIcon>
        <ListItemText primary="Repositories Contributed" />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LabelIcon style={{ color: "#FFBB28" }} />
        </ListItemIcon>
        <ListItemText primary="Total Pull Requests" />
      </ListItem>
    </List>
  );
}
