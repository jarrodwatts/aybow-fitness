import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Grid, Typography, Button } from "@material-ui/core";
import Link from "next/link";
import { Routine } from "../API";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

const EditRoutineCard = ({ routine }: { routine: Routine }): any => {
  const classes = useStyles();
  const [showDays, setShowDays] = useState<boolean>(false);
  const router = useRouter();

  if (routine) {
    return (
      <Grid item xs={12} key={routine?.id}>
        <Paper className={classes.paper}>
          <Grid
            container
            direction="column"
            alignItems="flex-start"
            justify="center"
            spacing={1}
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
              <Typography
                style={{
                  maxHeight: "80px",
                  overflowY: "hidden",
                  textAlign: "left",
                }}
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
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => router.push(`/edit/${routine.id}`)}
                >Edit Routine</Button>
              </Grid>

              <Grid item>
                <Button
                  variant="text"
                  color="secondary"
                  endIcon={<ExpandMoreIcon />}
                  onClick={() => setShowDays(!showDays)}
                >
                  View Days
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {showDays && (
            <Grid container style={{ marginTop: "4px" }}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {routine.days.map((day, key) => (
                    <Grid item xs={12} key={key}>
                      <Paper className={classes.paper}>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-between"
                        >
                          <Typography variant="h6">
                            Day {key + 1} : <b>{day.name}</b>
                          </Typography>
                          <Button
                            variant="contained"
                            color="secondary"
                            onClick={() =>
                              router.push(`/use/${routine.id}/${key}`)
                            }
                          >
                            Start Day
                          </Button>
                        </Grid>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    );
  } else {
    // TODO: Routine has been deleted
    return <div></div>;
  }
};

export default EditRoutineCard;
