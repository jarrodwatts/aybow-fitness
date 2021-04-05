type CognitoUserAttributes = {
  email: string;
  email_verified: boolean;
  phone_number?: string;
  phone_number_verified?: boolean;
  sub: string;
  family_name?: string;
  given_name?: string;
  name?: string;
  preferred_username?: string;
};

export default CognitoUserAttributes;
