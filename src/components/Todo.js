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
import FavIcon from "@material-ui/icons/Favorite";
import TodayIcon from "@material-ui/icons/Today";
import Checkbox from "@material-ui/core/Checkbox";
import TrashIcon from "@material-ui/icons/Delete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Badge from "@material-ui/core/Badge";
import * as apiService from "./../services/api";
import AccountIcon from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

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
  const { todo, user } = useContext(AppContext);
  const { state, dispatch } = todo;
  const [showForm, setShowForm] = useState(false);
  const [selectAll, setSelectAll] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // React.useEffect(() => {
  //   if (state.todos.length === 0) {
  //     apiService.getTodos().then((res) => {
  //       if (res.data.length !== 0) {
  //         dispatch({
  //           type: actions.SET_TODO,
  //           payload: {
  //             todos: res.data,
  //           },
  //         });
  //       }
  //     });
  //   }
  // }, [state.todos]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
    await reqTodos();
  }

  async function onUpdate(value) {
    await apiService.updateTodo(value);
    await reqTodos();
  }

  async function onRemove(id) {
    await apiService.removeTodo(id);
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
    return [...state.todos]
      .filter((todo, idx) => !todo.completed)
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
    var temp = [...state.todos].filter((i) => {
      if (i.checked === false) {
        return i;
      } else {
        onRemove(i._id);
      }
    });
    dispatch({
      type: actions.SET_TODO,
      payload: {
        todos: temp,
      },
    });
  }

  const renderOnDeleteAll = (
    /* !selectAll ? null : */ <IconButton onClick={onDeleteSelected}>
      <DeleteForever />
    </IconButton>
  );

  const RenderAccountMenu = () => (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>My account</MenuItem>
      <MenuItem
        onClick={() => {
          handleClose();
          user.dispatch({
            type: "clear",
          });
          props.onLogout();
        }}
      >
        Logout
      </MenuItem>
    </Menu>
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
        <IconButton onClick={handleClick}>
          <AccountIcon />
        </IconButton>
        <RenderAccountMenu />
        <IconButton>
          <Badge badgeContent={4} color="primary">
            <TodayIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={8} color="secondary">
            <FavIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={10} color="default">
            <DoneIcon />
          </Badge>
        </IconButton>
        <IconButton>
          <Badge badgeContent={2} color="default">
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
          />
        </div>
        {renderOnDeleteAll}
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
      </Toolbar>
      {/* </AppBar> */}
      <List className={classes.listRoot}>{getTodos()}</List>
    </div>
  );
}

export default React.memo(Todo);
