import { ExerciseInput } from "../../API";
import DragDropEvent from "../../types/DragDropEvent";
import reorder from "./reorder";

const reorderExercisesInDay = (
  exercises: ExerciseInput[],
  source: DragDropEvent,
  destination: DragDropEvent
): ExerciseInput[] => {
  return reorder(exercises, source.index, destination.index);
};

export default reorderExercisesInDay;
