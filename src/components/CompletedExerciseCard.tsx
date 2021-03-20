import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { RecordedExerciseWithWeight } from '../API';
import theme from '../theme';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        padding: theme.spacing(2),
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
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {convertToDate(weightEntry.createdAt)}
                </Typography>
                <Typography variant="h4" component="h2">
                    {weightEntry.exercise.name}
                </Typography>
                <Typography variant="h6" component="p">
                    <b>{weightEntry.weight}</b> kgs, for <b>{weightEntry.exercise.sets} sets</b> of <b>{weightEntry.exercise.reps} reps</b>.
                </Typography>
            </CardContent>

        </Card>
    );
}