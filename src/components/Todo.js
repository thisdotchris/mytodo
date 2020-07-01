import React, { useContext, useState } from "react";
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
import DoneIcon from "@material-ui/icons/DoneAll";
import TodayIcon from "@material-ui/icons/Today";
import TrashIcon from "@material-ui/icons/Delete";
import Badge from "@material-ui/core/Badge";
import * as apiService from "./../services/api";
import Button from "@material-ui/core/Button";
import ExitToApp from "@material-ui/icons/ExitToApp";
import { send } from "./../services/emitter";

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
  const { todo, user, stat } = useContext(AppContext);
  const { state, dispatch } = todo;
  const [showForm, setShowForm] = useState(false);
  const [todos, _setTodos] = useState(state.todos);

  function onAppExit() {
    user.dispatch({
      type: "set",
      payload: {},
    });
  }

  function setTodos(todos) {
    todo.dispatch({
      type: actions.SET_TODO,
      payload: {
        todos,
      },
    });
  }

  function onDailyClick() {
    apiService.getTodosDaily(user.state._id).then((res) => {
      send("Select Daily Todos");
      setTodos(res.data);
    });
  }

  function onDoneClick() {
    apiService.getTodosDone(user.state._id).then((res) => {
      send("Select Completed Todos");
      setTodos(res.data);
    });
  }

  function onDeletedClick() {
    apiService.getTodosDeleted(user.state._id).then((res) => {
      send("Select Deleted Todos");
      setTodos(res.data);
    });
  }

  async function reqTodos() {
    const todosResponse = await apiService.getTodos();
    dispatch({
      type: actions.SET_TODO,
      payload: {
        todos: todosResponse.data,
      },
    });
  }

  async function onAdd(value) {
    await apiService.createTodo({
      ...value,
      user: user.state._id,
    });
    send("Added New Todo");
    await reqTodos();
  }

  async function onUpdate(value) {
    await apiService.updateTodo(value);
    send("Todo Updated");
    await reqTodos();
  }

  async function onRemove(id) {
    await apiService.removeTodo(id);
    send("Todo Removed");
    dispatch({
      type: actions.REMOVE_TODO,
      payload: {
        id,
      },
    });
  }

  function onChecked(val) {
    dispatch({
      type: actions.UPDATE_TODO,
      payload: {
        todo: { checked: val.checked, _id: val._id },
      },
    });
  }

  function getTodos() {
    return (
      [...todos]
        // .filter((todo, idx) => !todo.completed)
        .map((todo, idx) => (
          <ListItem button key={idx}>
            <TodoItem
              key={todo._id}
              todo={todo}
              onChecked={onChecked}
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          </ListItem>
        ))
    );
  }

  function onDeleteSelected() {
    var temp = [...todos].filter((i) => {
      if (i.checked === false) return i;
      else return onRemove(i._id);
    });
    send("Deleted Selected Todos");
    dispatch({
      type: actions.SET_TODO,
      payload: {
        todos: temp,
      },
    });
  }

  function onSearch(event) {
    let val = event.target.value;
    if (val.length > 0) {
      let temp = [...todos].filter(
        (t) =>
          (!t.completed &&
            (t.title.toString().indexOf(val) > -1 ||
              t.description.toString().indexOf(val) > -1)) ||
          t.date.toString().indexOf(val) > -1
      );
      _setTodos(temp);
    } else {
      _setTodos(state.todos);
    }
  }

  const renderOnDeleteAll = (
    /* !selectAll ? null : */ <IconButton onClick={onDeleteSelected}>
      <DeleteForever />
    </IconButton>
  );

  return (
    <div className={classes.root}>
      <Form
        open={showForm}
        onSubmit={onAdd}
        onClose={() => {
          setShowForm(false);
        }}
      ></Form>
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
        <IconButton onClick={onDailyClick}>
          <Badge
            badgeContent={stat.state ? stat.state.daily : 0}
            color="primary"
          >
            <TodayIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={onDoneClick}>
          <Badge
            badgeContent={stat.state ? stat.state.completed : 0}
            color="default"
          >
            <DoneIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={onDeletedClick}>
          <Badge
            badgeContent={stat.state ? stat.state.deleted : 0}
            color="default"
          >
            <TrashIcon />
          </Badge>
        </IconButton>
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
            onChange={onSearch}
          />
        </div>
        {renderOnDeleteAll}
        <Button
          onClick={() => {
            dispatch({
              type: actions.SET_TODO,
              payload: {
                todos: [...todos].map((t) => ({
                  ...t,
                  checked: !t.checked,
                })),
              },
            });
          }}
        >
          Select All
        </Button>
        <IconButton onClick={onAppExit}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
      <List className={classes.listRoot}>{getTodos()}</List>
    </div>
  );
}

export default React.memo(Todo);
