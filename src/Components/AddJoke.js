import React, { useState } from "react";
import axios from "axios";
import filter from "leo-profanity";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

export default ({ setAddedJokeId }) => {
  const [joke, setJoke] = useState("");
  const [answer, setAnswer] = useState("");
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
        })
        .then((result) => {
          console.log("res", result.data);
          setJoke("");
          setAnswer("");
          setAddedJokeId(result.data._id)
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
      <Card
        style={{
          maxWidth: "1000px",
          textAlign: "center",
          margin: "25px auto 25px auto",
        }}
      >
        <Typography variant='h5' style={{ margin: "25px auto 25px auto" }}>
          Add Joke
        </Typography>
        <CardContent style={{ margin: "25px auto 25px auto" }}>
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
          <Button
            style={{
              textAlign: "center",
              margin: "25px 0px 0px 0px",
            }}
            variant='contained'
            color='primary'
            onClick={(event) => {
              addJoke(event);
            }}
          >
            Add New Joke
          </Button>
        </CardContent>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={showSuccess}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity='success'>
          Successfully added joke!
        </MuiAlert>
      </Snackbar>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={showFail}
        onClose={handleClose}
      >
        <MuiAlert onClose={handleClose} severity='error'>
          Failed to add joke.
        </MuiAlert>
      </Snackbar>
    </>
  );
};