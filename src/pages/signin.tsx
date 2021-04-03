import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Auth } from "aws-amplify";
import SignInInput from "../types/SignInInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useUser } from "../context/userContext";
import { CognitoUser } from "@aws-amplify/auth";
import { Divider } from "@material-ui/core";
import ForgotPassword from "../components/ForgotPassword";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import EmailIcon from "@material-ui/icons/Email";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(): any {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<SignInInput>();
  const router = useRouter();
  const { setUser, setUserAttributes } = useUser();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [recoveryCode, setRecoveryCode] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();
  const [amplifySignupError, setAmplifySignupError] = useState<string>();
  const [phase, setPhase] = useState<string>("methodSelect");

  const onSubmit = async (): Promise<void> => {
    setAmplifySignupError("");
    try {
      const authData = await Auth.signIn(username, password);
      setUser(authData as CognitoUser);
      const { attributes } = await Auth.currentAuthenticatedUser();
      setUserAttributes(attributes);

      // If current page is signup or signin
      if (router.pathname === "/signin" || router.pathname === "/signup") {
        router.push(`/profile`);
      }
    } catch (err) {
      console.error(err);
      setAmplifySignupError(err?.message);
      setUserAttributes(null);
    }
  };

  const sendPasswordResetEmail = async () => {
    try {
      // Send confirmation code to user's email
      await Auth.forgotPassword(username);
    } catch (err) {
      console.error(err);
    }
  };

  const handleForgetPasswordPhaseStart = () => {
    if (username) {
      setPhase("forgotPassword");
      sendPasswordResetEmail();
    } else {
      setAmplifySignupError(
        "Please enter your username first to recover your account"
      );
    }
  };

  if (phase === "methodSelect") {
    return (
      <Container component="main" maxWidth="sm" style={{ marginTop: "64px" }}>
        <CssBaseline />
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          spacing={1}
          style={{
            width: "100%",
            height: "65vh",
          }}
        >
          <Grid item style={{ textAlign: "center" }}>
            <Typography component="h1" variant="h3">
              Welcome Back To Aybow!
            </Typography>
          </Grid>

          <Grid item style={{ marginBottom: "16px", textAlign: "center" }}>
            <Typography component="h3" variant="body1">
              Please choose your preferred method of signing in.
            </Typography>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              onClick={() =>
                Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Facebook,
                })
              }
              style={{
                backgroundColor: "#1877F2",
                color: "#FAFAFA",
                minWidth: "216px",
              }}
            >
              Sign In with Facebook
            </Button>
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              onClick={() =>
                Auth.federatedSignIn({
                  provider: CognitoHostedUIIdentityProvider.Google,
                })
              }
              style={{ backgroundColor: "#FFFFFF", minWidth: "216px" }}
            >
              Sign In with Google
            </Button>
          </Grid>

          <Grid item>
            <Button
              startIcon={<EmailIcon />}
              variant="contained"
              color="secondary"
              onClick={() => setPhase("signin")}
              style={{ minWidth: "216px" }}
            >
              Sign In with Email
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  } else {
    return (
      <Container component="main" maxWidth="xs" style={{ marginTop: "64px" }}>
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign in to Aybow
          </Typography>

          {phase === "signin" && (
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    inputRef={register({
                      required: "Please enter your username",
                    })}
                    autoComplete="username"
                    type="text"
                    name="username"
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    error={errors.username ? true : false}
                    helperText={
                      errors.username ? errors.username.message : null
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    inputRef={register({
                      required: "Please enter your password",
                    })}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password ? true : false}
                    helperText={
                      errors.password ? errors.password.message : null
                    }
                  />
                </Grid>

                {amplifySignupError && (
                  <Grid item xs={12}>
                    <Typography color="error">{amplifySignupError}</Typography>
                  </Grid>
                )}
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => handleSubmit(onSubmit)}
              >
                Sign In
              </Button>
              <Grid
                container
                direction="column"
                alignItems="center"
                justify="center"
                spacing={1}
              >
                <Grid item>
                  <Link href="/signup" variant="body1">
                    Don&apos;t have an account? Sign Up!
                  </Link>
                </Grid>

                <Divider
                  style={{
                    width: "100%",
                    marginTop: "8px",
                    marginBottom: "8px",
                  }}
                />

                <Grid item>
                  <Link
                    variant="body2"
                    onClick={handleForgetPasswordPhaseStart}
                  >
                    Forgot my Password
                  </Link>
                </Grid>

                {/* Forgot username isn't an option yet in Amplify... */}
                {/* <Grid item>
                                <Link variant="body2" onClick={() => setPhase("forgotUsername")}>
                                    Forgot my Username
                                </Link>
                            </Grid> */}
              </Grid>
            </form>
          )}

          {phase === "forgotPassword" && (
            <ForgotPassword
              username={username}
              recoveryCode={recoveryCode}
              newPassword={newPassword}
              setRecoveryCode={setRecoveryCode}
              setNewPassword={setNewPassword}
              setUsername={setUsername}
              setPassword={setPassword}
              setPhase={setPhase}
            />
          )}
        </div>
      </Container>
    );
  }
}
