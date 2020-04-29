import React from "react";
import MainLayout from "layouts/MainLayout";
import { Typography, Grid, IconButton, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const Home = () => {
  const history = useHistory();

  const handleClick = (event) => {
    history.push("/login");
  };
  return (
    <MainLayout>
      <Box mb={3}>
        <Typography variant="h3" align="center">
          Whatever your need to share
        </Typography>
        <Typography variant="h2" align="center">
          Here is its place
        </Typography>
      </Box>
      <Grid container spacing={3} justify="center">
        <Grid item container justify="center" xs={12} sm={6} lg={4}>
          <IconButton onClick={handleClick} style={{ width: "100%" }}>
            <img
              src={require("../images/camera.png")}
              style={{ maxWidth: "100%" }}
            />
          </IconButton>
        </Grid>
      </Grid>
    </MainLayout>
  );
};

export default Home;
