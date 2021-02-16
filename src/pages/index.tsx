import React, { useState, useEffect } from "react";
import Link from "next/link";
import { API, graphqlOperation } from "aws-amplify";
import { listUsers } from "../graphql/queries";
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

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Index(props) {
  const [routines, setRoutines] = useState([]);
  const classes = useStyles();
  useEffect(() => {});
  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        <Hero />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <RoutineCard />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {},
  };
};

export default Index;
