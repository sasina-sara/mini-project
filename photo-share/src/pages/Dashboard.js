import React from "react";
import MainLayout from "layouts/MainLayout";
import { Typography, Box } from "@material-ui/core";
import RecentImagesBoard from "components/RecentImagesBord";

const Dashboard = () => {
  return (
    <MainLayout>
      <Box mb={3}>
        <Typography variant="h6">Recently Images</Typography>
      </Box>
      <RecentImagesBoard />
    </MainLayout>
  );
};

export default Dashboard;
