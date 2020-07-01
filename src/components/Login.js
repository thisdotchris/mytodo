import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import * as apiService from "./../services/api";
import { AppContext } from "../App";
import * as actionTypes from "./../reducers/ActionTypes";
import { send } from "./../services/emitter";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const { user, category, todo, stat } = React.useContext(AppContext);

  function onSubmit() {
    apiService.auth(username, password).then((res) => {
      apiService.getStat(res.data._id).then((statRes) => {
        user.dispatch({
          type: "set",
          payload: {
            ...res.data,
          },
        });
        stat.dispatch({
          type: "set",
          payload: {
            ...statRes.data,
          },
        });
        category.dispatch({
          type: actionTypes.SET_CATEGORY,
          payload: {
            categories: res.data.categories,
          },
        });
        todo.dispatch({
          type: actionTypes.SET_TODO,
          payload: {
            todos: res.data.todos,
          },
        });

        send("Login Successfully");
      });
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="usernam"
          label="Username"
          name="username"
          autoComplete="usernam"
          autoFocus
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={onSubmit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2" onClick={props.doReset}>
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2" onClick={props.doSignup}>
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}

export default Login;
