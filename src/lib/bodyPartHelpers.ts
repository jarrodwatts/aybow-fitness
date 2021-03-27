import { Exercise } from "../API";
import exerciseData from "./exerciseData";
import supported from "./supportedBodyPartImages";

export const getBodyPartImage = (ex: Exercise): string => {
  const relatedBodyPart = exerciseData.find((el) => el.name == ex.name);
  if (supported.includes(relatedBodyPart.bodyPart)) {
    return `/${relatedBodyPart.bodyPart}.png`;
  }
  return "/Default.png";
};

export const getBodyPart = (ex: Exercise): string => {
  return exerciseData.find((el) => el.name == ex.name)?.bodyPart;
};
