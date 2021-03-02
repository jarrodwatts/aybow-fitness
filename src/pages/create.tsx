import React, { useState } from "react";
import { API } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { createRoutine } from "../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CreateRoutineInput, DayInput, ExerciseInput } from "../API";
import { Divider, IconButton, Paper } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import exerciseData from "../lib/exerciseData";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ExerciseNameBodyPart from "../types/ExerciseNameBodyPart";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useUser } from "../context/userContext";
import ExerciseInExerciseListDraggable from "../components/DragAndDrop/ExerciseInExerciseListDraggable";
import DayEditableContainer from "../components/DragAndDrop/DayEditableContainer";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#f5f5f5",
    boxShadow: "rgba(0, 0, 0, 0.4)",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  button: {
    margin: theme.spacing(1),
  },
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

const Create = () => {
  const [routine, setRoutine] = useState<CreateRoutineInput>();
  const [id] = useState<string>(uuid());
  const [days, setDays] = useState<Array<DayInput>>([]);
  const [filteredExercises, setFilteredExercises] = useState<
    Array<ExerciseNameBodyPart>
  >(exerciseData as Array<ExerciseNameBodyPart>);
  const [exCap] = useState<number>(20);
  const router = useRouter();
  const classes = useStyles();
  const { user } = useUser();

  async function createNewRoutine(event) {
    // Perform some form validation
    event.preventDefault();

    const createRoutineInputValues: CreateRoutineInput = {
      owner: user.getUsername(),
      id: id,
      name: routine.name,
      description: routine.description,
      days: days,
    };

    try {
      await API.graphql({
        query: createRoutine,
        variables: { input: createRoutineInputValues },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      await router.push(`/routine/${id}`);
    } catch (err) {
      // console.error(err);
    }
  }

  async function addDay() {
    setDays([
      ...days,
      {
        name: "",
        description: "",
        exercises: [],
      },
    ]);
  }

  function handleSearchChange(val: string): void {
    // Filter out the results from exerciseData
    setFilteredExercises(
      exerciseData.filter((ex) =>
        ex.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex): any[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    // Reordering a list
    if (source.droppableId === destination.droppableId) {
      // Reordering the exercise list
      if (destination.droppableId === "exerciseList") {
        const items = reorder(
          filteredExercises,
          result.source.index,
          result.destination.index
        );
        setFilteredExercises(items);
      }
      // Reordering a day
      else {
        // 1. Get this day's items based on source's index and droppableId
        // 2. Create a new reordered array of exercises for the specific day
        // 3. Update state to reflect these changes.
        const items = reorder(
          days[destination.droppableId].exercises,
          result.source.index,
          result.destination.index
        );

        let tempStateChanger = days;
        tempStateChanger[destination.droppableId].exercises = items;

        setDays(tempStateChanger);
      }
      return;
    }

    // Move from day to a different day
    if (
      source.droppableId != "exerciseList" &&
      destination.droppableId != "exerciseList"
    ) {
      const movedExercise = days[source.droppableId].exercises[source.index];
      let tempStateChanger = days;

      tempStateChanger[source.droppableId].exercises = tempStateChanger[
        source.droppableId
      ].exercises
        .slice(0, source.index)
        .concat(
          tempStateChanger[source.droppableId].exercises.slice(
            source.index + 1,
            tempStateChanger[source.droppableId].exercises.length
          )
        );

      tempStateChanger[destination.droppableId].exercises.splice(
        destination.index,
        0,
        {
          name: movedExercise.name,
          sets: "0",
          reps: "0",
        } as ExerciseInput
      );

      return;
    }

    // Moving from a day to back to the exercise list
    if (destination.droppableId === "exerciseList") {
      // 1. Get this day's items based on source's index and droppableId.

      let tempStateChanger = days;
      tempStateChanger[source.droppableId].exercises = tempStateChanger[
        source.droppableId
      ].exercises
        .slice(0, source.index)
        .concat(
          tempStateChanger[source.droppableId].exercises.slice(
            source.index + 1,
            tempStateChanger[source.droppableId].exercises.length
          )
        );
      return;
    }

    // Moving from exercise list to a day
    else {
      const movedExercise = filteredExercises[source.index];

      let tempStateChanger = days;
      tempStateChanger[destination.droppableId].exercises.splice(
        destination.index,
        0,
        {
          name: movedExercise.name,
          sets: "0",
          reps: "0",
        } as ExerciseInput
      );

      setFilteredExercises(
        filteredExercises
          .slice(0, source.index)
          .concat(
            filteredExercises.slice(source.index + 1, filteredExercises.length)
          )
      );

      setFilteredExercises([...filteredExercises, movedExercise]);
      return;
    }
  };

  const changeDayName = (dayIndex: number, name: string): void => {
    let newDays = days;
    newDays[dayIndex].name = name;
    setDays([...newDays]);
  };

  const changeSetOrRepsValue = (
    field: string,
    value: string,
    exerciseIndex: number,
    dayIndex: number
  ): void => {
    let newDays = days;
    newDays[dayIndex].exercises[exerciseIndex][field] = value;
    setDays([...newDays]);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>🏋🏾</Avatar>
          <Typography component="h1" variant="h5">
            Create A Routine
          </Typography>

          <form className={classes.form}>
            <Grid container spacing={5} justify="space-between">
              <Grid item xs={12} sm={8}>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justify="center"
                >
                  <Grid item xs={12}>
                    <TextField
                      name="routineName"
                      variant="outlined"
                      required
                      fullWidth
                      id="routineName"
                      label="Routine Name"
                      autoFocus
                      onChange={(e) =>
                        setRoutine({ ...routine, name: e.target.value })
                      }
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      name="routineDescription"
                      variant="outlined"
                      required
                      fullWidth
                      id="routineDescription"
                      label="Routine Description"
                      multiline
                      onChange={(e) =>
                        setRoutine({ ...routine, description: e.target.value })
                      }
                    />
                  </Grid>

                  <Divider style={{ width: "100%", marginTop: "12px" }} />

                  {days.map((day, key) => (
                    <Grid item xs={12} key={key}>
                      <DayEditableContainer
                        day={day}
                        changeDayName={changeDayName}
                        changeSetOrRepsValue={changeSetOrRepsValue}
                        keyProp={key}
                      />
                    </Grid>
                  ))}

                  {days.length < 7 && (
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      className={classes.button}
                      startIcon={<AddCircle />}
                      onClick={addDay}
                    >
                      Add A Day
                    </Button>
                  )}
                </Grid>
              </Grid>

              <Grid
                container
                item
                xs={12}
                sm={4}
                spacing={1}
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12}>
                  <Divider style={{ width: "100%" }} />
                  <Grid item xs={12}>
                    <Typography variant="h6">Exercise List</Typography>
                  </Grid>

                  <Grid item xs={12} style={{ marginBottom: "8px" }}>
                    <Paper className={classes.root}>
                      <InputBase
                        className={classes.input}
                        placeholder="Search for an exercise"
                        inputProps={{ "aria-label": "search for an exercise" }}
                        onChange={(event) =>
                          handleSearchChange(event.target.value)
                        }
                      />
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </Paper>
                  </Grid>

                  {/* Begin List exercises */}
                  <Droppable droppableId="exerciseList">
                    {(provided) => (
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        item
                        xs={12}
                        style={{
                          height: "480px",
                          overflowY: "scroll",
                          overflowX: "hidden",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {filteredExercises.slice(0, exCap).map((exerc, key) => (
                          <ExerciseInExerciseListDraggable
                            exerc={exerc}
                            key={key}
                            keyProp={key}
                          />
                        ))}
                        {provided.placeholder}
                      </Grid>
                    )}
                  </Droppable>

                  <Divider style={{ width: "100%" }} />
                </Grid>
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => createNewRoutine(e)}
            >
              Create Routine
            </Button>
          </form>
        </div>
      </DragDropContext>
    </Container>
  );
};

export default withAuthenticator(Create);
