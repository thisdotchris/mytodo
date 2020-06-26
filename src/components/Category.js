import React, { useState, Fragment, useContext, useRef } from "react";
import * as actions from "./../reducers/ActionTypes";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CloseIcon from "@material-ui/icons/Close";
import CategoryItem from "./CategoryItem";
import { AppContext } from "./../App";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CategoryForm from "./CategoryForm";

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
  // const [name, setName] = useState("");
  const name = useRef();
  const [addSatus, setAddStatus] = useState(false);

  const [open, setOpen] = useState(false);

  function onAdd() {
    dispatch({
      type: actions.ADD_CATEGORY,
      payload: {
        category: {
          _id,
          name: name.current,
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
      <div>
        <List component="nav" className={classes.root}>
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
      </div>
    );
  }

  function showAddForm() {
    if (addSatus === true) {
      return (
        <form noValidate autoComplete="off">
          <TextField
            id="standard-basic"
            label="New Category"
            onChange={(e) => {
              name.current = e.target.value;
            }}
          />
          <IconButton
            onClick={() => {
              set_id(Math.random(0, 10) * 1);
              onAdd();
              name.current = null;
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

  const renderBar = (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="default"
          onClick={() => {
            // setAddStatus(!addSatus);
            setOpen(!open);
          }}
        >
          <AddIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          Categories
        </Typography>
      </Toolbar>
    </AppBar>
  );

  function onSubmit(val) {
    setOpen(!open);
    name.current = val.name;
    set_id(Math.random(0, 10) * 100);
    onAdd();
    name.current = null;
  }

  return (
    <Fragment>
      <CategoryForm open={open} onSubmit={onSubmit} />
      {renderBar},{showCategorie()}
    </Fragment>
  );
}

export default React.memo(Category);
