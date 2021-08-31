import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";

import CommitsIcon from "@material-ui/icons/TrendingUpRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    noOverflow: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: 220,
    },
  })
);

interface Props {
  data: any;
}

export default function FollowingUserCard({ data }: Props) {
  const classes = useStyles();
  if (!data) {
    return <h4>Loading</h4>;
  }
  return (
    <Grid item xs={4}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item container direction="column" xs={8}>
            <Grid item>
              <List dense>
                <ListItem className={classes.noOverflow}>
                  <ListItemAvatar>
                    <Avatar src={data.avatarUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Name"
                    secondary={!!data.bio ? data.bio : "No bio provided"}
                    primaryTypographyProps={{ noWrap: true }}
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item style={{ padding: "12px" }}>
              <LinearProgress
                variant="determinate"
                value={data.repositoriesContributedTo.totalCount % 100}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            xs={4}
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item>
              <CommitsIcon fontSize="large" />
            </Grid>
            <Grid item>{data.repositories.totalCount}</Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
