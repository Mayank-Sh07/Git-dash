// React and Next
import React from "react";
// Material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
// Icons
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 380,
      maxHeight: 38,
    },
    small: {
      fontSize: "18px",
      marginTop: "4px",
    },
    smallAvatar: {
      height: theme.spacing(3.5),
      width: theme.spacing(3.5),
    },
  })
);

export default function UserRepos({ data }: any) {
  const classes = useStyles();
  const colors = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#40E0D0",
    "#39FF14",
    "#faed27",
  ];
  return (
    <div className={classes.root}>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            {/* <LabelImportant style={{ marginTop: "4px" }} /> */}
            <Avatar
              className={classes.smallAvatar}
              src={"none"}
              alt={data.name}
              style={{ backgroundColor: colors[Math.floor(Math.random() * 5)] }}
            />
          </ListItemAvatar>
          <ListItemText primary={data.name} />
          <ListItemSecondaryAction>
            <a href={data.url} target="_blank" rel="noreferrer">
              <Chip
                variant="outlined"
                size="small"
                avatar={<LinkIcon />}
                label="open"
              />
            </a>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
