import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import {
  GetRoutineQuery,
  GetUserQueryVariables,
  ListRoutinesQuery,
} from "../../API";
import { getRoutine, getUser, listRoutines } from "../../graphql/queries";
import config from "../../aws-exports";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Button,
} from "@material-ui/core";
// import Image from "next/image";
import { makeStyles } from "@material-ui/core/styles";
import exerciseData from "../../lib/exerciseData";
import supported from "../../lib/supportedBodyPartImages";
import { useUser } from "../../context/userContext";
import { useRouter } from "next/router";
import { updateUser } from "../../graphql/mutations";
import { UpdateUserInput, User, GetUserQuery } from "../../API";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

API.configure(config);

const useStyles = makeStyles((theme) => ({
  heroImage: {
    height: "35vh",
    width: "100%",
    position: "absolute",
    zIndex: -1,
    opacity: 1,
    color: "#F00",
    backgroundColor: "#000",
  },
  root: {
    flexGrow: 1,
  },
  test: {
    backgroundColor: "#000",
    opacity: 0.4,
  },
  paper: {
    padding: theme.spacing(2),
    //textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const IndividualRoutine = (props: {
  routine: GetRoutineQuery["getRoutine"];
}) => {
  const { routine } = props;
  const { loadingUser, userAttributes, setUser, user } = useUser();
  const [alreadySaved, setAlreadySaved] = useState<boolean>(false);
  const router = useRouter();
  const classes = useStyles();

  useEffect(() => {
    async function getUserRoutineStatus(): Promise<boolean> {
      const currentUserData = (await API.graphql({
        query: getUser,
        variables: { id: userAttributes.sub },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      })) as {
        data: GetUserQuery;
        errors: any[];
      };

      if (
        currentUserData &&
        currentUserData.data &&
        currentUserData.data.getUser &&
        currentUserData.data.getUser.savedRoutines
      ) {
        return currentUserData.data.getUser.savedRoutines.includes(routine.id);
      }

      return false;
    }

    if (userAttributes?.sub) {
      getUserRoutineStatus().then((res) => setAlreadySaved(res));
    }
  }, [userAttributes]);

  const getBodyPartImage = (ex): string => {
    const relatedBodyPart = exerciseData.find((el) => el.name == ex.name);

    if (supported.includes(relatedBodyPart.bodyPart)) {
      return `/${relatedBodyPart.bodyPart}.png`;
    }

    return "/Default.png";
  };

  const getBodyPart = (ex): String => {
    return exerciseData.find((el) => el.name == ex.name).bodyPart;
  };

  const handleSaveUnsave = async () => {
    setAlreadySaved(!alreadySaved);

    const currentUserId: GetUserQueryVariables = {
      id: userAttributes.sub,
    };

    const currentUserData = (await API.graphql({
      query: getUser,
      variables: { id: currentUserId.id },
      authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    })) as {
      data: GetUserQuery;
      errors: any[];
    };

    function generateNewSavedRoutines(): string[] {
      // if it already exists...
      if (
        currentUserData.data.getUser.savedRoutines &&
        currentUserData.data.getUser.savedRoutines.includes(routine.id)
      ) {
        const newArr = currentUserData.data.getUser.savedRoutines.filter(
          (rou) => routine.id != rou
        );
        return newArr;
      }

      if (
        currentUserData.data.getUser.savedRoutines &&
        currentUserData.data.getUser.savedRoutines.length > 0
      ) {
        return [...currentUserData.data.getUser.savedRoutines, routine.id];
      } else {
        return [routine.id];
      }
    }

    if (!currentUserData.errors) {
      let updatedUserDetails: UpdateUserInput = {
        id: userAttributes.sub,
        savedRoutines: generateNewSavedRoutines(),
      };

      try {
        const updatedUser = await API.graphql({
          query: updateUser,
          variables: { input: updatedUserDetails },
          authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        });
      } catch (err) {
        console.error("Err:", err);
      }
    } else {
      // error occurred getting current user
      console.error("Errors;", currentUserData.errors);
    }
  };

  return (
    <div style={{ marginTop: "64px" }}>
      {/* NEXT IMAGE NOT SUPPORTED ON STATIC GENERATION. =( */}
      {/* <div className={classes.heroImage}>
        <Image
          className={classes.test}
          alt={routine.name}
          src="https://source.unsplash.com/3200x900/?fitness"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div> */}

      <Grid container alignItems="center" justify="center">
        <Container maxWidth="md">
          <div
            style={{
              textAlign: "center",
              height: "35vh",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "column",
              background: "linear-gradient(rgba(0, 0, 0, 0.6))",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              style={{ marginBottom: "8px" }}
            >
              {routine.name}
            </Typography>
            <Typography
              component="h2"
              variant="body1"
              style={{ maxHeight: "13vh", overflowY: "auto" }}
            >
              {routine.description}
            </Typography>
          </div>

          <div className={classes.root} style={{ marginTop: "32px" }}>
            <Grid container spacing={3}>
              <Grid item xs={8}>
                <Typography component="h3" variant="h4">
                  The Routine
                </Typography>
                <Typography component="h4" variant="h6">
                  Made by <b>{routine.owner}</b>
                </Typography>
              </Grid>
              {
                // The user who created the routine shouldn't see the save button
                user ? (
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color={alreadySaved ? "secondary" : "primary"}
                      onClick={handleSaveUnsave}
                    >
                      {alreadySaved ? "Unsave Routine" : "Save Routine"}
                    </Button>
                  </Grid>
                ) : (
                  <Grid item xs={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => router.push(`/profile`)}
                    >
                      Save Routine
                    </Button>
                  </Grid>
                )
              }
              {routine.days.map((day, dayKey) => (
                <Grid key={dayKey} item xs={12}>
                  <Paper className={classes.paper}>
                    <Grid container alignItems="flex-start">
                      <Grid item xs={12} style={{ marginBottom: "8px" }}>
                        <Typography component="h6" variant="h6">
                          Day {dayKey + 1}: {day.name}
                        </Typography>
                      </Grid>
                      {day.exercises.map((ex, exKey) => (
                        <Grid
                          key={exKey}
                          item
                          xs={12}
                          style={{ marginBottom: "12px" }}
                        >
                          <Paper className={classes.paper} elevation={3}>
                            <Grid
                              container
                              justify="flex-start"
                              alignItems="center"
                            >
                              <Grid item xs={3} sm={1}>
                                <Avatar src={getBodyPartImage(ex)}></Avatar>
                              </Grid>
                              <Grid item xs={9} sm={5}>
                                <Typography>
                                  <b>{ex.name}</b>
                                </Typography>
                                <Typography>
                                  {getBodyPart(ex)} Exercise
                                </Typography>
                              </Grid>
                              <Grid item xs={3} sm={1}>
                                {/* Empty Spacer for mobile */}
                              </Grid>
                              <Grid item xs={3} sm={2}>
                                <Typography>{ex.sets} Sets</Typography>
                              </Grid>
                              <Grid item xs={3} sm={2}>
                                <Typography>{ex.reps} Reps</Typography>
                              </Grid>
                            </Grid>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        </Container>
      </Grid>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  let result = (await API.graphql(graphqlOperation(listRoutines))) as {
    data: ListRoutinesQuery;
    errors: any[];
  };

  if (result.errors) {
    console.error("Failed to fetch routines paths.", result.errors);
    throw new Error(result.errors[0].message);
  }
  const paths = result.data.listRoutines.items.map(({ id }) => ({
    params: { id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
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

export default IndividualRoutine;
