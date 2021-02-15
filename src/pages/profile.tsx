import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";

import Amplify from "aws-amplify";
import awsconfig from '../aws-exports'
Amplify.configure(awsconfig);

function Profile() {
  const { loadingUser, user } = useUser();
  if (!user) return null;
  return (
    <div>
      <h1>Profile</h1>
      <h3>Username: {user.username}</h3>
      <p>Email: {user.attributes.email}</p>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(Profile);