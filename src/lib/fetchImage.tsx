import { Storage } from "aws-amplify";

const fetchImage = async (key: string): Promise<any> => {
  try {
    const signedURL = await Storage.get(`${key}.png`);
    return signedURL;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default fetchImage;
