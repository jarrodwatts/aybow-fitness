import { Dispatch, SetStateAction } from "react";
import { CognitoUser } from "@aws-amplify/auth";
import CognitoUserAttributes from "./CognitoUserAttributes";
import { AuthState } from "@aws-amplify/ui-components";

type UserContextType = {
  user: CognitoUser;
  userAttributes: CognitoUserAttributes;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
  setUserAttributes: Dispatch<any>;
  loadingUser: boolean;
  authState: AuthState
};

export default UserContextType;
