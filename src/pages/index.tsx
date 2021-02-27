import React, { useState, useEffect } from "react";
import Link from "next/link";
import { API, graphqlOperation } from "aws-amplify";
import { listRoutines, listUsers } from "../graphql/queries";
import { GetStaticProps } from "next";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import RoutineCard from "../components/RoutineCard";
import Hero from "../components/Hero";
import { ListRoutinesQuery } from "../API";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function Index({ routinesList, errors }: { routinesList: any; errors: any[] }) {
  const [routines, setRoutines] = useState(routinesList);
  const classes = useStyles();

  useEffect(() => {
    setRoutines(routinesList);
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Hero />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {routines.map((routine) => (
              <Grid item key={routine.id} xs={12} sm={6} md={4}>
                <RoutineCard routine={routine} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  // Make a call to the graphQL API here to get all todos from a todolist
  // The todo list will be 'global'
  const result = (await API.graphql(graphqlOperation(listRoutines))) as {
    data: ListRoutinesQuery;
    errors: any[];
  };

  // If there's no errors return the todos as an array of
  if (!result.errors) {
    return {
      props: {
        routinesList: result.data.listRoutines.items,
        errors: [],
      },
    };
  }

  return {
    props: {
      routinesList: [],
      errors: result.errors,
    },
    revalidate: 1,
  };
};

export default Index;
