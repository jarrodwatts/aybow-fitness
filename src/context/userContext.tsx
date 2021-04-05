import { useState, useEffect, createContext, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";
import UserContextType from "../types/UserContextType";

// Also initialize Amplify, since this is being used
// In _app.tsx it will be initialized for every page
import awsconfig from "../aws-exports";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import CognitoUserAttributes from "../types/CognitoUserAttributes";

const isLocalhost = process.env.NODE_ENV == "development";

const [
  localRedirectSignIn,
  productionRedirectSignIn,
] = awsconfig.oauth.redirectSignIn.split(",");

const [
  localRedirectSignOut,
  productionRedirectSignOut,
] = awsconfig.oauth.redirectSignOut.split(",");

const updatedAwsConfig = {
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    redirectSignIn: isLocalhost
      ? localRedirectSignIn
      : productionRedirectSignIn,
    redirectSignOut: isLocalhost
      ? localRedirectSignOut
      : productionRedirectSignOut,
  },
};

Amplify.configure(updatedAwsConfig);

export const UserContext = createContext<UserContextType>(null);

export default function UserContextComp({ children }: { children: any }): any {
  const [user, setUser] = useState<CognitoUser>(null);
  const [userAttributes, setUserAttributes] = useState<CognitoUserAttributes>(
    null
  );
  const [authState, setAuthState] = useState<AuthState>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    checkUser();
  }, []);

  // Listen for updates
  useEffect(() => {
    return onAuthUIStateChange(
      async (nextAuthState: AuthState, authData: CognitoUser) => {
        setAuthState(authState);
        setUser(authData as CognitoUser);
        // TODO: this is unsafe?
        try {
          const { attributes } = await Auth.currentAuthenticatedUser();
          setUserAttributes(attributes);
        } catch (err) {
          setUserAttributes(null);
        }
      }
    );
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
      console.error(error);
      setUser(null);
      setUserAttributes(null);
    } finally {
      setLoadingUser(false);
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        userAttributes,
        setUser,
        setUserAttributes,
        loadingUser,
        authState,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context
export const useUser = (): UserContextType => useContext(UserContext);
