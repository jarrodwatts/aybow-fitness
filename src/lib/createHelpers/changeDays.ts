import { DayInput, ExerciseInput } from "../../API";
import DragDropEvent from "../../types/DragDropEvent";
import deepCopy from "../deepCopy";

const changeDays = (
  days: DayInput[],
  source: DragDropEvent,
  destination: DragDropEvent
): DayInput[] => {
  const movedExercise = days[source.droppableId].exercises[source.index];
  const tempStateChanger = deepCopy(days) as DayInput[];

  tempStateChanger[source.droppableId].exercises = tempStateChanger[
    source.droppableId
  ].exercises
    .slice(0, source.index)
    .concat(
      tempStateChanger[source.droppableId].exercises.slice(
        source.index + 1,
        tempStateChanger[source.droppableId].exercises.length
      )
    );

  tempStateChanger[destination.droppableId].exercises.splice(
    destination.index,
    0,
    {
      name: movedExercise.name,
      sets: movedExercise.sets,
      reps: movedExercise.reps,
    } as ExerciseInput
  );

  return tempStateChanger;
};

export default changeDays;
