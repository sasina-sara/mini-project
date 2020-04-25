import React, { useState, useEffect, useContext } from "react";
import MainLayout from "layouts/MainLayout";
import { TextField, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

const AddPhoto = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    console.log({ files });
  }, [files]);

  // const handleUploadFiles = (event) => {
  //   // console.log({ currentUser: currentUser.uid });
  //   files.map((file, index) => {
  //     const storageRef = app.storage().ref();

  //     const metadata = {
  //       contentType: "image/jpeg",
  //     };

  //     const fileName = `${
  //       currentUser.uid
  //     }_${new Date().toISOString()}_${index}`;

  //     console.log({ fileName });

  //     const uploadTask = storageRef
  //       .child("images/" + fileName)
  //       .put(file, metadata);

  //     // Listen for state changes, errors, and completion of the upload.
  //     uploadTask.on(
  //       app.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  //       function (snapshot) {
  //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
  //         var progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case app.storage.TaskState.PAUSED: // or 'paused'
  //             console.log("Upload is paused");
  //             break;
  //           case app.storage.TaskState.RUNNING: // or 'running'
  //             console.log("Upload is running");
  //             break;
  //         }
  //       },
  //       function (error) {
  //         // A full list of error codes is available at
  //         // https://firebase.google.com/docs/storage/web/handle-errors
  //         switch (error.code) {
  //           case "storage/unauthorized":
  //             console.log("User doesn't have permission to access the object");
  //             break;

  //           case "storage/canceled":
  //             console.log(" User canceled the upload");
  //             break;

  //           case "storage/unknown":
  //             console.log(
  //               "Unknown error occurred, inspect error.serverResponse"
  //             );
  //             break;
  //         }
  //       },
  //       function () {
  //         // Upload completed successfully, now we can get the download URL
  //         uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
  //           console.log("File available at", downloadURL);
  //         });
  //       }
  //     );
  //   });
  // };

  return (
    <MainLayout>
      <form>
        <DropzoneArea
          onChange={(files) => {
            setFiles(files);
          }}
        />
        <TextField
          label="Picture Name"
          name="pictureName"
          type="text"
          variant="filled"
        />
        <TextField
          label="Inspiration"
          name="inspiration"
          type="text"
          variant="filled"
        />
        <TextField
          label="Location"
          name="location"
          type="text"
          variant="filled"
        />
        <TextField label="Tag" name="tag" type="text" variant="filled" />
        {/* <Button color="primary" onClick={handleUploadFiles} variant="contained">
          Submit
        </Button> */}
      </form>
    </MainLayout>
  );
};

export default AddPhoto;
