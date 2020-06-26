import React, { useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Todo from "./components/Todo";
import * as CategoryReducer from "./reducers/Category";
import * as TodoReducer from "./reducers/Todo";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import StatIcon from "@material-ui/icons/Details";
import TodoIcon from "@material-ui/icons/Note";
import Category from "./components/Category";
import Typography from "@material-ui/core/Typography";
import CategoryIcon from "@material-ui/icons/Category";
import * as ActionTypes from "./reducers/ActionTypes";
import Daily from "./components/Daily";

export const actionTypes = ActionTypes;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export const AppContext = React.createContext({
  category: {},
  todo: {},
  preview: {},
  statistics: {},
});

function App() {
  const classes = useStyles();

  const [isTodo, setIsTodo] = useState(true);
  const [isCat, setIsCat] = useState(false);
  const [isStat, setIsStat] = useState(false);

  /**
   * Category Reducer
   */
  const [categoryState, categoryDispatch] = useReducer(
    CategoryReducer.reducer,
    CategoryReducer.initialState
  );

  /**
   * Todo Reducer
   */
  const [todoState, todoDispatch] = useReducer(
    TodoReducer.reducer,
    TodoReducer.initialState
  );

  /**
   * App Context Value
   */
  const value = {
    todo: { state: todoState, dispatch: todoDispatch },
    category: { state: categoryState, dispatch: categoryDispatch },
  };

  function onChange(s) {
    if (s === "isTodo") {
      setIsTodo(true);
      setIsCat(false);
      setIsStat(false);
    } else if (s === "isCat") {
      setIsTodo(false);
      setIsCat(true);
      setIsStat(false);
    } else {
      setIsStat(true);
      setIsTodo(false);
      setIsCat(false);
    }
  }

  const renderBar = (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My Todo</Typography>
        <IconButton
          color="inherit"
          onClick={() => {
            onChange("isTodo");
          }}
        >
          <TodoIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            setIsCat(true);
            onChange("isCat");
          }}
        >
          <CategoryIcon />
        </IconButton>
        <IconButton
          color="inherit"
          onClick={() => {
            onChange("isStat");
          }}
        >
          <StatIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  const renderTodo = isTodo ? <Todo /> : null;
  const renderCategory = isCat ? <Category /> : null;
  const renderDaily = isStat ? <Daily /> : null;

  return (
    <AppContext.Provider value={value}>
      <Container maxWidth="sm">
        {renderBar}
        {renderTodo}
        {renderCategory}
        {renderDaily}
      </Container>
    </AppContext.Provider>
  );
}

export default App;
