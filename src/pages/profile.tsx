import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { makeStyles } from "@material-ui/core/styles";
import Amplify, { API } from "aws-amplify";
import awsconfig from "../aws-exports";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  Container,
  Avatar,
  Grid,
  Typography,
  Divider,
  Tabs,
  Tab,
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

//Amplify.configure(awsconfig);

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
}));

function Profile(): any {
  const { user, userAttributes, loadingUser } = useUser();
  const [savedRoutines, setSavedRoutines] = useState<Array<Routine>>([]);
  const [createdRoutines, setCreatedRoutines] = useState<Array<Routine>>([]);
  const [savedWeights, setSavedWeights] = useState<
    Array<RecordedExerciseWithWeight>
  >([]);
  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

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
        <Grid container alignItems="center" justify="center" spacing={3}>
          <Grid item>
            <Avatar></Avatar>
          </Grid>
          <Grid item>
            <Typography component="h1" variant="h3">
              {user.getUsername()}
            </Typography>
          </Grid>

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

          <Divider
            style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
          />

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

                    <Divider
                      style={{
                        width: "100%",
                        marginTop: "16px",
                        marginBottom: "16px",
                      }}
                    />
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
      </Container>
    );
  }
}

export default Profile;
