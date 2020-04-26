import React, { useState, useEffect } from "react";
import MainLayout from "layouts/MainLayout";
import { TextField, Button, Grid, Box } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import useFirebaseAuth from "hooks/useFirebaseAuth";

const AddPhoto = () => {
  const [files, setFiles] = useState([]);
  const [pictureName, setPictureName] = useState("");
  const [inspiration, setInspiration] = useState("");
  const [location, setLocation] = useState("");
  const [tag, setTag] = useState("");

  const { user } = useFirebaseAuth();

  useEffect(() => {
    console.log({ files });
  }, [files]);

  const handleUploadFiles = (event) => {
    // console.log({ currentUser: currentUser.uid });
    files.map((file, index) => {
      const storageRef = firebase.storage().ref();

      const metadata = {
        contentType: "image/jpeg",
      };

      const fileName = `${user.uid}_${new Date().toISOString()}_${index}`;

      console.log({ fileName });

      const uploadTask = storageRef
        .child("images/" + fileName)
        .put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }

          if (progress === 100) {
            // TODO: upload images data to Firestore
            const db = firebase.firestore();
            db.collection("images")
              .add({
                user_id: user.uid,
                name: pictureName,
                inspiration: inspiration,
                location: location,
                tag: tag,
                filename: fileName,
                upload_time: new Date().toISOString(),
              })
              .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch((error) => {
                console.error("Error adding document: ", error);
              });
          }
        },
        function (error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              console.log("User doesn't have permission to access the object");
              break;

            case "storage/canceled":
              console.log(" User canceled the upload");
              break;

            case "storage/unknown":
              console.log(
                "Unknown error occurred, inspect error.serverResponse"
              );
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log("File available at", downloadURL);
          });
        }
      );
    });
  };

  return (
    <MainLayout>
      <form>
        <Box mb={3}>
          <DropzoneArea
            onChange={(files) => {
              setFiles(files);
            }}
          />
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
              color="primary"
              onClick={handleUploadFiles}
              variant="contained"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </MainLayout>
  );
};

export default AddPhoto;
