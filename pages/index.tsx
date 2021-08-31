import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FollowingUserStats from "../components/IndexPage/FollowingUserStats";
import useSWR from "swr";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function CenteredGrid() {
  const classes = useStyles();
  const query = `
  {
    user(login: "Mayank-Sh07") {
      bio
      following(last: 3) {
        nodes {
          bio
          avatarUrl
          repositoriesContributedTo {
            totalCount
          }
          repositories(orderBy: {field: CREATED_AT, direction: ASC}) {
            totalCount
          }
        }
      }
    }
  }
`;
  const { data } = useSWR(["/api/github-v4", query]);

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {!!data &&
          data.user.following.nodes.map((user: any, indx: any) => (
            <FollowingUserStats data={user} key={indx} />
          ))}
        {/* next section */}
        <Grid item xs={8}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}>xs=12</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
