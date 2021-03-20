import { DayInput, ExerciseInput } from "../../API";
import DragDropEvent from "../../types/DragDropEvent";
import ExerciseNameBodyPart from "../../types/ExerciseNameBodyPart";
import deepCopy from "../deepCopy";

const addToDay = (
  days: DayInput[],
  movedExercise: ExerciseNameBodyPart,
  destination: DragDropEvent
): DayInput[] => {
  const tempStateChanger = deepCopy(days) as DayInput[];
  tempStateChanger[destination.droppableId].exercises.splice(
    destination.index,
    0,
    {
      name: movedExercise.name,
      sets: "0",
      reps: "0",
    } as ExerciseInput
  );

  return tempStateChanger;
};

export default addToDay;
