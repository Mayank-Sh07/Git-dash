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
      padding: theme.spacing(2),
    },
    semibold: {
      fontWeight: 500,
      marginTop: "8px",
    },
    button: {
      marginTop: theme.spacing(1.25),
    },
    avatar: {
      height: theme.spacing(6),
      width: theme.spacing(6),
      backgroundColor: "rgb(255, 187, 40)",
      marginBottom: theme.spacing(1),
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
        <Avatar className={classes.avatar} variant="circular">
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
          variant="contained"
          className={classes.button}
        >
          Add more
        </Button>
      </Grid>
    </Grid>
  );
}
