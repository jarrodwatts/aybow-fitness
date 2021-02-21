import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { createRoutine } from "../graphql/mutations";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { CreateRoutineInput, DayInput, ExerciseInput } from "../API";
import { Divider, Paper } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import SaveIcon from "@material-ui/icons/Save";
import SearchBox from "../components/SearchBox";
import exerciseData from "../lib/exerciseData";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
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
}));

const Create = () => {
  const [routine, setRoutine] = useState<CreateRoutineInput>();
  const [id] = useState<string>(uuid());
  const [days, setDays] = useState<Array<DayInput>>([]);
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
    console.log("Day Added.");
  }

  async function addExerciseToDay(dayIndex: number, exercise: ExerciseInput) {}

  console.log(days);
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
                    autoFocus
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
            {/* <Grid
              item
              xs={4}
              style={{
                borderStyle: "solid",
                borderColor: "#767676",
                borderWidth: "1px",
                borderRadius: "25px",
                padding: "24px",
              }}
            > */}
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
                  <SearchBox />
                </Grid>

                <Grid
                  item
                  xs={12}
                  style={{
                    height: "480px",
                    overflowY: "scroll",
                    whiteSpace: "nowrap",
                  }}
                >
                  {exerciseData.map((exerc, key) => (
                    <p>{exerc.name}</p>
                  ))}
                </Grid>
                <Divider style={{ width: "100%" }} />
              </Grid>
            </Grid>
          </Grid>
          {/* </Grid> */}

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
