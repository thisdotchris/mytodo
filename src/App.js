import React, { useReducer, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "./App.css";
import Todo from "./components/Todo";
import Category from "./components/Category";
import * as CategoryReducer from "./reducers/Category";
import * as TodoReducer from "./reducers/Todo";
import * as ActionTypes from "./reducers/ActionTypes";
import Grid from "@material-ui/core/Grid";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

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
  user: {},
  category: {},
  todo: {},
  preview: {},
  statistics: {},
});

function App() {
  const classes = useStyles();

  const [signup, setSignup] = useState(false);
  const [reset, setReset] = useState(false);

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
   * User Reducer
   */
  const [userState, userDispatch] = useReducer((state, action) => {
    switch (action.type) {
      case "set":
        return (state = { ...action.payload });
      case "clear":
        return {};
      default:
        return state;
    }
  }, {});

  /**
   * App Context Value
   */
  const value = {
    user: { state: userState, dispatch: userDispatch },
    todo: { state: todoState, dispatch: todoDispatch },
    category: { state: categoryState, dispatch: categoryDispatch },
  };

  const RenderHome = () => {
    return (
      <div className={classes.root}>
        <Grid container direction="row" justify="center">
          <Grid item xx={2}>
            <Category />
          </Grid>
          <Grid item xs>
            <Todo
              onLogout={() => {
                userDispatch({ type: "set", payload: {} });
              }}
            />
          </Grid>
        </Grid>
      </div>
    );
  };

  const isLogin = () => {
    if (JSON.stringify(userState) === JSON.stringify({})) {
      return signup ? (
        <Signup doSignup={() => setSignup(!signup)} />
      ) : reset ? (
        <ForgotPassword doReset={() => setReset(!reset)} />
      ) : (
        <Login
          doSignup={() => setSignup(!signup)}
          doReset={() => setReset(!reset)}
        />
      );
    } else {
      return <RenderHome />;
    }
  };

  return <AppContext.Provider value={value}>{isLogin()}</AppContext.Provider>;
}

export default App;
