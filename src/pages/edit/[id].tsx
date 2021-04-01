import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { useRouter } from "next/router";
import { deleteRoutine, updateRoutine } from "../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  CreateRoutineInput,
  DayInput,
  DeleteRoutineInput,
  GetRoutineQuery,
  Routine,
} from "../../API";
import { Divider, IconButton, Paper } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import exerciseData from "../../lib/exerciseData";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import ExerciseNameBodyPart from "../../types/ExerciseNameBodyPart";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { useUser } from "../../context/userContext";
import ExerciseInExerciseListDraggable from "../../components/DragAndDrop/ExerciseInExerciseListDraggable";
import DayEditableContainer from "../../components/DragAndDrop/DayEditableContainer";
import reorderExercisesInDay from "../../lib/createHelpers/reorderExercisesInDay";
import DragDropEvent from "../../types/DragDropEvent";
import deepCopy from "../../lib/deepCopy";
import changeDays from "../../lib/createHelpers/changeDays";
import reorderExerciseList from "../../lib/createHelpers/reorderExerciseList";
import removeFromDay from "../../lib/createHelpers/removeFromDay";
import addToDay from "../../lib/createHelpers/addToDay";
import { GetServerSideProps } from "next";
import { getRoutine } from "../../graphql/queries";
import SignIn from "../signin";
import ConfirmDeletePopup from "../../components/ConfirmDeletePopup";

