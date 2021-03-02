import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { listRoutines } from "../graphql/queries";
import { GetServerSideProps } from "next";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
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

function Index({ routinesList }: { routinesList: any; errors: any[] }) {
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

export const getServerSideProps: GetServerSideProps = async () => {
  const result = (await API.graphql(graphqlOperation(listRoutines))) as {
    data: ListRoutinesQuery;
    errors: any[];
  };

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
  };
};

export default Index;
