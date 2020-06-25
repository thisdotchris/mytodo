import React, { useState, Fragment } from "react";
import propType from "prop-types";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";

function CategoryItemMenu(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [update, setUpdate] = useState(false);

  function onMenu() {
    setShowMenu(!showMenu);
    props.onMenuClose();
  }

  function showMenuBtn() {
    if (!showMenu) {
      return (
        <IconButton onClick={onMenu}>
          <MenuIcon />
        </IconButton>
      );
    }
  }

  function onUpdate() {
    if (update) {
      return (
        <IconButton
          onClick={() => {
            props.onUpdateSave();
            setUpdate(!update);
          }}
        >
          <SaveIcon />
        </IconButton>
      );
    } else {
      return (
        <IconButton
          onClick={() => {
            props.onUpdate();
            setUpdate(!update);
          }}
        >
          <EditIcon />
        </IconButton>
      );
    }
  }

  function menu() {
    if (showMenu) {
      return (
        <Fragment>
          {onUpdate()}
          <IconButton onClick={props.onRemove}>
            <DeleteIcon />
          </IconButton>
          <IconButton onClick={onMenu}>
            <CloseIcon />
          </IconButton>
        </Fragment>
      );
    }
  }

  return (
    <Fragment>
      {showMenuBtn()}
      {menu()}
    </Fragment>
  );
}

CategoryItemMenu.prototype = {
  onUpdate: propType.func.isRequired,
  onUpdateSave: propType.func.isRequired,
  onRemove: propType.func.isRequired,
  onMenuClose: propType.func.isRequired,
};

export default React.memo(CategoryItemMenu);
