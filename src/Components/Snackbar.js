import React from "react";
import MuiSnackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default ({
  anchorOrigin = { vertical: "top", horizontal: "center" },
  autoHide = 3000,
  open,
  onClose,
  text,
  type = "success",
}) => (
  <MuiSnackbar
    anchorOrigin={anchorOrigin}
    autoHideDuration={autoHide}
    open={open}
    onClose={onClose}
  >
    <MuiAlert onClose={onClose} severity={type}>
      {text}
    </MuiAlert>
  </MuiSnackbar>
);
