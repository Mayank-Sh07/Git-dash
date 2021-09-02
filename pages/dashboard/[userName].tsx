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
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import Hidden from "@material-ui/core/Hidden";

// Custom Components
import TopFollowing from "@/components/dashboard/TopFollowing";
import UserRepos from "@/components/dashboard/UserRepos";
import ComponentPanel from "@/components/dashboard/ComponentPanel";
import RepoPRchart from "@/components/dashboard/RepoPRchart";
import PieChartJS from "@/components/dashboard/PieChart";
import PieChartLabel from "@/components/dashboard/PieChartLabel";
import Loading from "@/components/Loader";
// Layout Component
import Layout from "@/components/Layout";
// Icons
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(4),
      [theme.breakpoints.only("xs")]: {
        padding: theme.spacing(1),
      },
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary,
      height: "240px",
      padding: theme.spacing(3, 2),
    },
    headBar: {
      padding: theme.spacing(1, 2),
      backgroundColor: theme.palette.secondary.dark,
      fontWeight: 600,
      borderRadius: "4px",
    },
    repoBox: {
      maxHeight: 260,
      overflowY: "scroll",
      scrollbarWidth: "none", // Firefox
      "&::-webkit-scrollbar": {
        display: "none", // Safari + Chrome
      },
    },
    lineChartContainer: {
      height: "300px",
      padding: theme.spacing(1, 4, 1, 1),
    },
    pieChartContainer: {
      height: "240px",
      textAlign: "center",
      padding: theme.spacing(3, 2),
    },
    flex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    divider: {
      margin: "4px 4px 4px 24px",
    },
  })
);

function Dashboard() {
  const classes = useStyles();
  const data = useStore().getState();
  const [showGrid, setShowGrid] = React.useState(true);

  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrid(!showGrid);
  };

  if (!data) {
    return <Loading />;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {data.user.following.nodes.map((user: any, indx: any) => (
          <Grid item xs={12} md={4} key={indx}>
            <TopFollowing data={user} />
          </Grid>
        ))}
        <Grid item xs={12} md={8}>
          <Paper className={classes.lineChartContainer}>
            <div className={classes.flex}>
              <Hidden xsDown>
                <Typography variant="subtitle2" style={{ marginLeft: "30px" }}>
                  GITHUB REPOSITORY PULL REQUESTS
                </Typography>
              </Hidden>
              <div style={{ flexGrow: 1 }} />
              <div className={classes.flex}>
                <Chip
                  label="All Repositories"
                  size="small"
                  color="secondary"
                  variant="outlined"
                  style={{ marginRight: "12px" }}
                />
                <Tooltip title="toggle grid">
                  <Switch
                    checked={showGrid}
                    onChange={handleChange}
                    size="small"
                  />
                </Tooltip>
                <Tooltip title="user pull resuests per repo">
                  <IconButton size="small">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <Divider className={classes.divider} />
            <RepoPRchart data={data.user.repositories.nodes} show={showGrid} />
          </Paper>
        </Grid>
        {/* next section */}
        <Grid item xs={12} md={4}>
          <Paper>
            <Tooltip title="scrollable">
              <Typography className={classes.headBar}>
                Top Repositories
              </Typography>
            </Tooltip>
            <Paper className={classes.repoBox} variant="outlined">
              {data.user.repositories.nodes.map((repo: any) => (
                <UserRepos data={repo} key={repo.name} />
              ))}
            </Paper>
          </Paper>
        </Grid>
        {/* next section */}
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <ComponentPanel />
          </Paper>
        </Grid>
        {/* next section */}
        <Grid item xs={12} md={4}>
          <Paper className={classes.pieChartContainer}>
            <PieChartJS />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <PieChartLabel />
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
