import React, { useState, Fragment, useContext } from "react";
import * as actions from "./../reducers/ActionTypes";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import CategoryItem from "./CategoryItem";
import { AppContext } from "./../App";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function Category() {
  console.log("Category render...");

  const classes = useStyles();

  const { category } = useContext(AppContext);
  const { state, dispatch } = category;

  const [_id, set_id] = useState(null);
  const [name, setName] = useState("");
  const [addSatus, setAddStatus] = useState(false);

  function onAdd() {
    dispatch({
      type: actions.ADD_CATEGORY,
      payload: {
        category: {
          _id,
          name,
        },
      },
    });
  }

  function onRemove(_id) {
    dispatch({
      type: actions.REMOVE_CATEGORY,
      payload: {
        _id,
      },
    });
  }

  function onUpdate(category) {
    dispatch({
      type: actions.UPDATE_CATEGORY,
      payload: {
        category,
      },
    });
  }

  function showCategorie() {
    return (
      <List
        component="nav"
        className={classes.root}
        subheader={
          <ListSubheader component="div">
            Categories {showAddIcon()}
          </ListSubheader>
        }
      >
        {showAddForm()}
        {state.categories.map((cat) => (
          <CategoryItem
            key={cat._id}
            category={cat}
            onRemove={onRemove}
            onUpdate={onUpdate}
          />
        ))}
      </List>
    );
  }

  function showAddIcon() {
    if (addSatus === false) {
      return (
        <IconButton
          onClick={() => {
            setAddStatus(!addSatus);
          }}
        >
          <AddIcon />
        </IconButton>
      );
    }
  }

  function showAddForm() {
    if (addSatus === true) {
      return (
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="New Category"
            onChange={(e) => {
              set_id(Math.random(0, 10) * 1);
              setName(e.target.value);
            }}
          />
          <IconButton
            onClick={() => {
              onAdd();
              setAddStatus(!addSatus);
            }}
          >
            <AddIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              setAddStatus(!addSatus);
            }}
          >
            <CloseIcon />
          </IconButton>
        </form>
      );
    }
  }

  return <Fragment>{showCategorie()}</Fragment>;
}

export default React.memo(Category);
