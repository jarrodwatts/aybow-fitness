import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import ExerciseNameBodyPart from "../../types/ExerciseNameBodyPart";

const useStyles = makeStyles((theme) => ({
  exercisePaper: {
    padding: theme.spacing(1),
    textAlign: "left",
  },
}));

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? "lightgreen" : null,

  // styles we need to apply on draggables
  ...draggableStyle,
});

const ExerciseInExerciseListDraggable = ({
  exerc,
  keyProp,
}: {
  exerc: ExerciseNameBodyPart;
  keyProp: any;
}): any => {
  const classes = useStyles();
  return (
    <Draggable
      key={keyProp}
      draggableId={keyProp.toString()}
      index={keyProp}
      style={{ marginBottom: "2px" }}
    >
      {(provided, snapshot) => (
        <Paper
          className={classes.exercisePaper}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
            marginBottom: "4px",
          }}
          key={keyProp}
        >
          <Typography>{exerc.name}</Typography>
        </Paper>
      )}
    </Draggable>
  );
};

export default ExerciseInExerciseListDraggable;
