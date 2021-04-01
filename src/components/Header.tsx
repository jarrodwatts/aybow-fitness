import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: "16px",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function MenuAppBar(): any {
  const classes = useStyles();
  const [auth, setAuth] = useState(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const { setUser, setUserAttributes, user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signUserOut = async () => {
    handleClose();
    await Auth.signOut();
    setUser(null);
    setUserAttributes(null);
    // router.push(`/`);
  };

  useEffect(() => {
    // Listen for updates on user
    setAuth(user);
  }, [user]);

  // display the progress bar on page loading status
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => router.push("/")}
          >
            💪
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Aybow
          </Typography>

          {!auth ? (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "8px" }}
                onClick={() => router.push(`/signup`)}
              >
                Sign Up
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push(`/signin`)}
              >
                Sign In
              </Button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push(`/profile`);
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem onClick={signUserOut}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </Toolbar>
        {loading ? <LinearProgress /> : <div style={{ height: "4px" }}></div>}
      </AppBar>
      <div style={{ marginTop: "72px" }}></div>
    </div>
  );
}
