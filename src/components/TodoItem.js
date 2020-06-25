import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
// import Button from "@material-ui/core/Button";
import propTypes from "prop-types";
import Checkbox from "@material-ui/core/Checkbox";
import ListItem from "@material-ui/core/ListItem";
// import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom: 20,
    marginTop: 20,
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
}));

function TodoItem(props) {
  const classes = useStyles();

  return (
    <ListItem button className={classes.border}>
      <ListItemAvatar>
        <Avatar aria-label="recipe" className={classes.avatar}>
          T
        </Avatar>
      </ListItemAvatar>
      <ListItemText id={"test"} primary={props.todo.title} />
      <Checkbox edge="end" />
    </ListItem>
  );
}

TodoItem.prototype = {
  todo: propTypes.object.isRequired,
};

export default TodoItem;
