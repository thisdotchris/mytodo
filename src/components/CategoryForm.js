import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { red, green, blue, yellow, grey } from "@material-ui/core/colors";

function CategoryForm(props) {
  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState();

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

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const renderIcons = (
    <FormControl>
      <FormLabel component="legend">Icon Color</FormLabel>
      <FormControlLabel
        checked={color === green[500]}
        value={green[500]}
        control={<Radio />}
        label="Green"
        style={{ color: green[500] }}
        onChange={handleChange}
      />
      <FormControlLabel
        checked={color === red[500]}
        value={red[500]}
        control={<Radio />}
        label="Red"
        style={{ color: red[500] }}
        onChange={handleChange}
      />
      <FormControlLabel
        checked={color === grey[500]}
        onChange={handleChange}
        value={grey[500]}
        control={<Radio />}
        label="Grey"
        style={{ color: grey[500] }}
      />
      <FormControlLabel
        checked={color === blue[500]}
        onChange={handleChange}
        value={blue[500]}
        control={<Radio />}
        label="Blue"
        style={{ color: blue[500] }}
      />
      <FormControlLabel
        checked={color === yellow[500]}
        onChange={handleChange}
        value={yellow[500]}
        control={<Radio />}
        label="Yellow"
        style={{ color: yellow[500] }}
      />
    </FormControl>
  );

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Details</DialogTitle>
        <DialogContent>
          {renderIcons}
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
              // props.onSubmit();
              handleClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            name="submit"
            onClick={() => {
              props.onSubmit({ name: name.current, color });
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
