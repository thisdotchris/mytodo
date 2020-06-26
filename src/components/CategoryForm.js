import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

function CategoryForm(props) {
  const [open, setOpen] = React.useState(false);

  const name = React.useRef("");

  const handleClose = () => {
    setOpen(false);
    name.current = "";
  };

  React.useEffect(() => {
    setOpen(props.open);
    return () => {
      setOpen(false);
    };
  }, [props.open]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            onChange={(e) => {
              name.current = e.target.value;
            }}
            defaultValue={name.current}
          />
        </DialogContent>
        <DialogActions>
          <Button
            name="cancel"
            onClick={() => {
              props.onSubmit();
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            name="submit"
            onClick={() => {
              props.onSubmit({ name: name.current });
              handleClose();
            }}
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CategoryForm;
