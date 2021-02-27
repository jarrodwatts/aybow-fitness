import React from "react";
import {
  Container,
  Avatar,
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
} from "@material-ui/core";
import { useRouter } from "next/router";

const NoRoutinesAvailable = () => {
  const router = useRouter();
  return (
    <Paper
      elevation={3}
      style={{
        minHeight: "320px",
        padding: "32px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid container justify="center" alignItems="center" spacing={3}>
        <Grid item>
          <Typography component="h3" variant="h4">
            Looks like you haven't <b>saved</b> or <b>created</b> any routines
            yet.
          </Typography>
        </Grid>
        <Grid item>
          <Typography component="h4" variant="h5">
            Would you like to make one now?
          </Typography>
        </Grid>

        <Grid container item justify="center" alignItems="center" spacing={3}>
          <Grid item>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => router.push(`/`)}
            >
              Browse Routines
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              onClick={() => router.push(`/create`)}
            >
              Create My Own
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default NoRoutinesAvailable;
