import React, { useState, useContext } from "react";
import propType from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
import CategoryItemMenu from "./CategoryItemMenu";
import TextField from "@material-ui/core/TextField";
import { AppContext, actionTypes } from "./../App";
import * as ApiService from "./../services/api";

function CategoryItem(props) {
  const [name, setName] = useState("");
  const [updateState, setUpdateState] = useState(false);
  const { user, todo } = useContext(AppContext);

  function onItemClick() {
    ApiService.getTodosByCategoryAndUser(
      props.category._id,
      user.state._id
    ).then((res) => {
      todo.dispatch({
        type: actionTypes.SET_TODO,
        payload: {
          todos: res.data,
        },
      });
    });
  }

  function onMenuClose() {
    setName("");
    setUpdateState(false);
  }

  function onUpdate() {
    setName(props.category.name);
    setUpdateState(!updateState);
  }

  function onUpdateSave() {
    setUpdateState(!updateState);
    props.onUpdate({
      ...props.category,
      name,
    });
  }

  function onRemove() {
    props.onRemove(props.category._id);
  }

  function editMode() {
    if (!updateState) {
      return <ListItemText primary={props.category.name} />;
    } else {
      return (
        <TextField
          id="standard-basic"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      );
    }
  }

  return (
    <ListItem button key={props.category._id} onClick={onItemClick}>
      <ListItemIcon>
        <FolderIcon style={{ color: props.category.color }} />
      </ListItemIcon>
      {editMode()}
      <CategoryItemMenu
        onUpdate={onUpdate}
        onUpdateSave={onUpdateSave}
        onRemove={onRemove}
        onMenuClose={onMenuClose}
      />
    </ListItem>
  );
}

CategoryItem.prototype = {
  category: propType.object.isRequired,
  onRemove: propType.func.isRequired,
  onUpdate: propType.func.isRequired,
};

export default React.memo(CategoryItem);
