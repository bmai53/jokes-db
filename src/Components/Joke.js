import React, { useEffect, useState } from "react";
import axios from "axios";
import copy from "copy-text-to-clipboard";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";

export default ({ jokeId }) => {
  const [joke, setJoke] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const getJoke = (jokeId) => {
    const resource = jokeId ? jokeId : "random";
    setLoading(true);
    axios
      .get(process.env.REACT_APP_BACKEND_API + resource)
      .then((result) => {
        setJoke(result.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const shareJoke = () => {
    copy(window.location.origin + '/#/' + joke._id);
    setShowSnackbar(true);
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };

  useEffect(() => {
    jokeId ? getJoke(jokeId) : getJoke();
  }, []);

  if (loading) {
    return (
      <Card
        style={{
          maxWidth: "1000px",
          textAlign: "center",
          margin: "25px auto 25px auto",
        }}
      >
        <CardContent>
          <CircularProgress size={100} />
        </CardContent>
      </Card>
    );
  }

  console.log(joke);
  return (
    <>
      <Card
        style={{
          maxWidth: "1000px",
          textAlign: "center",
          margin: "25px auto 25px auto",
        }}
      >
        <CardContent>
          <Typography
            variant='h5'
            style={{ fontWeight: "bold", margin: "25px" }}
          >
            {joke.joke}
          </Typography>
          <Typography variant='h5'>{joke.answer ? joke.answer : ""}</Typography>
          <Button
            style={{
              textAlign: "center",
              margin: "25px 25px",
              width: "125px",
            }}
            variant='contained'
            color='primary'
            onClick={() => {
              getJoke();
            }}
          >
            New Joke
          </Button>

          <Button
            style={{
              textAlign: "center",
              margin: "25px 25px",
              width: "125px",
            }}
            variant='contained'
            color='primary'
            onClick={() => {
              shareJoke();
            }}
          >
            Share
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={showSnackbar}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity='success'>
          Share link copied to clipboard!
        </MuiAlert>
      </Snackbar>
    </>
  );
};
