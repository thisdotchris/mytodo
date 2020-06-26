import React, { useContext, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import TodoItem from "./TodoItem";
import AddIcon from "@material-ui/icons/Add";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import { AppContext } from "./../App";
import * as actions from "./../reducers/ActionTypes";
import Form from "./TodoForm";
import DeleteForever from "@material-ui/icons/DeleteForever";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const useStyles = makeStyles((theme) => ({
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 600,
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Todo(props) {
  console.log("todo component render...");
  const classes = useStyles();
  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext.todo;
  const [showForm, setShowForm] = useState(false);
  const [selectAll, setSelectAll] = React.useState(false);
  const [todos, setTodos] = useState(state.todos);

  function onAdd(value) {
    dispatch({
      type: actions.ADD_TODO,
      payload: {
        todo: value,
      },
    });
  }

  function onUpdate(value) {
    dispatch({
      type: actions.UPDATE_TODO,
      payload: {
        todo: value,
      },
    });
  }

  function onChecked(val) {
    dispatch({
      type: actions.UPDATE_TODO,
      payload: {
        todo: { ...val },
      },
    });
  }

  function getTodos() {
    return [...state.todos]
      .filter((todo, idx) => !todo.completed)
      .map((todo, idx) => (
        <ListItem button key={idx}>
          <TodoItem key={todo._id} todo={todo} onChecked={onChecked} />
        </ListItem>
      ));
  }

  function selectAllTodos() {
    dispatch({
      type: actions.SET_TODO,
      payload: {
        todos: [...state.todos].map((t) => ({ ...t, checked: !selectAll })),
      },
    });
  }

  function onDeleteSelected() {
    var temp = [...state.todos].filter((i) => i.checked === false);
    dispatch({
      type: actions.SET_TODO,
      payload: {
        todos: temp,
      },
    });
  }

  return (
    <div className={classes.root}>
      <Form
        open={showForm}
        onSubmit={onAdd}
        onClose={() => {
          setShowForm(false);
        }}
      ></Form>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="default"
            aria-label="open drawer"
            onClick={() => {
              setShowForm(true);
            }}
          >
            <AddIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Todos
          </Typography>
          <IconButton onClick={onDeleteSelected}>
            <DeleteForever />
          </IconButton>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectAll}
                onChange={() => {
                  setSelectAll(!selectAll);
                  selectAllTodos();
                }}
                name="selectAll"
              />
            }
            label="Select All"
          />
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <List className={classes.listRoot}>{getTodos()}</List>
    </div>
  );
}

export default React.memo(Todo);
