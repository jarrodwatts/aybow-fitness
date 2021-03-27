import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { RecordedExerciseWithWeight } from '../API';
import { Avatar, Grid } from '@material-ui/core';
import { getBodyPartImage } from '../lib/bodyPartHelpers';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        textAlign: "center",
    },
    title: {
        fontSize: 12,
    },
});

const convertToDate = (dateString: string): string => {
    const d = new Date(dateString);
    return d.toLocaleString()
}

export default function CompletedExerciseCard({ weightEntry }: { weightEntry: RecordedExerciseWithWeight }): any {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container alignItems="center" justify="center" spacing={2}>

                    <Grid item>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {convertToDate(weightEntry.createdAt)}
                        </Typography>
                    </Grid>

                    <Grid item container direction="row" spacing={2} alignItems="center" justify="center">
                        <Grid item>
                            <Avatar src={getBodyPartImage(weightEntry.exercise)}></Avatar>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="h2">
                                {weightEntry.exercise.name}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography variant="h6" component="p">
                            <b>{weightEntry.weight}</b>, for <b>{weightEntry.exercise.sets} sets</b> of <b>{weightEntry.exercise.reps} reps</b>.
                    </Typography>
                    </Grid>

                </Grid>

            </CardContent >

        </Card >
    );
}