import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import "./App.css";
import Category from "./components/Category";
import Paper from "@material-ui/core/Paper";
import Todo from "./components/Todo";
import * as CategoryReducer from "./reducers/Category";

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

  const [categoryState, categoryDispatch] = useReducer(
    CategoryReducer.reducer,
    CategoryReducer.initialState
  );

  const value = {
    category: { state: categoryState, dispatch: categoryDispatch },
  };

  return (
    <AppContext.Provider value={value}>
      <Grid container justify="center" className={classes.root}>
        <Grid>
          <Paper className={classes.paper}>
            <Category />
          </Paper>
        </Grid>
        <Grid>
          <Paper className={classes.paper}>
            <Todo />
          </Paper>
        </Grid>
      </Grid>
    </AppContext.Provider>
  );
}

export default App;
