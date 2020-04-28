import React from "react";
import OwnImageSBoard from "components/OwnImagesBoard";
import MainLayout from "layouts/MainLayout";
import { Typography, Box } from "@material-ui/core";

const Dashboard = () => {
  return (
    <MainLayout>
      <Box mb={3}>
        <Typography variant="h5">Own Images</Typography>
      </Box>
      <OwnImageSBoard />
    </MainLayout>
  );
};

export default Dashboard;
