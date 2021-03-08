/**
 * Creates a deep copy of an object or array. Useful for copying nested state values like a routine.
 * @param inObject: the object/array to convert.
 */
const deepCopy = (
  inObject: Record<string, unknown> | Array<any>
): Record<string, unknown> | Array<any> => {
  // This function uses Record<string, unknown> in place of type object.
  // Apparently type object is broken so we'll see how this goes
  let value: Record<string, unknown>;
  let key: string;

  if (typeof inObject !== "object" || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  // Create an array or object to hold the values
  const outObject: Record<string, unknown> | Array<any> = Array.isArray(
    inObject
  )
    ? []
    : {};

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopy(value);
  }

  return outObject;
};

export default deepCopy;