const useStyles = makeStyles((theme) => ({
  paper: {
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

const Edit = (props: { routine: GetRoutineQuery["getRoutine"] }): any => {
  const [routine, setRoutine] = useState<CreateRoutineInput>(props.routine);
  const [days, setDays] = useState<Array<DayInput>>(props.routine.days);
  const [filteredExercises, setFilteredExercises] = useState<
    Array<ExerciseNameBodyPart>
  >(exerciseData as Array<ExerciseNameBodyPart>);
  const [exCap] = useState<number>(20);
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const router = useRouter();
  const classes = useStyles();
  const { user } = useUser();

  // Stops React Beautiful DND complaining about a lot when we load it up
  resetServerContext();

  async function updateRoutineEvent(event) {
    // Perform some form validation
    event.preventDefault();

    const createRoutineInputValues: CreateRoutineInput = {
      owner: user.getUsername(),
      id: routine.id,
      name: routine.name,
      description: routine.description,
      days: days,
      userMade: "true",
    };

    try {
      await API.graphql({
        query: updateRoutine,
        variables: {
          input: createRoutineInputValues,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      await router.push(`/routine/${routine.id}`);
    } catch (err) {
      console.error(err);
    }
  }

  async function addDay(): Promise<void> {
    setDays([
      ...days,
      {
        name: "",
        description: "",
        exercises: [],
      },
    ]);
  }

  async function removeDay(index: number): Promise<void> {
    setDays(days.filter((day) => days.indexOf(day) != index));
  }

  function handleSearchChange(val: string): void {
    // Filter out the results from exerciseData
    setFilteredExercises(
      exerciseData.filter((ex) =>
        ex.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  }

  const onDragEnd = (result) => {
    const {
      source,
      destination,
    }: { source: DragDropEvent; destination: DragDropEvent } = result;

    // Dropped outside a list
    if (!result.destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      // Reordering the exercise list
      if (destination.droppableId === "exerciseList") {
        const items = reorderExerciseList(
          filteredExercises,
          source,
          destination
        );
        setFilteredExercises(items);
        return;
      }

      // Reordering a day
      else {
        const newExerciseOrderForDay = reorderExercisesInDay(
          days[destination.droppableId].exercises,
          source,
          destination
        );
        const newDays: DayInput[] = days.map((day: DayInput, key: number) => {
          // Key is the day index
          return key.toString() === source.droppableId
            ? { ...day, exercises: newExerciseOrderForDay }
            : day;
        });

        setDays([...newDays]);
        return;
      }
    }

    // Move from day to a different day
    if (
      source.droppableId != "exerciseList" &&
      destination.droppableId != "exerciseList"
    ) {
      const tempStateChanger = changeDays(days, source, destination);
      setDays(tempStateChanger);
      return;
    }

    // Moving from a day to back to the exercise list
    if (destination.droppableId === "exerciseList") {
      const tempStateChanger = removeFromDay(days, source);
      setDays(tempStateChanger);
      return;
    }

    // Moving from exercise list to a day
    else {
      const movedExercise = filteredExercises[source.index];

      const tempStateChanger = addToDay(days, movedExercise, destination);

      setDays(tempStateChanger);

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
    const newDays = deepCopy(days) as DayInput[];
    newDays[dayIndex].name = name;
    setDays([...newDays]);
  };

  const changeSetOrRepsValue = (
    field: string,
    value: string,
    exerciseIndex: number,
    dayIndex: number
  ): void => {
    const newDays = deepCopy(days) as DayInput[];
    newDays[dayIndex].exercises[exerciseIndex][field] = value;
    setDays([...newDays]);
  };

  const deleteRoutineTrigger = async (): Promise<void> => {
    const deleteRoutineInput: DeleteRoutineInput = {
      id: routine.id,
    };

    try {
      await API.graphql({
        query: deleteRoutine,
        variables: {
          input: deleteRoutineInput,
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      await router.push(`/`);
    } catch (err) {
      console.error(err);
    }
  };

  if (user?.getUsername() == routine.owner) {
    // Make a check if the user is the owner
    return (
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>🏋🏾</Avatar>
            <Typography component="h1" variant="h5">
              Edit Your Routine
            </Typography>

            <form className={classes.form}>
              <Grid container spacing={5}>
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
                        defaultValue={
                          props.routine.name ? props.routine.name : ""
                        }
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
                        defaultValue={
                          props.routine.description
                            ? props.routine.description
                            : ""
                        }
                        variant="outlined"
                        required
                        fullWidth
                        id="routineDescription"
                        label="Routine Description"
                        multiline
                        onChange={(e) =>
                          setRoutine({
                            ...routine,
                            description: e.target.value,
                          })
                        }
                      />
                    </Grid>

                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => setShowDeletePopup(true)}
                    >
                      Delete Routine
                    </Button>

                    {showDeletePopup && (
                      <ConfirmDeletePopup
                        routine={routine as Routine}
                        deleteRoutineTrigger={deleteRoutineTrigger}
                        setShowDeletePopup={setShowDeletePopup}
                        showDeletePopup={showDeletePopup}
                      />
                    )}

                    <Divider style={{ width: "100%", marginTop: "12px" }} />

                    {days.map((day, key) => (
                      <Grid item xs={12} key={key}>
                        <DayEditableContainer
                          day={day}
                          changeDayName={changeDayName}
                          changeSetOrRepsValue={changeSetOrRepsValue}
                          removeDay={removeDay}
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

                <Grid container item xs={12} sm={4} spacing={1}>
                  <Grid item xs={12}>
                    <div
                      style={{
                        position: "sticky",
                        top: "128px",
                      }}
                    >
                      <Divider style={{ width: "100%" }} />
                      <Grid item xs={12}>
                        <Typography variant="h6">Exercise List</Typography>
                      </Grid>

                      <Grid item xs={12} style={{ marginBottom: "8px" }}>
                        <Paper className={classes.root}>
                          <InputBase
                            className={classes.input}
                            placeholder="Search for an exercise"
                            inputProps={{
                              "aria-label": "search for an exercise",
                            }}
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
                            {filteredExercises
                              .slice(0, exCap)
                              .map((exerc: ExerciseNameBodyPart, key) => (
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
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => updateRoutineEvent(e)}
              >
                Save Changes
              </Button>
            </form>
          </div>
        </DragDropContext>
      </Container>
    );
  } else {
    return <SignIn />;
  }
};

export default Edit;

export const getServerSideProps: GetServerSideProps = async ({
  params: { id },
}) => {
  const routine = (await API.graphql({
    ...graphqlOperation(getRoutine),
    variables: { id },
  })) as { data: GetRoutineQuery; errors: any[] };

  if (routine.errors) {
    console.error("Failed to fetch routine.", routine.errors);
    throw new Error(routine.errors[0].message);
  }

  return {
    props: {
      routine: routine.data.getRoutine,
    },
  };
};
