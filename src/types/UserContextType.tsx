import { Dispatch, SetStateAction } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import CognitoUserAttributes from "./CognitoUserAttributes";

type UserContextType = {
  user: CognitoUser;
  userAttributes: CognitoUserAttributes;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
  setUserAttributes: Dispatch<any>;
  loadingUser: boolean;
};

export default UserContextType;
