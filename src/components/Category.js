import React, { useState, Fragment, useContext } from "react";
import * as actions from "./../reducers/ActionTypes";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CategoryItem from "./CategoryItem";
import { AppContext } from "./../App";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CategoryForm from "./CategoryForm";
import * as apiService from "./../services/api";
import Button from "@material-ui/core/Button";
import { send } from "./../services/emitter";

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
  const { category, user, todo } = useContext(AppContext);
  const { state, dispatch } = category;
  const [open, setOpen] = useState(false);

  async function onAdd(val) {
    const addedCategory = await apiService.createCategory({
      name: val.name,
      color: val.color,
      user: user.state._id,
    });
    await apiService.updateUser({
      _id: user.state._id,
      categories: [...user.state.categories, addedCategory.data._id],
    });
    send("Added New Category");
    dispatch({
      type: actions.ADD_CATEGORY,
      payload: {
        category: addedCategory.data,
      },
    });
    user.state.categories = [...user.state.categories, addedCategory.data._id];
  }

  function onRemove(_id) {
    apiService.removeCategory(_id).then((res) => {
      send("Category Removed");
      dispatch({
        type: actions.REMOVE_CATEGORY,
        payload: {
          _id,
        },
      });
    });
  }

  function onUpdate(category) {
    apiService.updateCategory(category).then((res) => {
      send("Category Updated");
      dispatch({
        type: actions.UPDATE_CATEGORY,
        payload: {
          category,
        },
      });
    });
  }

  function onSelectAll() {
    todo.dispatch({
      type: actions.SET_TODO,
      payload: {
        todos: user.state.todos,
      },
    });
  }

  function showCategorie() {
    return (
      <div>
        <Button fullWidth onClick={onSelectAll}>
          All
        </Button>
        <List component="nav" className={classes.root}>
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

  const renderBar = (
    // <AppBar position="static">
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
    // </AppBar>
  );

  function onSubmit(val) {
    if (val) {
      onAdd(val);
    }
    setOpen(!open);
  }

  return (
    <Fragment>
      <CategoryForm open={open} onSubmit={onSubmit} />
      {renderBar},{showCategorie()}
    </Fragment>
  );
}

export default React.memo(Category);
