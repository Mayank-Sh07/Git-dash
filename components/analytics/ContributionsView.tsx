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
// Cstom Component
import ContributionsChart from "./ContributionsChart";

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
      height: "360px",
    },
    total: {
      padding: theme.spacing(1, 2),
      paddingBottom: "0px",
      margin: theme.spacing(1),
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
      <ContributionsChart filter={{ type: ftype, value: fval }} />
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
