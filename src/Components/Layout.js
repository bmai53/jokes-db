import React, { useState } from "react";
import GithubCorner from "react-github-corner";
import Typography from "@material-ui/core/Typography";

import Joke from "./Joke";
import AddJoke from "./AddJoke";

export default ({ directLinkId }) => {
  const [addedJokeId, setAddedJokeId] = useState(null);

  return (
    <>
      <GithubCorner
        href='https://github.com/bmai53/jokes-db'
        direction='left'
        octoColor='#151513'
        bannerColor='white'
      />
      <Typography
        align='center'
        variant='h1'
        style={{ color: "white", margin: "75px auto", textDecoration: "none" }}
      >
        <a
          style={{ color: "inherit", textDecoration: "inherit" }}
          href={`${window.location.href.split("/#/")[0]}/#/`}
        >
          jokesDB
        </a>
      </Typography>
      <Joke jokeId={addedJokeId ? addedJokeId : directLinkId} />
      <AddJoke setAddedJokeId={setAddedJokeId} />
    </>
  );
};
