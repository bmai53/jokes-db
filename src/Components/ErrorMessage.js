import React from "react";
import Typography from "@material-ui/core/Typography";

export default ({ isDirectUrl }) => (
  <>
    <Typography>No laughs for now, joke not found.</Typography>
    <Typography>(Error: {isDirectUrl ? 'Invalid URL' : 'No connection to database'})</Typography>
  </>
);
