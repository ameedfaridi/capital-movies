import { makeStyles } from "@material-ui/core";
import React from "react";

export const usePostersContainerStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    padding: theme.spacing(2, 4),
  },
  childContainer: {
    display: "flex",
    width: "100%",
    overflowY: "auto",
  },
}));

export default function PosterContainer({ children }) {
  const classes = usePostersContainerStyles();

  return (
    <div className={classes.root}>
      <div className={classes.childContainer}>{children}</div>
    </div>
  );
}
