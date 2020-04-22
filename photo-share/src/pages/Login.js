import React, { useCallback, useContext } from "react";
import app from "../base";
import { useHistory, Redirect } from "react-router-dom";
import { AuthContext } from "contexts/AuthContext";
import { Typography, TextField, Button, Grid, Box } from "@material-ui/core";
import MainLayout from "layouts/MainLayout";

const Login = () => {
  const history = useHistory();
  const { currentUser } = useContext(AuthContext);

  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <MainLayout>
      <Box my={3}>
        <Typography align="center" variant="h3">
          Sign in
        </Typography>
      </Box>
      <Grid container spacing={3} justify="center">
        <Grid item container xs={12} sm={6}>
          <form onSubmit={handleLogin}>
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
      </Grid>
    </MainLayout>
  );
};

export default Login;
