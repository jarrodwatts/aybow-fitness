import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Routine } from "../API";

export default function ConfirmDeletePopup({
  routine,
  deleteRoutineTrigger,
  setShowDeletePopup,
  showDeletePopup,
}: {
  routine: Routine;
  deleteRoutineTrigger: () => Promise<void>;
  setShowDeletePopup: React.Dispatch<React.SetStateAction<boolean>>;
  showDeletePopup: boolean;
}): any {
  const handleClose = () => {
    setShowDeletePopup(false);
  };

  const handleDelete = async () => {
    await deleteRoutineTrigger();
  };

  return (
    <div>
      <Dialog
        open={showDeletePopup}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{`Delete Routine?`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this <b>{routine.name}</b>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleDelete()} color="primary" autoFocus>
            Delete Routine
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
