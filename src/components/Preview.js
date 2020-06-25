import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import propTypes from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DoneIcon from "@material-ui/icons/Done";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
}));

function Preview(props) {
  console.log("preview component render...");
  const classes = useStyles();

  function ifTodo() {
    if (JSON.stringify(props.preview) !== JSON.stringify({})) {
      return (
        <Card className={classes.root}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                R
              </Avatar>
            }
            title={props.preview.title}
            subheader={new Date(props.preview.date).toDateString()}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.preview.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton>
              <EditIcon />
            </IconButton>
            <IconButton>
              <DeleteIcon />
            </IconButton>
            <IconButton>
              <DoneIcon />
            </IconButton>
          </CardActions>
        </Card>
      );
    }
  }

  return <Fragment>{ifTodo()}</Fragment>;
}

Preview.prototype = {
  preview: propTypes.object.isRequired,
};

export default Preview;
