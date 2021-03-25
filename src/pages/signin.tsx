import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Auth } from 'aws-amplify';
import SignInInput from '../types/SignInInput'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useUser } from '../context/userContext';
import { CognitoUser } from "@aws-amplify/auth";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
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
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [amplifySignupError, setAmplifySignupError] = useState<string>()

    const onSubmit = async (data: SignInInput): Promise<void> => {
        setAmplifySignupError("")
        try {
            const authData = await Auth.signIn(username, password);
            setUser(authData as CognitoUser);
            const { attributes } = await Auth.currentAuthenticatedUser();
            setUserAttributes(attributes);

            // If current page is signup or signin
            if (router.pathname === "signin" || router.pathname === "signup") {
                router.push(`/profile`)
            }
        } catch (err) {
            console.error(err)
            setAmplifySignupError(err?.message)
            setUserAttributes(null);
        }
    }

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: '64px' }}>
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up to Aybow
                    </Typography>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputRef={register(
                                    {
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
                                helperText={errors.username ? errors.username.message : null}
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
                                helperText={errors.password ? errors.password.message : null}
                            />
                        </Grid>

                        {amplifySignupError && (
                            <Grid item xs={12}>
                                <Typography color="error">
                                    {amplifySignupError}
                                </Typography>
                            </Grid>)
                        }

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
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don&apos;t have an account? Sign Up!
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );

}