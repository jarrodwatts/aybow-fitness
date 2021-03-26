import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { listRoutines } from "../graphql/queries";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import RoutineCard from "../components/RoutineCard";
import Hero from "../components/Hero";
import { ListRoutinesQuery, Routine } from "../API";
import RoutinesWithNextToken from '../types/RoutinesWithNextToken'
import { Divider, Tab, Tabs } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  root: {
    flexGrow: 1,
  },
}));

function Index(): any {
  const [routinesRecommended, setRoutinesRecommended] = useState<Array<Routine>>([]);
  const [stateTokenRecommended, setNextTokenRecommended] = useState<string>();
  const [routinesUserMade, setRoutinesUserMade] = useState<Array<Routine>>([]);
  const [stateTokenUserMade, setNextTokenUserMade] = useState<string>();

  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  // Recommended
  const fetchInitialRecommendedRoutines = async (): Promise<void> => {
    const result = (await API.graphql(
      {
        query: listRoutines,
        variables: {
          filter: {
            userMade: { eq: "false" }
          },
          limit: 12,
        }
      })
    ) as {
      data: ListRoutinesQuery;
      errors: any[];
    };

    if (!result.errors) {
      setRoutinesRecommended(result.data.listRoutines.items);
      setNextTokenRecommended(result.data.listRoutines.nextToken);
    }
  }

  const updateRoutinesStateRecommended = async (): Promise<void> => {
    const newRoutines = await loadMoreRoutinesRecommended()
    setRoutinesRecommended([...routinesRecommended, ...newRoutines.moreRoutines])
  }

  const loadMoreRoutinesRecommended = async (): Promise<RoutinesWithNextToken> => {
    const result = (await API.graphql({
      query: listRoutines,
      variables: {
        filter: {
          userMade: { eq: "true" }
        },
        limit: 12,
        nextToken: stateTokenRecommended
      }
    })) as {
      data: ListRoutinesQuery;
      errors: any[];
    };

    // re calculate token here
    if (result.data.listRoutines.nextToken) {
      setNextTokenRecommended(result.data.listRoutines.nextToken)
    }
    else {
      setNextTokenRecommended(null)
    }

    return {
      moreRoutines: result.data.listRoutines.items as Routine[],
      token: result.data.listRoutines.nextToken,
    }
  }

  // User Made
  const fetchInitialUserMadeRoutines = async (): Promise<void> => {
    const result = (await API.graphql(
      {
        query: listRoutines,
        variables: {
          filter: {
            userMade: { eq: "true" }
          },
          limit: 12,
        }
      })
    ) as {
      data: ListRoutinesQuery;
      errors: any[];
    };

    if (!result.errors) {
      setRoutinesUserMade(result.data.listRoutines.items);
      setNextTokenUserMade(result.data.listRoutines.nextToken);
    }
  }

  const updateRoutinesStateUserMade = async (): Promise<void> => {
    const newRoutines = await loadMoreRoutinesUserMade()
    setRoutinesUserMade([...routinesUserMade, ...newRoutines.moreRoutines])
  }

  const loadMoreRoutinesUserMade = async (): Promise<RoutinesWithNextToken> => {
    const result = (await API.graphql({
      query: listRoutines,
      variables: {
        limit: 12,
        nextToken: stateTokenUserMade
      }
    })) as {
      data: ListRoutinesQuery;
      errors: any[];
    };

    // re calculate token here
    if (result.data.listRoutines.nextToken) {
      setNextTokenUserMade(result.data.listRoutines.nextToken)
    }
    else {
      setNextTokenUserMade(null)
    }

    return {
      moreRoutines: result.data.listRoutines.items as Routine[],
      token: result.data.listRoutines.nextToken,
    }
  }

  useEffect(() => {
    fetchInitialRecommendedRoutines();
    fetchInitialUserMadeRoutines();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Hero />
        <Container className={classes.cardGrid} maxWidth="md">
          <Divider style={{ width: '100%', marginBottom: '16px' }} />

          <Grid container alignItems="center" justify="center" style={{ marginBottom: '16px' }}>
            <Grid item xs={12}>
              <Tabs className={classes.root}
                value={tabValue}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Recommended" />
                <Tab label="User Made" />
              </Tabs>
            </Grid>
          </Grid>
          {
            tabValue == 0 ?
              <React.Fragment>
                {/* Recommended Routines */}
                < Grid container spacing={4}>
                  {routinesRecommended.map((routine) => (
                    <Grid item key={routine.id} xs={12} sm={6} md={4}>
                      <RoutineCard routine={routine} />
                    </Grid>
                  ))}
                </Grid>
                <Grid container direction="row" alignItems="center" justify="center" style={{ marginTop: '32px' }}>
                  {
                    stateTokenRecommended &&
                    <Button variant="outlined" color="primary" onClick={() => updateRoutinesStateRecommended()}>
                      Load More
                    </Button>
                  }
                </Grid>
              </React.Fragment>
              :
              <React.Fragment>
                {/* User Made Routines */}
                <Grid container spacing={4}>
                  {routinesUserMade.map((routine) => (
                    <Grid item key={routine.id} xs={12} sm={6} md={4}>
                      <RoutineCard routine={routine} />
                    </Grid>
                  ))}
                </Grid>
                <Grid container direction="row" alignItems="center" justify="center" style={{ marginTop: '32px' }}>
                  {
                    stateTokenUserMade &&
                    <Button variant="outlined" color="primary" onClick={() => updateRoutinesStateUserMade()}>
                      Load More
                    </Button>
                  }
                </Grid>
              </React.Fragment>
          }
        </Container>
      </main>
    </React.Fragment >
  );
}

export default Index;
