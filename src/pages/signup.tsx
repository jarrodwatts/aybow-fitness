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
import SignUpErrorResponse from '../types/SignUpErrorResponse'
import SignUpInput from '../types/SignUpInput'
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

export default function SignUp(): any {
    const classes = useStyles();
    const { register, errors, handleSubmit } = useForm<SignUpInput>();
    const router = useRouter();
    const { setUser, setUserAttributes } = useUser();

    const [phase, setPhase] = useState<string>("signup")
    const [firstName, setFirstName] = useState<string>("")
    const [lastName, setLastName] = useState<string>("")
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [confirmationCode, setConfirmationCode] = useState<string>("")
    const [amplifySignupError, setAmplifySignupError] = useState<string>()

    const onSubmit = async (data: SignUpInput): Promise<void> => {
        setAmplifySignupError("")
        const result = await signUp();

        if (result.error) {
            await handleSignUpError(result.error.name)
        }
        else {
            setPhase("confirm")
        }
    }

    const handleSignUpError = async (errorName: string): Promise<void> => {
        switch (errorName) {
            case "UsernameExistsException":
                setAmplifySignupError("Sorry, That username is taken! Try another one.");
                break;

            case "InvalidPasswordException":
                setAmplifySignupError("Your password doesn't seem complex enough. Try including a capital letter, number, and symbol.")
                break;

            default:
                setAmplifySignupError("Something went wrong signing you up. Please try again.")
        }
    }

    /**
     * Returns a boolean for the status of the signup attempt.
     * Returns a SignUpErrorResponse if there is any errors.
     */
    const signUp = async (): Promise<{
        success: boolean,
        error: SignUpErrorResponse | null,
        user: CognitoUser | null
    }> => {
        try {
            const { user } = await Auth.signUp({
                username,
                password,
                attributes: {
                    email,
                    given_name: firstName,
                    family_name: lastName,
                }
            });
            return {
                success: true,
                error: null,
                user: user,
            }
        } catch (error) {
            console.error('error signing up:', error);
            return {
                success: false,
                error: error,
                user: null,
            }
        }
    }

    const submitConfirmationCode = async (): Promise<void> => {
        try {
            await Auth.confirmSignUp(username, confirmationCode);
            // Now sign them in
            try {
                const authData = await Auth.signIn(username, password);
                setUser(authData as CognitoUser);
                try {
                    const { attributes } = await Auth.currentAuthenticatedUser();
                    setUserAttributes(attributes);
                    router.push(`/profile`)
                } catch (err) {
                    setUserAttributes(null);
                }
            } catch (error) {
                console.error('error signing in', error);
            }

        } catch (error) {
            console.error('error confirming sign up', error);
        }
    }

    const resendConfirmationCode = async (): Promise<void> => {
        try {
            await Auth.resendSignUp(username);
            console.log('code resent successfully');
        } catch (err) {
            console.error('error resending code: ', err);
        }
    }


    if (phase === "signup") {
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
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputRef={register(
                                        {
                                            required: "You must specify your first name",
                                            maxLength: {
                                                value: 100,
                                                message: "Name must be less than 100 characters"
                                            },
                                            pattern: {
                                                value: /^[a-z ,.'-]+$/i,
                                                message: "First name is not valid"
                                            }
                                        })}
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    type="text"
                                    label="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                    autoFocus
                                    error={errors.firstName ? true : false}
                                    helperText={errors.firstName ? errors.firstName.message : null}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    inputRef={register({
                                        required: "You must specify your last name",
                                        maxLength: {
                                            value: 100,
                                            message: "Name must be less than 100 characters"
                                        },
                                        pattern: {
                                            value: /^[a-z ,.'-]+$/i,
                                            message: "Last name is not valid."
                                        }
                                    })}
                                    variant="outlined"
                                    required
                                    fullWidth
                                    type="text"
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={(e) => setLastName(e.target.value)}
                                    error={errors.lastName ? true : false}
                                    helperText={errors.lastName ? errors.lastName.message : null}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    inputRef={register(
                                        {
                                            required: "You must specify a username",
                                            maxLength: {
                                                value: 16,
                                                message: "Username must be 16 or less characters"
                                            },
                                            minLength: {
                                                value: 3,
                                                message: "Username must be 3 characters or more"
                                            },
                                            pattern: {
                                                value: RegExp("^(?=.{3,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$"),
                                                message: "Invalid Username"
                                            }
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
                                        required: "You must specify an email address",
                                        pattern: {
                                            value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message: "Email is not valid"
                                        }
                                    })}
                                    variant="outlined"
                                    type="email"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    error={errors.email ? true : false}
                                    helperText={errors.email ? errors.email.message : null}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    inputRef={register({
                                        required: "You must specify a password",
                                        minLength: {
                                            value: 8,
                                            message: "Password must have at least 8 characters"
                                        },
                                        maxLength: {
                                            value: 32,
                                            message: "Password must be 32 or less characters"
                                        },
                                        max: 32,
                                        min: 8,
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
                            Sign Up
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                            </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        );
    }
    else {
        return (
            <Container component="main" maxWidth="xs" style={{ marginTop: '96px' }}>
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5" style={{ marginBottom: '16px' }}>
                        Confirm Your Email Address
                    </Typography>

                    <Typography component="h2" variant="h6" style={{ marginBottom: '16px', textAlign: 'center' }}>
                        Check your email address for the 6 digit confirmation code.
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputProps={{
                                    maxLength: 6
                                }}
                                variant="outlined"
                                required
                                fullWidth
                                id="confirmationCode"
                                type="text"
                                label="6 Digit Confirmation Code"
                                onChange={(e) => setConfirmationCode(e.target.value)}
                                autoFocus
                            />
                        </Grid>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={() => submitConfirmationCode()}
                        >
                            Confirm
                        </Button>

                        <Grid item>
                            <Button variant="text" color="primary" onClick={resendConfirmationCode}>
                                Didn&apos;t receive an email? Click here to get a new one.
                            </Button>
                        </Grid>

                    </Grid>
                </div>
            </Container>
        )
    }
}