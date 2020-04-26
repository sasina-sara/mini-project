import React, { useEffect } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from "react-router-dom";
import { Typography, TextField, Button, Grid, Box } from "@material-ui/core";
import MainLayout from "layouts/MainLayout";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const Login = () => {
  const { user } = useFirebaseAuth();
  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };

  const handleSignIn = (event) => {
    const { email, password } = event.target.elements;
    try {
      firebase.auth().signInWithEmailAndPassword(email.value, password.value);
      history.push("/dashboard");
    } catch (error) {
      alert(error);
    }
  };

  const handleSignInWithGoogle = (event) => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  useEffect(() => {
    if (user) {
      history.push(from);
    }
  }, [user, history, from]);

  return (
    <MainLayout>
      <Box my={3}>
        <Typography align="center" variant="h3">
          Sign in
        </Typography>
      </Box>
      <Grid container spacing={3} justify="center">
        <Grid item container xs={12} sm={6} justify="center">
          <form onSubmit={handleSignIn}>
            <Grid container spacing={3}>
              <Grid item container>
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  type="text"
                  variant="filled"
                />
              </Grid>
              <Grid item container>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  variant="filled"
                />
              </Grid>
              <Grid item container justify="center">
                <Button color="primary" type="submit" variant="contained">
                  Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item container xs={12} justify="center">
          <Button
            color="primary"
            onClick={handleSignInWithGoogle}
            variant="outlined"
          >
            G
          </Button>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Login;
