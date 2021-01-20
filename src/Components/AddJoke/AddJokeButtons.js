import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import fblogo from "@images/fblogo.png";
import css from "@styles";

export default ({ addJoke, setUserId }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const marginStyle = { margin: "50px 0" };

  const statusCheckCallBack = (response) => {
    const { status, authResponse } = response;
    if (status === "connected") {
      console.log("fb connected", response);
      setUserId(authResponse.userID);
      setLoggedIn(true);
    }
  };
  const fbLogin = () => {
    FB.login((response) => {
      statusCheckCallBack(response);
    });
  };

  useEffect(() => {
    if (typeof FB !== "undefined") {
      FB.getLoginStatus((response) => {
        statusCheckCallBack(response);
      });
    }
  }, []);

  if (loggedIn) {
    return (
      <Button
        style={{ ...css.button, ...marginStyle }}
        variant='contained'
        color='primary'
        onClick={(event) => {
          addJoke(event);
        }}
      >
        Add New Joke
      </Button>
    );
  } else {
    return (
      <>
        <Button
          style={{
            ...css.button,
            ...marginStyle,
            backgroundColor: "#3b5998",
            color: "#fff",
          }}
          variant='contained'
          onClick={() => {
            fbLogin();
          }}
        >
          <img style={css.fblogo} src={fblogo} />
          <span>Connect with Facebook</span>
        </Button>
        <Typography>
          Log into Facebook to add new jokes to the database!
        </Typography>
      </>
    );
  }
};
