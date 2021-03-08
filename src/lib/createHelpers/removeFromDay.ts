import { DayInput } from "../../API";
import DragDropEvent from "../../types/DragDropEvent";
import deepCopy from "../deepCopy";

const removeFromDay = (days: DayInput[], source: DragDropEvent): DayInput[] => {
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

  return tempStateChanger;
};

export default removeFromDay;
