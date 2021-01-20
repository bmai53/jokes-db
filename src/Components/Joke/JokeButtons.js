import React from "react";

import likeIcon from "@images/like.png";
import shareIcon from "@images/share.png";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import css from "@styles";

export default ({ likes, likeJoke, shareJoke }) => {
  return (
    <div style={css.jokeButtons}>
      <Typography>Likes: {likes}</Typography>
      <button
        style={css.iconButton}
        onClick={() => {
          likeJoke();
        }}
      >
        <img src={likeIcon} alt='like' style={css.icon} />
      </button>
      <button
        style={css.iconButton}
        onClick={() => {
          shareJoke();
        }}
      >
        <img src={shareIcon} alt='share' style={css.icon} />
      </button>
    </div>
  );
};
