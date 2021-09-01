// React and Next
import React from "react";
import { GetServerSideProps } from "next";
// GraphQL and Redux
import { analyticsQuery } from "@/redux/queries";
import { initializeStore } from "@/redux/store";
import { useStore } from "react-redux";
// Material-ui
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
// import Typography from "@material-ui/core/Typography";
// Custom Components
import ContributionsView from "@/components/analytics/ContributionsView";
import RadarChart from "@/components/analytics/RadarChart";
import FileTable from "@/components/analytics/FileTable";
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
    chartContainer: {
      height: "300px",
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
        <Grid item xs={12}>
          <ContributionsView />
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper>
            <FileTable />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper className={classes.chartContainer}>
            <RadarChart />
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
  const query = analyticsQuery(String(userName));

  // initialize redux-store on server
  const reduxStore = initializeStore({ userName, PAT });
  const { dispatch } = reduxStore;

  // Fetch data from /api/github-v4 endpoint
  const res = await fetch("https://git-dash.vercel.app/api/github-v4", {
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
