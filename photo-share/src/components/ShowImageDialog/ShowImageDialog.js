import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Typography } from "@material-ui/core";

export default function ShowImagesDialog({ data, open, onClose }) {
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
            <Typography variant="h5">{`${data.name}`}</Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
            >{`Uploaded by: ${data.user_id}`}</Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
            >{`Inspiration: ${data.inspiration}`}</Typography>
            <Typography
              color="textSecondary"
              variant="subtitle1"
            >{`Location: ${data.location}`}</Typography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <img src={data.filename} alt="" style={{ maxWidth: "100%" }} />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button> */}
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
