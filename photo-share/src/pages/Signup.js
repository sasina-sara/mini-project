import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import app from "../base";
import { Typography, TextField, Button, Grid, Box } from "@material-ui/core";
import MainLayout from "layouts/MainLayout";

const Signup = () => {
  const history = useHistory();

  const handleSignUp = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password, confirmPassword } = event.target.elements;
      if (password.value === confirmPassword.value) {
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
          history.push("/");
        } catch (error) {
          alert(error);
        }
      }
    },
    [history]
  );

  return (
    <MainLayout>
      <Box my={3}>
        <Typography align="center" variant="h3">
          Sign up
        </Typography>
      </Box>
      <Grid container spacing={3} justify="center">
        <Grid item container xs={12} sm={6}>
          <form onSubmit={handleSignUp}>
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
              <Grid item container>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="filled"
                />
              </Grid>
              <Grid item container justify="center">
                <Button color="primary" type="submit" variant="contained">
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Signup;
