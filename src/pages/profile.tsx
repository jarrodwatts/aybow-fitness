import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import { API, Auth } from "aws-amplify";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  Container,
  Grid,
  Typography,
  Divider,
  Tabs,
  Button,
  Tab,
  TextField,
  IconButton,
} from "@material-ui/core";
import {
  GetRoutineQuery,
  GetUserQuery,
  Routine,
  ListRoutinesQuery,
  RecordedExerciseWithWeight,
} from "../API";
import { getRoutine, getUser, listRoutines } from "../graphql/queries";
import NoRoutinesAvailable from "../components/NoRoutinesAvailable";
import UseRoutineCard from "../components/UseRoutineCard";
import { getUserSavedWeightsSortByDate } from "../graphql/custom/customQueries";
import CompletedExerciseCard from "../components/CompletedExerciseCard";
import EditRoutineCard from "../components/EditRoutineCard";
import SignIn from "./signin";
import CreateIcon from "@material-ui/icons/Create";
import { useForm } from "react-hook-form";
import router from "next/router";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1,
  },
  veryLarge: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
}));

type EditProfileInput = {
  preferredUsername: string;
};

function Profile(): any {
  const { user, userAttributes, loadingUser } = useUser();
  const [savedRoutines, setSavedRoutines] = useState<Array<Routine>>([]);
  const [createdRoutines, setCreatedRoutines] = useState<Array<Routine>>([]);
  const [savedWeights, setSavedWeights] = useState<
    Array<RecordedExerciseWithWeight>
  >([]);
  const classes = useStyles();
  const [tabValue, setTabValue] = useState<number>(0);
  const [editing, setEditing] = useState<boolean>(false);
  const [formGenericError, setFormGenericError] = useState<string>();
  const { register, errors, handleSubmit } = useForm<EditProfileInput>();

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  async function getRoutineIds(): Promise<string[]> {
    try {
      const userSavedRoutineIds = (await API.graphql({
        query: getUser,
        variables: { id: userAttributes.sub },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as {
        data: GetUserQuery;
        errors: any[];
      };

      if (userSavedRoutineIds.errors) {
        console.error(
          "Errors from getROutineFromId:",
          userSavedRoutineIds.errors
        );
      }
      return userSavedRoutineIds.data.getUser.savedRoutines;
    } catch (err) {
      console.error(err);
    }
  }

  async function getRoutineFromId(routineId: string): Promise<Routine> {
    try {
      const routine = (await API.graphql({
        query: getRoutine,
        variables: { id: routineId },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as {
        data: GetRoutineQuery;
        errors: any[];
      };

      if (routine.errors) {
        console.error("Err:", routine.errors);
      }
      return routine.data.getRoutine;
    } catch (err) {
      console.error(err);
    }
  }

  async function getCreatedRoutines(): Promise<Array<Routine>> {
    try {
      const userCreatedRoutines = (await API.graphql({
        query: listRoutines,
        variables: {
          filter: {
            owner: {
              eq: user.getUsername(),
            },
          },
        },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as {
        data: ListRoutinesQuery;
        errors: any[];
      };

      if (userCreatedRoutines.errors) {
        console.error(
          "Errors from getROutineFromId:",
          userCreatedRoutines.errors
        );
      }

      return userCreatedRoutines.data.listRoutines.items;
    } catch (err) {
      console.error(err);
    }
  }

  async function getSavedWeights(): Promise<Array<RecordedExerciseWithWeight>> {
    try {
      const userSavedWeights = (await API.graphql({
        query: getUserSavedWeightsSortByDate,
        variables: { id: userAttributes.sub },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as {
        data: GetUserQuery;
        errors: any[];
      };

      return userSavedWeights.data.getUser.savedWeights.items;
    } catch (err) {
      console.error(err);
    }
  }

  const onSubmit = async (data: EditProfileInput): Promise<void> => {
    setFormGenericError("");
    console.log("submitting firing");

    try {
      await Auth.updateUserAttributes(user, {
        preferred_username: data.preferredUsername,
      });
      router.reload();
    } catch (error) {
      console.error(error);
      setFormGenericError(error);
    }
  };

  useEffect(() => {
    async function getRoutinesData() {
      const ids = await getRoutineIds();
      if (ids) {
        const routines = ids.map((id) => getRoutineFromId(id));
        const res = await Promise.all(routines);
        setSavedRoutines(res);
      } else {
        setSavedRoutines([]);
      }
    }

    async function fetchCreatedRoutines() {
      const createdRoutines = await getCreatedRoutines();
      setCreatedRoutines(createdRoutines);
    }

    async function fetchSavedWeights() {
      const weights = await getSavedWeights();
      setSavedWeights(weights);
    }

    try {
      if (userAttributes) {
        getRoutinesData();
        fetchCreatedRoutines();
        fetchSavedWeights();
      }
    } catch (err) {
      console.error(err);
    }
  }, [userAttributes]);

  if (loadingUser) {
    return (
      // TODO: Loading Screen
      <div>Loading...</div>
    );
  }

  if (!user && !loadingUser) {
    return <SignIn />;
  } else {
    return (
      <Container maxWidth="sm">
        {!editing && (
          <Grid
            container
            alignItems="center"
            justify="center"
            spacing={3}
            style={{ marginTop: "32px" }}
          >
            {/* <Grid item>
              <Avatar></Avatar>
            </Grid> */}
            <Grid
              item
              container
              direction="row"
              alignItems="center"
              justify="center"
            >
              <Typography
                component="h1"
                variant="h5"
                style={{ marginRight: "8px" }}
              >
                {userAttributes?.preferred_username || user?.getUsername()}
              </Typography>
              <IconButton onClick={() => setEditing(true)}>
                <CreateIcon color="secondary" />
              </IconButton>
            </Grid>

            <Divider
              style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
            />

            <Tabs
              className={classes.root}
              value={tabValue}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="My Routines" />
              <Tab label="My Exercises" />
            </Tabs>

            {tabValue === 0 ? (
              // Saved Routines and Created Routines
              savedRoutines.length === 0 && createdRoutines.length === 0 ? (
                <NoRoutinesAvailable />
              ) : (
                <React.Fragment>
                  {savedRoutines.length == 0 ? null : (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <Typography component="h2" variant="h4">
                          Your Saved Routines
                        </Typography>
                      </Grid>
                      {savedRoutines.map((routine, key) => (
                        <React.Fragment key={key}>
                          <UseRoutineCard routine={routine} />
                        </React.Fragment>
                      ))}

                    </React.Fragment>
                  )}

                  {createdRoutines.length == 0 ? null : (
                    <React.Fragment>
                      <Grid item xs={12}>
                        <Typography component="h2" variant="h4">
                          Your Created Routines
                        </Typography>
                      </Grid>
                      {createdRoutines.map((routine, key) => (
                        <React.Fragment key={key}>
                          <EditRoutineCard routine={routine} />
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  )}
                </React.Fragment>
              )
            ) : (
              // Past Exercises
              <React.Fragment>
                <Grid item xs={12} style={{ textAlign: "left" }}>
                  <Typography component="h2" variant="h4">
                    Your Saved Exercises
                  </Typography>
                </Grid>
                {savedWeights.map((weight) => (
                  <Grid item xs={12} key={weight.id}>
                    <CompletedExerciseCard weightEntry={weight} />
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </Grid>
        )}

        {editing && (
          <Grid container style={{ marginTop: "32px" }} spacing={3}>
            {/* <Grid item xs={12} sm={4}>
                <Avatar className={classes.veryLarge}></Avatar>
              </Grid> */}

            <Grid item xs={12}>
              <Typography variant="h5">Your Profile</Typography>
            </Grid>

            <Divider style={{ width: "100%" }} />

            <Grid item xs={12}>
              <Typography variant="caption">Name</Typography>
              <Typography variant="h6">
                {userAttributes?.given_name} {userAttributes?.family_name}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="caption">Email</Typography>
              <Typography variant="h6">{userAttributes?.email}</Typography>
              {/* {userAttributes.email_verified == false && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => console.log("Verify")}
                >
                  Verify Email Address
                </Button>
              )} */}
            </Grid>

            <Divider style={{ width: "100%", marginBottom: "8px" }} />

            <Grid item xs={12}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  name="preferredUsername"
                  variant="outlined"
                  defaultValue={
                    userAttributes?.preferred_username ||
                    user?.getUsername() ||
                    ""
                  }
                  fullWidth
                  required
                  id="preferredUsername"
                  label="Display Name"
                  autoFocus
                  inputRef={register({
                    required: "You must specify a display name",
                    maxLength: {
                      value: 16,
                      message: "Display Name must be 16 or less characters",
                    },
                    minLength: {
                      value: 3,
                      message: "Display Name must be 3 characters or more",
                    },
                    pattern: {
                      value: RegExp(
                        "^(?=.{3,16}$)(?![_.])(?!.*[_. ]{2})[a-zA-Z0-9._ ]+(?<![_.])$"
                      ),
                      message: "Invalid Display Name",
                    },
                  })}
                  error={errors.preferredUsername ? true : false}
                  helperText={
                    errors.preferredUsername
                      ? errors.preferredUsername.message
                      : null
                  }
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: "32px" }}
                >
                  Save Changes
                </Button>

                <Button
                  fullWidth
                  variant="outlined"
                  color="secondary"
                  style={{ marginTop: "8px" }}
                  onClick={() => setEditing(!editing)}
                >
                  Cancel
                </Button>
              </form>
            </Grid>
          </Grid>
        )}
      </Container>
    );
  }
}

export default Profile;
