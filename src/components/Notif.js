import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { subscribe, unsubscribe } from "./../services/emitter";

function Notif() {
  console.log("Notif Component render...");

  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");

  function listener(mssg) {
    setMessage(mssg);
    setOpen(true);
  }

  React.useEffect(() => {
    subscribe(listener);
    return () => {
      unsubscribe(listener);
    };
  }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={1500}
        onClose={handleClose}
        message={message}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default Notif;
