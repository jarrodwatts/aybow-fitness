import DragDropEvent from "../../types/DragDropEvent";
import ExerciseNameBodyPart from "../../types/ExerciseNameBodyPart";
import reorder from "./reorder";

export default function reorderExerciseList(
  exercises: ExerciseNameBodyPart[],
  source: DragDropEvent,
  destination: DragDropEvent
): ExerciseNameBodyPart[] {
  return reorder(exercises, source.index, destination.index);
}
