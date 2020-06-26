import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import propTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import CategoryItemMenu from "./CategoryItemMenu";
import CardContent from "@material-ui/core/CardContent";
import TodoForm from "./TodoForm";
import { AppContext, actionTypes } from "./../App";
import DoneIcon from "@material-ui/icons/Done";
import CardActions from "@material-ui/core/CardActions";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  box: {
    width: "100%",
  },
  border: {
    border: 1,
  },
  pointer: {
    cursor: "pointer",
  },
}));

function TodoItem(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const appContext = React.useContext(AppContext);
  const { state, dispatch } = appContext.todo;

  React.useEffect(() => {
    setChecked(props.todo.checked);
  }, [props.todo.checked]);

  function onUpdate(val) {
    dispatch({
      type: actionTypes.UPDATE_TODO,
      payload: {
        todo: val,
      },
    });
    console.log(val, state.todos);
  }

  function onRemove(_id) {
    dispatch({
      type: actionTypes.REMOVE_TODO,
      payload: {
        _id,
      },
    });
  }

  function onDone() {
    onUpdate({ ...props.todo, completed: true });
  }

  const renderCardAction = (
    <CardActions disableSpacing>
      <IconButton aria-label="Done" onClick={onDone}>
        <DoneIcon />
      </IconButton>
    </CardActions>
  );

  return (
    <Card className={classes.root}>
      <TodoForm
        open={open}
        todo={props.todo}
        onClose={() => {
          setOpen(!open);
        }}
        onSubmit={(val) => {
          onUpdate(val);
          setOpen(!open);
        }}
      />
      <CardHeader
        className={classes.pointer}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            T
          </Avatar>
        }
        action={
          <React.Fragment>
            <CategoryItemMenu
              open={open}
              onUpdate={() => {
                setOpen(!open);
              }}
              onUpdateSave={() => {}}
              onRemove={() => {
                onRemove(props.todo._id);
              }}
              onMenuClose={() => {}}
            />
            <IconButton aria-label="settings">
              <Checkbox
                checked={checked}
                onChange={() => {
                  props.onChecked({ ...props.todo, checked: !checked });
                  setChecked(!checked);
                }}
              />
            </IconButton>
          </React.Fragment>
        }
        title={props.todo.title}
        subheader={new Date(props.todo.date).toDateString()}
        onClick={() => {
          // emitter.emit(props.todo);
        }}
      />
      <CardContent>{props.todo.description}</CardContent>
      {renderCardAction}
    </Card>
  );
}

TodoItem.prototype = {
  todo: propTypes.object.isRequired,
};

export default TodoItem;
