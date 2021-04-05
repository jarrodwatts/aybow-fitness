import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Routine } from "../API";
import fetchImage from "../lib/fetchImage";

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

const RoutineCard = ({ routine }: { routine: Routine }): any => {
  const classes = useStyles();
  const router = useRouter();
  const [image, setImage] = useState<string>();
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  async function trySetImage() {
    if (routine.hasImage) {
      try {
        const getImage = await fetchImage(routine.id);
        setImage(`${getImage}`);
        setLoadingImage(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      setImage(null);
      setLoadingImage(false);
    }
  }

  useEffect(() => {
    trySetImage();
  }, []);

  return (
    <Card className={classes.card}>
      <React.Fragment>
        {loadingImage ? (
          <Skeleton
            animation="wave"
            variant="rect"
            className={classes.cardMedia}
          />
        ) : (
          <CardMedia
            className={classes.cardMedia}
            image={
              image ? image : "https://source.unsplash.com/random/?fitness"
            }
            title={routine.name}
          />
        )}
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
