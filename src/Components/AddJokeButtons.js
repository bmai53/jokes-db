import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import fblogo from "../fblogo.png";

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
        style={{
          textAlign: "center",
          width: "300px",
          height: "50px",
          ...marginStyle,
        }}
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
            backgroundColor: "#3b5998",
            textAlign: 'center',
            width: "300px",
            height: "50px",
            ...marginStyle,
          }}
          variant='contained'
          color='primary'
          onClick={() => {
            fbLogin();
          }}
        >
          <img style={{ width: "30px", margin: '10px 10px 10px 0'}} src={fblogo} />
          <span>Connect with Facebook</span>
        </Button>
        <Typography style={{ margin: "24px" }}>
          Log into Facebook to add new jokes to the database!
        </Typography>
      </>
    );
  }
};
