import React, { useContext } from "react";
import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@material-ui/core";
import app from "../../base";
import { AuthContext } from "contexts/AuthContext";
import useStyles from "./style";
import { useHistory } from "react-router-dom";

const MainLayout = ({ children }) => {
  const classes = useStyles();

  const history = useHistory();

  const { currentUser } = useContext(AuthContext);

  const handleLogout = (event) => {
    app.auth().signOut();
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
          {currentUser ? (
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
      <Container>
        <Box py={3}>{children}</Box>
      </Container>
    </>
  );
};

export default MainLayout;
