import React from "react";
import { GetServerSideProps } from "next";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import FollowingUserStats from "../components/IndexPage/FollowingUserStats";
import { indexGQL } from "../redux/composeQuery";
import { initializeStore } from "../redux/store";
import { useStore } from "react-redux";

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
  const data = useStore().getState();

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const reduxStore = initializeStore({});
  const { dispatch } = reduxStore;
  const query = indexGQL("Mayank-Sh07");
  const res = await fetch("http://localhost:3000/api/github-v4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });
  let data = {};
  if (res.ok) {
    data = await res.json();
    dispatch({ type: "SET_INDEX_DATA", payload: data });
  }
  return {
    props: { initialReduxState: reduxStore.getState() },
  };
};
