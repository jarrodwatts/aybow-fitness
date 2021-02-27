import React, { useState, useEffect } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccessibilityIcon from "@material-ui/icons/Accessibility";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import AppleIcon from "@material-ui/icons/Apple";
import { useUser } from "../context/userContext";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";

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

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = useState(null);
  const router = useRouter();

  const { loadingUser, setUser, user } = useUser();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

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
  };

  useEffect(() => {
    // Listen for updates on user
    setAuth(user);
  }, [user]);

  console.log(auth);
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
              >
                Sign Up
              </Button>
              <Button variant="contained">Sign In</Button>
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
      </AppBar>
    </div>
  );
}
