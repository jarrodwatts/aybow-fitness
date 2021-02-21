import React, { useState, useEffect } from "react";
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
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  exercisePaper: {
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  dayPaper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
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
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const Create = () => {
  const [routine, setRoutine] = useState<CreateRoutineInput>();
  const [id] = useState<string>(uuid());
  const [days, setDays] = useState<Array<DayInput>>([]);
  const [filteredExercises, setFilteredExercises] = useState<
    Array<ExerciseNameBodyPart>
  >(exerciseData as Array<ExerciseNameBodyPart>);
  const [] = useState<string>("");
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    setRoutine({
      id: id,
      name: "Test Routine",
      description: "Test R description",
      days: [
        {
          name: "Test Day",
          description: "Test Day description",
          exercises: [
            {
              name: "Test ex",
              description: "test ex description",
              reps: "3",
              sets: "12",
            },
          ],
        },
      ],
    });
  }, []);

  async function createNewRoutine(event) {
    // Perform some form validation
    event.preventDefault();
    console.log(routine);

    try {
      await API.graphql({
        query: createRoutine,
        variables: { input: routine },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });
      router.push(`/routine/${id}`);
    } catch (err) {
      console.log(err);
    }
  }

  async function addDay() {
    setDays([...days, {}]);
  }

  function handleSearchChange(val: string): void {
    // Filter out the results from exerciseData
    setFilteredExercises(
      exerciseData.filter((ex) =>
        ex.name.toLowerCase().includes(val.toLowerCase())
      )
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create A Routine
        </Typography>

        <form className={classes.form} noValidate>
          <Grid container spacing={5} justify="space-between">
            <Grid item xs={8}>
              <Grid container spacing={2} alignItems="center" justify="center">
                <Grid item xs={12}>
                  <TextField
                    name="routineName"
                    variant="outlined"
                    required
                    fullWidth
                    id="routineName"
                    label="Routine Name"
                    autoFocus
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
                  />
                </Grid>

                <Divider style={{ width: "100%", marginTop: "12px" }} />

                {days.map((day, key) => (
                  <Grid item xs={12} key={key}>
                    <Paper elevation={2} className={classes.dayPaper}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            name={"day" + key + "Name"}
                            variant="outlined"
                            required
                            fullWidth
                            id={"day" + key + "Name"}
                            label={"Day " + (key + 1) + " Name"}
                            autoFocus
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Paper className={classes.dayPaper}>xs=12</Paper>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Paper className={classes.dayPaper}>xs=12 sm=6</Paper>
                        </Grid>
                      </Grid>
                    </Paper>
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
              xs={4}
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

                <Grid
                  item
                  xs={12}
                  style={{
                    height: "480px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {filteredExercises.map((exerc, key) => (
                    <Paper
                      key={key}
                      style={{ padding: "4px", marginBottom: "2px" }}
                    >
                      <Typography>{exerc.name}</Typography>
                    </Paper>
                  ))}
                </Grid>
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
    </Container>
  );
};

export default withAuthenticator(Create);
