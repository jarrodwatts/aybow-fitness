import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const Hero = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Browse Workouts
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" paragraph>
          Find the perfect workout routine for you.
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          paragraph
          onClick={() => router.push(`/create`)}
        >
          Or, create your own:
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button variant="contained" color="primary">
                Create Your Own
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
