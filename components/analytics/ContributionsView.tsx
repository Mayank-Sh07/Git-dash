// React and Next
import React from "react";
// Redux for state
import { useSelector } from "react-redux";
// Material-ui
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
// Custom Component
import ContributionsChart from "./ContributionsChart";
// Icon
import HelpIcon from "@material-ui/icons/Help";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& .MuiTextField-root": {
        margin: theme.spacing(1.5),
        marginRight: theme.spacing(4),
        width: "25ch",
      },
    },
    container: {
      height: "400px",
      borderBottom: `2px solid ${theme.palette.primary.dark}`,
    },
    total: {
      padding: theme.spacing(1, 2),
      paddingBottom: "0px",
      margin: theme.spacing(1),
    },
    flex: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    padded: {
      padding: theme.spacing(1, 2, 0),
    },
  })
);

type FTYPE = "yearly" | "monthly";

export default function MultilineTextFields() {
  const classes = useStyles();
  const totalContibutions = useSelector(
    (state: any) =>
      state.user.contributionsCollection.contributionCalendar.totalContributions
  );
  const [ftype, setFilterType] = React.useState<FTYPE>("yearly");
  const [fval, setFilterValue] = React.useState(2020);
  const [showGrid, setShowGrid] = React.useState(true);

  const handleChange = (_event: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrid(!showGrid);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value === "yearly" ? setFilterValue(2020) : setFilterValue(8);
    // @ts-expect-error
    setFilterType(event.target.value);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterValue(Number(event.target.value));
  };

  return (
    <Paper className={classes.container}>
      <div className={classes.padded}>
        <div className={classes.flex}>
          <Typography variant="subtitle2">
            GITHUB REPOSITORY PULL REQUESTS
          </Typography>
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
              <Switch checked={showGrid} onChange={handleChange} size="small" />
            </Tooltip>
            <Tooltip title="user pull resuests per repo">
              <IconButton size="small">
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className={classes.root}>
          <div>
            <TextField
              select
              label="Filter By"
              value={ftype}
              variant="outlined"
              size="small"
              onChange={handleTypeChange}
            >
              {FilterTypes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              select
              label="Filter Value"
              value={fval}
              variant="outlined"
              size="small"
              onChange={handleValueChange}
            >
              {ftype === "yearly"
                ? years.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))
                : months.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
            </TextField>
          </div>
          <div style={{ flexGrow: 1 }} />
          <Paper variant="outlined" className={classes.total}>
            <Typography variant="button">
              {"total contributions: " + totalContibutions}
            </Typography>
          </Paper>
        </div>
      </div>
      <ContributionsChart
        filter={{ type: ftype, value: fval }}
        show={showGrid}
      />
    </Paper>
  );
}

const years = [
  {
    value: 2020,
    label: "2020",
  },
  {
    value: 2021,
    label: "2021",
  },
];

const months = [
  {
    value: 0,
    label: "January",
  },
  {
    value: 1,
    label: "February",
  },
  {
    value: 2,
    label: "March",
  },
  {
    value: 3,
    label: "April",
  },
  {
    value: 4,
    label: "May",
  },
  {
    value: 5,
    label: "June",
  },
  {
    value: 6,
    label: "July",
  },
  {
    value: 7,
    label: "August",
  },
  {
    value: 8,
    label: "September",
  },
  {
    value: 9,
    label: "October",
  },
  {
    value: 10,
    label: "November",
  },
  {
    value: 11,
    label: "December",
  },
];

const FilterTypes = [
  {
    value: "yearly",
    label: "Year",
  },
  {
    value: "monthly",
    label: "Month",
  },
];
