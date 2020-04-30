import React from "react";
import { Button, Menu, MenuItem, IconButton } from "@material-ui/core";
import useFirebaseAuth from "hooks/useFirebaseAuth";
import { useHistory } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/auth";
import MenuIcon from "@material-ui/icons/Menu";

const MenuMobile = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const { user } = useFirebaseAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = (event) => {
    handleClose();
    firebase.auth().signOut();
  };

  const handleGoToSignIn = (event) => {
    handleClose();
    history.push("/login");
  };

  return (
    <div>
      {/* <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Open Menu
      </Button> */}
      <IconButton
        aria-controls="simple-menu"
        aria-hashpopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={(event) => {
            history.push("/");
          }}
        >
          Home
        </MenuItem>
        {user && (
          <>
            <MenuItem
              onClick={(event) => {
                history.push("/overview");
              }}
            >
              Overview
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                history.push("/dashboard");
              }}
            >
              Dashboard
            </MenuItem>
            <MenuItem
              onClick={(event) => {
                history.push("/add-photo");
              }}
            >
              Add Photo
            </MenuItem>
          </>
        )}
        {!user && (
          <MenuItem
            onClick={(event) => {
              history.push("/signup");
            }}
          >
            Sign Up
          </MenuItem>
        )}
        {user ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem onClick={handleGoToSignIn}>Login</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default MenuMobile;
