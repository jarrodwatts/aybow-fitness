import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { CreateRecordedExerciseWithWeightInput, Day, ExerciseInput, GetRoutineQuery } from "../../../API";
import { getRoutine } from "../../../graphql/queries";
import { GetServerSideProps } from "next";
import {
  Grid,
  Typography,
  Divider,
  Container,
  Paper,
  Button,
} from "@material-ui/core";
import { useUser } from "../../../context/userContext";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { createRecordedExerciseWithWeight } from "../../../graphql/mutations";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

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
    color: theme.palette.text.secondary,
  },
}));

const dayIndex = ({ day }: { day: Day }): any => {
  const { userAttributes } = useUser();
  const router = useRouter();
  const classes = useStyles();

  const exercisesToWeightMap = () => {
    const obj = {};
    day.exercises.forEach((ex) => {
      obj[ex.name] = "";
    });
    return obj;
  };

  const [weightMap, setWeightMap] = useState<any>(exercisesToWeightMap());

  const handleWeightChange = (name: string, weight: string) => {
    setWeightMap({ ...weightMap, [name]: weight });
  };

  const lookupExByName = (exName: string): ExerciseInput => {
    const { description, reps, sets } = day.exercises.filter((ex) => ex.name == exName)[0]
    return {
      name: exName,
      description: description,
      reps: reps,
      sets: sets,
    }
  }

  const createWeightForSave = async (exName: string, exWeight: string) => {
    const exerciseInput = lookupExByName(exName);

    const input: CreateRecordedExerciseWithWeightInput = {
      ownerID: userAttributes.sub,
      exercise: exerciseInput,
      weight: exWeight,
    }

    try {
      await API.graphql({
        query: createRecordedExerciseWithWeight,
        variables: { input: input },
        authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
      });

    } catch (err) {
      console.error(err);
    }

  }

  const submitWeights = async () => {

    Object.entries(weightMap).forEach(
      ([exName, exWeight]) => {
        if (exWeight != "") {
          createWeightForSave(exName, exWeight as string)
        }
      }
    );
    router.push(`/profile`)
  };

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
          <Typography component="h1" variant="h3" style={{ marginBottom: '16px' }}>
            {day.name}
          </Typography>

          <Typography>
            Enter the weights you lifted for each exercise, then click save
            workout.
          </Typography>
        </Grid>

        <Divider
          style={{ width: "100%", marginTop: "16px", marginBottom: "32px" }}
        />
      </Grid>

      <Grid container spacing={2} alignItems="center">
        {day.exercises.map((ex, key) => (
          <Grid item xs={12} key={key}>
            <Paper className={classes.paper}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Typography>
                    <b>Exercise {key + 1}</b>
                  </Typography>
                  <Typography>{ex.name}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    <b>Sets</b>
                  </Typography>
                  <Typography>{ex.sets}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    <b>Reps</b>
                  </Typography>
                  <Typography>{ex.reps}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    <b>Weight</b>
                  </Typography>
                  <TextField
                    variant="outlined"
                    value={weightMap[ex.name]}
                    onChange={(e) =>
                      handleWeightChange(ex.name, e.target.value)
                    }
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: "100%", marginBottom: "32px" }}
            onClick={() => submitWeights()}
          >
            Save Weights
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params: { routineId, dayIndex },
}) => {
  const routine = (await API.graphql({
    ...graphqlOperation(getRoutine),
    variables: { id: routineId },
  })) as { data: GetRoutineQuery; errors: any[] };

  if (routine.errors) {
    console.error("Failed to fetch routine.", routine.errors);
    throw new Error(routine.errors[0].message);
  }

  return {
    props: {
      day: routine.data.getRoutine.days[parseInt(dayIndex.toString())],
    },
  };
};

export default dayIndex;
