import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listRoutines } from "../graphql/queries";
import { GetServerSideProps } from "next";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import RoutineCard from "../components/RoutineCard";
import Hero from "../components/Hero";
import { ListRoutinesQuery, Routine } from "../API";
import RoutinesWithNextToken from '../types/RoutinesWithNextToken'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

function Index({ routinesList, nextToken, errors, }: { routinesList: any; nextToken: string | null, errors: any[]; }): any {
  const [routines, setRoutines] = useState<Array<Routine>>(routinesList);
  const [stateToken, setNextToken] = useState<string>(nextToken);
  const classes = useStyles();

  const updateRoutinesState = async (): Promise<void> => {
    const newRoutines = await loadMoreRoutines()
    setRoutines([...routines, ...newRoutines.moreRoutines])
  }

  const loadMoreRoutines = async (): Promise<RoutinesWithNextToken> => {
    const result = (await API.graphql({
      query: listRoutines,
      variables: {
        limit: 12,
        nextToken: stateToken
      }
    })) as {
      data: ListRoutinesQuery;
      errors: any[];
    };

    // re calculate token here
    if (result.data.listRoutines.nextToken) {
      setNextToken(result.data.listRoutines.nextToken)
    }
    else {
      setNextToken(null)
    }

    return {
      moreRoutines: result.data.listRoutines.items as Routine[],
      token: result.data.listRoutines.nextToken,
    }
  }

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
          <Grid container direction="row" alignItems="center" justify="center" style={{ marginTop: '32px' }}>
            {
              stateToken &&
              <Button variant="outlined" color="primary" onClick={() => updateRoutinesState()}>
                Load More
            </Button>
            }
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const result = (await API.graphql(
    {
      query: listRoutines,
      variables: {
        limit: 12,
      }
    })
  ) as {
    data: ListRoutinesQuery;
    errors: any[];
  };

  if (!result.errors) {
    return {
      props: {
        routinesList: result.data.listRoutines.items as Array<Routine>,
        nextToken: result.data.listRoutines.nextToken,
        errors: [],
      },
    };
  }

  return {
    props: {
      routinesList: [],
      nextToken: null,
      errors: result.errors,
    },
  };
};

export default Index;
