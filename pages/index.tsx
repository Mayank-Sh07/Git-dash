import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import useSWR from "swr";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

export default function SimplePaper() {
  const classes = useStyles();
  const query = `
  {
    viewer {
      login
      email
      projectsUrl
    }
  }
  
`;
  // const { data } = useSWR(["/api/github-v4", query]);
  return (
    <div>
      <h3>Index</h3>
    </div>
  );
}
