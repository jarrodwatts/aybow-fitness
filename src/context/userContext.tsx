import { useState, useEffect, createContext, useContext } from "react";
import Amplify, { Auth } from "aws-amplify";

// Also initialize Amplify, since this is being used
// In _app.tsx it will be initialized for every page
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig);

// TODO: This is probably bad but I don't know what to type this...
export const UserContext = createContext<any>(null);

export default function UserContextComp({ children }: { children: any }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // Helpful, to update the UI accordingly.

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setUser(user);
        console.log("user is signed in:", user);
      }
    } catch (error) {
      console.log(
        "Error Occurred fetching user, or user is not signed in: \nError was:",
        error
      );
      setUser(null)
    } finally {
      setLoadingUser(false);
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook that shorthands the context
export const useUser = () => useContext(UserContext);
