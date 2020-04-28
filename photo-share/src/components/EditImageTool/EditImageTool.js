import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/firestore";

const EditImageTool = ({ data, onCancel }) => {
  const [pictureName, setPictureName] = useState(data.value.name);
  const [inspiration, setInspiration] = useState(data.value.inspiration);
  const [location, setLocation] = useState(data.value.location);
  const [tag, setTag] = useState(data.value.tag);

  const handleSaveChange = (event) => {
    const { originFilename, filename, id, ...neededValue } = data.value;
    console.log(data.value, { neededValue });
    firebase
      .firestore()
      .collection("images")
      .doc(data.value.id)
      .update({
        ...neededValue,
        name: pictureName,
        inspiration: inspiration,
        location: location,
        tag: tag,
        filename: originFilename,
      })
      .then((value) => {
        console.log("update item successfully");
        handleCancel();
      })
      .catch((error) => {
        console.error(error);
        window.alert("Error occurred on updating");
      });
  };

  const handleCancel = (event) => {
    if (onCancel && typeof onCancel === "function") {
      onCancel();
    }
  };
  return (
    <Box component={Paper} p={3}>
      <Box mb={3}>
        <Typography variant="h6">Edit Picture Info</Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Picture Name"
            name="pictureName"
            onChange={(event) => {
              setPictureName(event.target.value);
            }}
            type="text"
            value={pictureName}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Inspiration"
            name="inspiration"
            onChange={(event) => {
              setInspiration(event.target.value);
            }}
            type="text"
            value={inspiration}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            onChange={(event) => {
              setLocation(event.target.value);
            }}
            type="text"
            value={location}
            variant="filled"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Tag"
            name="tag"
            onChange={(event) => {
              setTag(event.target.value);
            }}
            type="text"
            value={tag}
            variant="filled"
          />
        </Grid>
        <Grid item container justify="center" xs={12}>
          <Button
            onClick={handleCancel}
            variant="contained"
            style={{ marginRight: "1rem" }}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={handleSaveChange}
            variant="contained"
          >
            Save Changes
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditImageTool;
