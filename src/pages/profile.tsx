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
} from "@material-ui/core";
import {
  GetRoutineQuery,
  GetUserQuery,
  Routine,
  GetUserQueryVariables,
} from "../API";
import { getRoutine, getUser } from "../graphql/queries";

Amplify.configure(awsconfig);

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));

function Profile() {
  const classes = useStyles();
  const { loadingUser, user, userAttributes } = useUser();
  const [savedRoutines, setSavedRoutines] = useState<Array<Routine>>([]);

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
        console.log(
          "Errors from getROutineFromId:",
          userSavedRoutineIds.errors
        );
      }
      return userSavedRoutineIds.data.getUser.savedRoutines;
    } catch (err) {
      console.log(err);
    }
  }

  async function getRoutineFromId(routineId: string): Promise<Routine> {
    try {
      const routine = (await API.graphql({
        query: getRoutine,
        variables: { id: routineId },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as {
        data: Routine;
        errors: any[];
      };

      if (routine.errors) {
        console.log("Err:", routine.errors);
      }
      return routine.data;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log("a");
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

    try {
      if (userAttributes) {
        getRoutinesData();
      }
    } catch (err) {}
  }, [userAttributes]);

  if (!user) {
    console.log("no user");
    return null;
  }

  console.log("res:", savedRoutines);
  return (
    <Container maxWidth="md" style={{ marginTop: "64px" }}>
      <Paper style={{ height: "100vh" }}>
        <Grid
          container
          alignItems="center"
          justify="center"
          spacing={2}
          style={{ marginTop: "64px" }}
        >
          <Grid item style={{ marginTop: "64px" }}>
            <Avatar className={classes.large}></Avatar>
          </Grid>
          <Grid item style={{ marginTop: "64px" }}>
            <Typography component="h1" variant="h3">
              {user.getUsername()}
            </Typography>
          </Grid>
        </Grid>

        <Divider
          style={{ width: "100%", marginTop: "32px", marginBottom: "32px" }}
        />

        <Grid container alignItems="center" justify="center">
          <Typography component="h3" variant="h4">
            Your Saved Routines
          </Typography>
        </Grid>
      </Paper>
    </Container>
  );
}

export default withAuthenticator(Profile);
