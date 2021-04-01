import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    marginTop: "64px",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const Hero = (): any => {
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
          Browse Routines
        </Typography>
        <Typography variant="h6" align="center" color="textSecondary" paragraph>
          Find the perfect workout routine for you. 🏋️
        </Typography>
        <div className={classes.heroButtons}>
          <Grid container spacing={2} justify="center">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push(`/create`)}
              >
                Create My Own
              </Button>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default Hero;
