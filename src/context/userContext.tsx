import {
  useState,
  useEffect,
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";
import Amplify, { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
// Also initialize Amplify, since this is being used
// In _app.tsx it will be initialized for every page
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

type UserContextType = {
  user: CognitoUser;
  userAttributes: CognitoUserAttributes;
  setUser: Dispatch<SetStateAction<CognitoUser>>;
  loadingUser: boolean;
};

// Can't figure out what type this is so i'm making one
type CognitoUserAttributes = {
  email: string;
  email_verified: boolean;
  phone_number: string;
  phone_number_verified: boolean;
  sub: string;
};

export const UserContext = createContext<UserContextType>(null);

export default function UserContextComp({ children }: { children: any }) {
  const [user, setUser] = useState<CognitoUser>(null);
  const [userAttributes, setUserAttributes] = useState(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const { attributes } = await user;
      if (user) {
        setUser(user);
        setUserAttributes(attributes);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  }

  return (
    <UserContext.Provider
      value={{ user, userAttributes, setUser, loadingUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context
export const useUser = () => useContext(UserContext);
