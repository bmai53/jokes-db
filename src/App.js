import React from 'react';
import { Switch, Route } from "react-router-dom"
import Joke from './Components/Joke'
import AddJoke from './Components/AddJoke';
import GithubCorner from 'react-github-corner';
import Typography from "@material-ui/core/Typography";

function App() {
  return (
    <>
      <GithubCorner
        href='https://github.com/bmai53/jokes-db'
        direction='left'
        octoColor='#151513'
        bannerColor='white'
      />
      <Typography align='center' variant='h1' style={{color: 'white', margin: '75px auto'}}>jokesDB</Typography>

      <Switch>
        <Route exact path='/' render={() => <Joke />} />
        <Route
          path='/:id'
          render={(props) => <Joke jokeId={props.match.params.id} />}
        />
      </Switch>
      <AddJoke />
    </>
  );
}

export default App;
