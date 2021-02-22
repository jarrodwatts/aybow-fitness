import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const RoutineCard = ({ routine }) => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <Card className={classes.card}>
      <React.Fragment>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random/?fitness"
          title={routine.name}
        />
        <CardContent
          className={classes.cardContent}
          style={{ maxHeight: "160px", overflowY: "hidden" }}
        >
          <Typography gutterBottom variant="h5" component="h2">
            {routine.name}
          </Typography>
          <Typography>{routine.description}</Typography>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            onClick={() => router.push(`/routine/${routine.id}`)}
          >
            View this Routine
          </Button>
        </CardActions>
      </React.Fragment>
    </Card>
  );
};

export default RoutineCard;
