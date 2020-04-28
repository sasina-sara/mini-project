import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

export default function EditImageDialog({ data, open, onClose, onEdit }) {
  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => {
  //   // setOpen(true);
  // };

  const handleClose = () => {
    // setOpen(false);
    if (onClose && typeof onClose === "function") {
      onClose();
    }
  };

  const handleEdit = () => {
    if (onEdit && typeof onEdit === "function") {
      onEdit();
    } else {
      handleClose();
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure to delete this?")) {
      firebase
        .firestore()
        .collection("images")
        .doc(data.id)
        .delete()
        .then((value) => {
          firebase
            .storage()
            .ref()
            .child("images/" + data.originFilename)
            .delete()
            .then((value) => {
              console.log("the image of item deleted successfully");
            })
            .catch((error) => {
              console.error(error);
            });
          console.log("the item deleted successfully");
        })
        .catch((error) => {
          console.error(error);
        });
      handleClose();
    }
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      {data && (
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <Typography
              component="span"
              variant="h5"
            >{`${data.name}`}</Typography>
            <br />
            <Typography
              color="textSecondary"
              component="span"
              variant="subtitle1"
            >{`Uploaded by: ${data.user_id}`}</Typography>
            <br />
            <Typography
              color="textSecondary"
              component="span"
              variant="subtitle1"
            >{`Inspiration: ${data.inspiration}`}</Typography>
            <br />
            <Typography
              color="textSecondary"
              component="span"
              variant="subtitle1"
            >{`Location: ${data.location}`}</Typography>
            <br />
            <Typography
              color="textSecondary"
              component="span"
              variant="subtitle1"
            >{`Tag: ${data.tag}`}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <img src={data.filename} alt="" style={{ maxWidth: "100%" }} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEdit} color="primary">
              Edit
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
