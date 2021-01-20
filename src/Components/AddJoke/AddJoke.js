import React, { useState } from "react";
import axios from "axios";
import filter from "leo-profanity";
import AddJokeButtons from "./AddJokeButtons";
import Snackbar from "../Snackbar";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import css from "@styles";

export default ({ setAddedJokeId }) => {
  const [joke, setJoke] = useState("");
  const [answer, setAnswer] = useState("");
  const [userId, setUserId] = useState("");

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const addJoke = (event) => {
    event.preventDefault();
    if (filter.check(joke) || filter.check(answer)) {
      setShowFail(true);
    } else {
      axios
        .post(process.env.REACT_APP_BACKEND_API + "add", {
          joke: joke,
          answer: answer,
          userId: userId,
        })
        .then((result) => {
          console.log("added!", result.data);
          setJoke("");
          setAnswer("");
          setAddedJokeId(result.data._id);
          setShowSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setShowFail(true);
        });
    }
  };

  const handleClose = () => {
    setShowSuccess(false);
    setShowFail(false);
  };

  return (
    <>
      <Card style={css.card}>
        <Typography variant='h5' style={css.jokeText}>
          Add Joke
        </Typography>
        <CardContent style={css.card}>
          <TextField
            fullWidth
            label='Question'
            required
            type='text'
            value={joke}
            onChange={(e) => {
              setJoke(e.target.value);
            }}
            variant='outlined'
            style={{
              marginBottom: "25px",
            }}
          />
          <TextField
            fullWidth
            label='Answer'
            type='text'
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
            }}
            variant='outlined'
          />
          <AddJokeButtons addJoke={addJoke} setUserId={setUserId} />
        </CardContent>
      </Card>
      <Snackbar
        open={showSuccess}
        onClose={handleClose}
        text='Successfully added joke!'
      />
      <Snackbar
        open={showFail}
        onClose={handleClose}
        text='Failed to add joke.'
        type='error'
      />
    </>
  );
};
