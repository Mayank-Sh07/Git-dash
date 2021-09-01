// React and Next
import React from "react";
// Material-UI
import {
  makeStyles,
  createStyles,
  Theme,
  withStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Loading from "@/components/Loader";
// Icons
import CommitsIcon from "@material-ui/icons/TrendingUpRounded";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      textAlign: "center",
      color: theme.palette.text.secondary,
      borderLeft: `2px solid ${theme.palette.primary.dark}`,
    },
    noOverflow: {
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: 240,
    },
    label: {
      fontWeight: 500,
      fontSize: "0.83rem",
    },
  })
);

interface Props {
  data: any;
}

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 6,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[900],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: theme.palette.primary.dark,
    },
  })
)(LinearProgress);

export default function TopFollowing({ data }: Props) {
  const classes = useStyles();
  // TODO: Add proper Loader
  if (!data) {
    return <Loading />;
  }
  return (
    <Paper className={classes.paper} elevation={8}>
      <Grid container>
        <Grid item container direction="column" xs={8}>
          <Grid item>
            <List dense>
              <ListItem className={classes.noOverflow}>
                <ListItemAvatar>
                  <Avatar src={data.avatarUrl} />
                </ListItemAvatar>
                <ListItemText
                  primary={data.name}
                  secondary={!!data.bio ? data.bio : "No bio provided"}
                  primaryTypographyProps={{ noWrap: true }}
                  secondaryTypographyProps={{ noWrap: true }}
                />
              </ListItem>
            </List>
          </Grid>
          <Grid item style={{ padding: "12px" }}>
            <BorderLinearProgress
              variant="determinate"
              value={(data.repositoriesContributedTo.totalCount % 100) * 10}
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
            <CommitsIcon fontSize="large" style={{ color: "green" }} />
          </Grid>
          <Grid item className={classes.label}>
            {data.repositories.totalCount + " repos"}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
