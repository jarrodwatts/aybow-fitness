import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import React, { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import router from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import Amplify, { API } from "aws-amplify";
import awsconfig from "../aws-exports";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import {
  Container,
  Paper,
  Avatar,
  Grid,
  Typography,
  Divider,
  Button,
} from "@material-ui/core";
import {
  GetRoutineQuery,
  GetUserQuery,
  Routine,
  GetUserQueryVariables,
  ListRoutinesQuery,
} from "../API";
import { getRoutine, getUser, listRoutines } from "../graphql/queries";
import Link from "next/link";
import NoRoutinesAvailable from "../components/NoRoutinesAvailable";

Amplify.configure(awsconfig);

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
}));

function Profile() {
  const classes = useStyles();
  const { loadingUser, user, userAttributes } = useUser();
  const [savedRoutines, setSavedRoutines] = useState<Array<Routine>>([]);
  const [createdRoutines, setCreatedRoutines] = useState<Array<Routine>>([]);

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

    try {
      if (userAttributes) {
        getRoutinesData();
        fetchCreatedRoutines();
      }
    } catch (err) {}
  }, [userAttributes]);

  if (!user) {
    return null;
  }

  return (
    <Container maxWidth="sm">
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ marginTop: "64px" }}
        spacing={3}
      >
        <Grid item>
          <Avatar></Avatar>
        </Grid>
        <Grid item>
          <Typography component="h1" variant="h3">
            {user.getUsername()}
          </Typography>
        </Grid>

        <Divider
          style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
        />

        {savedRoutines.length === 0 && createdRoutines.length === 0 ? (
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
                  <Grid item xs={12} key={routine.id}>
                    <Paper className={classes.paper}>
                      <Grid container>
                        <Grid item>
                          <Typography variant="h6" color="primary">
                            <Link href={`/routine/${routine.id}`} passHref>
                              <a>
                                <b>{routine.name}</b>
                              </a>
                            </Link>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            style={{ maxHeight: "80px", overflowY: "hidden" }}
                          >
                            {routine.description}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          alignItems="center"
                          justify="space-between"
                          style={{ marginTop: "8px" }}
                        >
                          <Grid item>
                            <Typography>
                              <b>Routine from {routine.owner}</b>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => console.log("Asasd")}
                            >
                              Use this Routine
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
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
                  <Grid item xs={12} key={routine.id}>
                    <Paper className={classes.paper}>
                      <Grid container>
                        <Grid item>
                          <Typography variant="h6" color="primary">
                            <Link href={`/routine/${routine.id}`} passHref>
                              <a>
                                <b>{routine.name}</b>
                              </a>
                            </Link>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            style={{ maxHeight: "80px", overflowY: "hidden" }}
                          >
                            {routine.description}
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          item
                          alignItems="center"
                          justify="space-between"
                          style={{ marginTop: "8px" }}
                        >
                          <Grid item>
                            <Typography>
                              <b>Routine from {routine.owner}</b>
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => console.log("Edit Routine")}
                            >
                              Edit Routine
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                ))}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </Grid>
    </Container>
  );
}

export default withAuthenticator(Profile);
