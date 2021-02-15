import React from "react";
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      marginBottom: "128px",
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
  const [auth, setAuth] = React.useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" elevation={0} color="default">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <AppleIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Aybow Fitness
          </Typography>

          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: "8px" }}
          >
            Sign Up
          </Button>
          <Button variant="contained">Sign In</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
