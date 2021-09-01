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
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
// Custom Components
import ContributionsView from "@/components/analytics/ContributionsView";
import RadarChart from "@/components/analytics/RadarChart";
import FileTable from "@/components/analytics/FileTable";
import Loading from "@/components/Loader";
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
      border: `1px solid ${theme.palette.primary.main}`,
    },
    chartTitle: {
      marginTop: theme.spacing(2),
    },
  })
);

function Analytics() {
  const classes = useStyles();
  const data: any = useStore().getState();
  const Repositories = data.user.repositories?.nodes?.map((node) => ({
    value: node.name,
    label: node.name,
  }));
  const [repo, setRepo] = React.useState(Repositories[0].value);

  const handleRepoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRepo(event.target.value);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ContributionsView />
        </Grid>
        <Grid item xs={12} md={7}>
          <Paper>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
            >
              <Typography variant="subtitle2">REPOSITORY FILES</Typography>
              <TextField
                select
                label="Repository"
                value={repo}
                variant="outlined"
                size="small"
                onChange={handleRepoChange}
              >
                {Repositories.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <FileTable repo={repo} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper className={classes.chartContainer}>
            <Typography
              variant="subtitle2"
              align="center"
              className={classes.chartTitle}
            >
              GITHUB REPOSITORY PULL REQUESTS
            </Typography>
            <RadarChart />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

// Adding Layout
Analytics.layout = Layout;
export default Analytics;

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
