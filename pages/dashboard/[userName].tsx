// React and Next
import React from "react";
import { GetServerSideProps } from "next";
// GraphQL and Redux
import { dashboardQuery } from "@/redux/queries";
import { initializeStore } from "@/redux/store";
import { useStore } from "react-redux";
// Material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Custom Components
import TopFollowing from "@/components/dashboard/TopFollowing";
import UserRepos from "@/components/dashboard/UserRepos";
import ComponentPanel from "@/components/dashboard/ComponentPanel";
import RepoPRchart from "@/components/dashboard/RepoPRchart";
import PieChartJS from "@/components/dashboard/PieChart";
import PieChartLabel from "@/components/dashboard/PieChartLabel";
// Layout Component
import Layout from "@/components/Layout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
    headBar: {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.grey[900],
      fontWeight: 600,
    },
    repoBox: {
      maxHeight: 160,
      overflowY: "scroll",
      scrollbarWidth: "none", // Firefox
      "&::-webkit-scrollbar": {
        display: "none", // Safari + Chrome
      },
    },
    lineChartContainer: {
      height: "200px",
    },
    pieChartContainer: {
      height: "160px",
      textAlign: "center",
      padding: theme.spacing(1),
    },
  })
);

function Dashboard() {
  const classes = useStyles();
  const data = useStore().getState();

  if (!data) {
    return <h3>Loading</h3>;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.user.following.nodes.map((user: any, indx: any) => (
          <Grid item xs={12} md={4} key={indx}>
            <TopFollowing data={user} />
          </Grid>
        ))}
        {/* next section */}
        <Grid item xs={12} md={8}>
          <Paper className={classes.lineChartContainer}>
            <RepoPRchart data={data.user.repositories.nodes} />
          </Paper>
        </Grid>
        {/* next section */}
        <Grid item xs={6} md={4}>
          <Paper>
            <Typography className={classes.headBar}>
              Top Repositories
            </Typography>
            <Paper className={classes.repoBox} variant="outlined">
              {data.user.repositories.nodes.map((repo: any) => (
                <UserRepos data={repo} key={repo.name} />
              ))}
            </Paper>
          </Paper>
        </Grid>
        {/* next section */}
        <Grid item xs={6} md={4}>
          <Paper className={classes.paper}>
            <ComponentPanel />
          </Paper>
        </Grid>
        {/* next section */}
        <Grid item xs={6} md={4}>
          <Paper className={classes.paper}>
            <PieChartLabel />
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper className={classes.pieChartContainer}>
            <PieChartJS />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

// Adding Dashboard Layout
Dashboard.layout = Layout;
export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Prepare GQL query
  const { userName, PAT } = context.query;
  const query = dashboardQuery(String(userName));

  // initialize redux-store on server
  const reduxStore = initializeStore({ userName, PAT });
  const { dispatch } = reduxStore;

  // Fetch data from /api/github-v4 endpoint
  const res = await fetch("http://localhost:3000/api/github-v4", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, userName, PAT }),
  });
  if (res.ok) {
    const data = await res.json();
    // dispatch action to set the response data on the store
    dispatch({ type: "SET_DATA", payload: data });
  }

  return {
    // Propogate server store data to cilent store
    props: {
      initialReduxState: reduxStore.getState(),
    },
  };
};
