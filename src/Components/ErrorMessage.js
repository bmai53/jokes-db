import React from "react";
import Typography from "@material-ui/core/Typography";
import css from "@styles";

export default ({ isDirectUrl }) => (
  <>
    <Typography variant='h5' style={css.jokeText}>
      No laughs for now, joke not found.
    </Typography>
    <Typography style={css.jokeText}>
      (Error: {isDirectUrl ? "Invalid URL" : "No connection to database"})
    </Typography>
  </>
);
