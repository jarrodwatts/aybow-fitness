import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import Link from "next/link";

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

const UseRoutineCard = ({ routine }) => {
  const classes = useStyles();

  if (routine) {
    return (
      <Grid item xs={12} key={routine?.id}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
          >
            <Grid item>
              <Typography variant="h6" color="primary">
                <Link href={`/routine/${routine.id}`} passHref>
                  <a style={{ color: "inherit", textDecoration: "none" }}>
                    <b>{routine.name}</b>
                  </a>
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ maxHeight: "80px", overflowY: "hidden" }}>
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
              {/* TODO: Implement use this routine feature */}
              {/* <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => console.log("Asasd")}
              >
                Use this Routine
              </Button>
            </Grid> */}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  } else {
    // TODO: Routine has been deleted
    return <div></div>;
  }
};

export default UseRoutineCard;
