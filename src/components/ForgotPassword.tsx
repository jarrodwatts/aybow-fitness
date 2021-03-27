import {
  Grid,
  Typography,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Auth } from "aws-amplify";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SignInInput from "../types/SignInInput";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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

const ForgotPassword = ({
  username,
  recoveryCode,
  newPassword,
  setRecoveryCode,
  setNewPassword,
  setUsername,
  setPassword,
  setPhase,
}: {
  username: string;
  recoveryCode: string;
  newPassword: string;
  setRecoveryCode: React.Dispatch<React.SetStateAction<string>>;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPhase: React.Dispatch<React.SetStateAction<string>>;
}): any => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm<SignInInput>();
  const [amplifyError, setAmplifyError] = useState<string>();

  const onSubmit = async (): Promise<void> => {
    try {
      await Auth.forgotPasswordSubmit(username, recoveryCode, newPassword);
      setUsername(username);
      setPassword(newPassword);
      setPhase("signin");
    } catch (err) {
      console.error(err);
      setAmplifyError(err.message);
    }
  };

  return (
    <React.Fragment>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Typography
            style={{ textAlign: "center", padding: "4px", marginTop: "16px" }}
          >
            We&apos;ve sent you an email recovery code. Please check your email
            and type the confirmation code, along with your new password to
            access your account.
          </Typography>

          <Grid item xs={12}>
            <TextField
              type="text"
              name="code"
              variant="outlined"
              required
              fullWidth
              id="code"
              label="Recovery Code"
              onChange={(e) => setRecoveryCode(e.target.value)}
              error={errors.username ? true : false}
              helperText={errors.username ? errors.username.message : null}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              inputRef={register({
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
                maxLength: {
                  value: 32,
                  message: "Password must be 32 or less characters",
                },
                max: 32,
                min: 8,
              })}
              required
              variant="outlined"
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              id="newPassword"
              onChange={(e) => setNewPassword(e.target.value)}
              error={errors.password ? true : false}
              helperText={errors.password ? errors.password.message : null}
            />
          </Grid>

          {amplifyError && (
            <Grid item xs={12}>
              <Typography color="error">{amplifyError}</Typography>
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
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};

export default ForgotPassword;
