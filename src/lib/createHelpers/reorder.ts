/** Reorder a list when a Draggable moves around within a Droppable.
 * @param list: The list of draggables in the droppable
 * @param startIndex: The index the item was originally in before moving
 * @param endIndex: The index the item ended up in (post-move)
 */
const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default reorder;
