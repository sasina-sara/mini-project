import React from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Box,
  Link,
} from "@material-ui/core";
import useStyles from "./style";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const MainLayout = ({ children }) => {
  const classes = useStyles();

  const history = useHistory();

  const { user } = useFirebaseAuth();

  const handleLogout = (event) => {
    firebase.auth().signOut();
  };

  const handleGoToSignIn = (event) => {
    history.push("/login");
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Photo Share
          </Typography>
          {user && (
            <Button color="inherit" variant="text" href="/overview">
              Overview
            </Button>
          )}
          {user && (
            <Button color="inherit" variant="text" href="/dashboard">
              Dashboard
            </Button>
          )}
          {user && (
            <Button color="inherit" variant="text" href="/add-photo">
              Add Photo
            </Button>
          )}
          {!user && (
            <Button color="inherit" variant="text" href="/signup">
              Sign Up
            </Button>
          )}
          {user ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleGoToSignIn}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Container style={{ minHeight: "100vh" }}>
        <Box py={3}>{children}</Box>
      </Container>
      <Box style={{ backgroundColor: "#556cd6", color: "#fff" }} p={3}>
        <Typography variant="subtitle1" align="center">
          2020 &copy; Photo-Share by{" "}
          <Link href="https://github.com/sasina-sara" color="inherit">
            sasina-sara
          </Link>
        </Typography>
      </Box>
    </>
  );
};

export default MainLayout;
