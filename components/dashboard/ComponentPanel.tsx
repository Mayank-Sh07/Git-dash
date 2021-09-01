// React and Next
import React from "react";
// Material-UI
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
// Icons
import StarsRounded from "@material-ui/icons/StarsRounded";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      height: "100%",
    },
    container: {
      padding: theme.spacing(2, 4),
    },
    semibold: {
      fontWeight: 500,
    },
    button: {
      marginTop: theme.spacing(1.25),
    },
  })
);

export default function TopFollowing() {
  const classes = useStyles();

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      direction="column"
      className={classes.container}
    >
      <Grid item>
        <Avatar>
          <StarsRounded />
        </Avatar>
      </Grid>
      <Grid item>
        <Typography variant="body2" className={classes.semibold}>
          Feature Rich
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="body2" gutterBottom>
          Lorem ipsum dolor sit amet dolor
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          variant="outlined"
          size="small"
          className={classes.button}
        >
          Add more
        </Button>
      </Grid>
    </Grid>
  );
}
