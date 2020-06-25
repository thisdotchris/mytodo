import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import "./App.css";
import Category from "./components/Category";
import Paper from "@material-ui/core/Paper";
import Todo from "./components/Todo";

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

function App() {
  const classes = useStyles();

  return (
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
      <Grid>
        <Paper className={classes.paper}></Paper>
      </Grid>
    </Grid>
  );
}

export default App;
