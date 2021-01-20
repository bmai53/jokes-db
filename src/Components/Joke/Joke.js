import React, { useEffect, useState } from "react";
import axios from "axios";
import copy from "copy-text-to-clipboard";

import JokeButtons from "./JokeButtons";
import ErrorMessage from "../ErrorMessage";
import SnackBar from "../Snackbar";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import css from "@styles";

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
      <Card style={css.card}>
        <CardContent>
          <CircularProgress size={100} style={css.loading} />
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card style={css.card}>
        <CardContent>
          {error ? (
            <ErrorMessage isDirectUrl={!!jokeId} />
          ) : (
            <>
              <Typography
                variant='h5'
                style={{ ...css.jokeText, fontWeight: "bold" }}
              >
                {joke.joke}
              </Typography>
              <Typography variant='h5' style={css.jokeText}>
                {joke.answer ? joke.answer : ""}
              </Typography>
            </>
          )}

          <Button
            style={css.button}
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
      <SnackBar
        open={showSnackbar}
        onClose={handleClose}
        text='Share link copied to clipboard!'
      />
    </>
  );
};
