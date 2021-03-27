import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Box, Paper } from "@material-ui/core";
import { Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import { ExerciseInput } from "../../API";

const useStyles = makeStyles((theme) => ({
  dayPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const ExerciseInDayDraggable = ({
  exercise,
  exKey,
  dayKey,
  changeSetOrRepsValue,
  setsVal,
  repsVal,
}: {
  exercise: ExerciseInput;
  exKey: any;
  dayKey: any;
  key: any;
  changeSetOrRepsValue: (
    field: string,
    value: string,
    exerciseIndex: number,
    dayIndex: number
  ) => void;
  setsVal: string;
  repsVal: string;
}): any => {
  const classes = useStyles();

  const getItemStyle = (isDragging, draggableStyle) => ({
    // change background colour if dragging
    background: isDragging ? "lightgreen" : null,

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  return (
    <Draggable
      key={exKey}
      draggableId={`day${dayKey.toString()}Exercise${exKey.toString()}${exercise.name.toString()}`}
      index={exKey}
    >
      {(provided, snapshot) => (
        <Paper
          elevation={3}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={classes.dayPaper}
          style={{
            ...getItemStyle(snapshot.isDragging, provided.draggableProps.style),
            marginBottom: "8px",
          }}
          key={`day${dayKey.toString()}Exercise${exKey.toString()}`}
        >
          <Grid container justify="space-around" alignItems="center">
            <Grid item xs={6}>
              <Box>
                <Typography>{`Exercise ${exKey + 1}`}</Typography>
                <Typography>
                  <b>{exercise.name}</b>
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography>Sets</Typography>
                <TextField
                  style={{ maxWidth: "64px" }}
                  id={`day${dayKey.toString()}Exercise${exKey}${
                    exercise.name
                  }Sets`}
                  variant="outlined"
                  onChange={(e) =>
                    changeSetOrRepsValue("sets", e.target.value, exKey, dayKey)
                  }
                  value={setsVal}
                />
              </Box>
            </Grid>
            <Grid item xs={3}>
              <Box>
                <Typography>Reps</Typography>
                <TextField
                  style={{ maxWidth: "64px" }}
                  id={`day${dayKey.toString()}Exercise${exKey}${
                    exercise.name
                  }Reps`}
                  variant="outlined"
                  onChange={(e) =>
                    changeSetOrRepsValue("reps", e.target.value, exKey, dayKey)
                  }
                  value={repsVal}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Draggable>
  );
};

export default ExerciseInDayDraggable;
