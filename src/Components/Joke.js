import React, { useEffect, useState } from "react";
import axios from "axios";
import copy from "copy-text-to-clipboard";

import JokeButtons from "./JokeButtons";
import ErrorMessage from "./ErrorMessage";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";

export default ({ jokeId }) => {
  const [joke, setJoke] = useState({});
  const [likes, setLikes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const getJoke = (jokeId) => {
    const resource = jokeId ? jokeId : "random";
    setLoading(true);
    axios
      .get(process.env.REACT_APP_BACKEND_API + resource)
      .then((result) => {
        setJoke(result.data);
        setLikes(result.data.likes ? result.data.likes : 0);
        setError(false);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  };

  const likeJoke = () => {
    axios
      .post(process.env.REACT_APP_BACKEND_API + `like/${joke._id}`)
      .then(setLikes(likes + 1))
      .catch((err) => {
        console.log(err);
      });
  };

  const shareJoke = () => {
    copy(window.location.href.split("/#/")[0] + `/#/${joke._id}`);
    setShowSnackbar(true);
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };

  useEffect(() => {
    jokeId ? getJoke(jokeId) : getJoke();
  }, [jokeId]);

  if (loading) {
    return (
      <Card
        style={{
          maxWidth: "1000px",
          minHeight: "300px",
          textAlign: "center",
          margin: "25px auto 25px auto",
        }}
      >
        <CardContent>
          <CircularProgress size={100} style={{padding: '75px 0'}}/>
        </CardContent>
      </Card>
    );
  }

  // console.log(joke);

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
          {error ? (
            <ErrorMessage isDirectUrl={!!jokeId} />
          ) : (
            <>
              <Typography
                variant='h5'
                style={{ fontWeight: "bold", margin: "25px" }}
              >
                {joke.joke}
              </Typography>
              <Typography variant='h5' style={{ margin: "25px" }}>
                {joke.answer ? joke.answer : ""}
              </Typography>
            </>
          )}

          <Button
            style={{
              textAlign: "center",
              margin: "25px 25px",
              width: "300px",
              height: "50px",
            }}
            variant='contained'
            color='primary'
            onClick={() => {
              getJoke();
            }}
          >
            Get Random Joke
          </Button>
          <div>
            {!error && (
              <JokeButtons
                likes={likes}
                shareJoke={shareJoke}
                likeJoke={likeJoke}
              />
            )}
          </div>
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
