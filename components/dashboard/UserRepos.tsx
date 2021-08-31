// React and Next
import React from "react";
// Material-ui
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
// Icons
import LinkIcon from "@material-ui/icons/Launch";
import LabelImportant from "@material-ui/icons/LabelImportant";

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
  })
);

export default function UserRepos({ data }: any) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <LabelImportant style={{ marginTop: "4px" }} />
          </ListItemAvatar>
          <ListItemText primary={data.name} />
          <ListItemSecondaryAction>
            <a href={data.url} target="_blank">
              <LinkIcon className={classes.small} />
            </a>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );
}
