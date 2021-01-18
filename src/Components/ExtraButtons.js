import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

export default ({ likes, likeJoke, shareJoke }) => {
  const buttonStyle = {
    width: "150px",
  };
  return (
    <ButtonGroup variant='text' color='primary'>
      <Button
        style={{ fontSize: "24px", ...buttonStyle }}
        onClick={() => {
          likeJoke();
        }}
      >
        👍 ({likes})
      </Button>
      <Button
        style={buttonStyle}
        onClick={() => {
          shareJoke();
        }}
      >
        Share
      </Button>
    </ButtonGroup>
  );
};
