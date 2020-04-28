import React from "react";
import MainLayout from "layouts/MainLayout";
import { Typography } from "@material-ui/core";

const Home = () => {
  return (
    <MainLayout>
      <Typography variant="h3" align="center">
        Whatever your need to share
      </Typography>
      <Typography variant="h2" align="center">
        Here is its place
      </Typography>
    </MainLayout>
  );
};

export default Home;
