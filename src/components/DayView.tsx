import React from "react";
import { Grid, Paper, Typography, Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getBodyPartImage, getBodyPart } from "../lib/bodyPartHelpers";

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

const DayView = ({ day, dayKey }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Grid container alignItems="flex-start">
        <Grid item xs={12} style={{ marginBottom: "8px" }}>
          <Typography component="h6" variant="h6">
            Day {dayKey + 1}: {day.name}
          </Typography>
        </Grid>
        {day.exercises.map((ex, exKey) => (
          <Grid key={exKey} item xs={12} style={{ marginBottom: "12px" }}>
            <Paper className={classes.paper} elevation={3}>
              <Grid container justify="flex-start" alignItems="center">
                <Grid item xs={3} sm={1}>
                  <Avatar src={getBodyPartImage(ex)}></Avatar>
                </Grid>
                <Grid item xs={9} sm={5}>
                  <Typography>
                    <b>{ex.name}</b>
                  </Typography>
                  <Typography>{getBodyPart(ex)} Exercise</Typography>
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
  );
};

export default DayView;
