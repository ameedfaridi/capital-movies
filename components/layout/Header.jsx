import {
  Badge, Button, InputAdornment,
  makeStyles,
  TextField, useMediaQuery,
  useTheme
} from "@material-ui/core";
import {
  NotificationsRounded,
  QuestionAnswerRounded, Search
} from "@material-ui/icons";
import router from "next/router";
import React, { useEffect } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import {
  setEmail,
  setUsername,
  toggleLogin
} from "../../reducers/auth/actions";
import AuthProfile from "./AuthProfile";

const useHeaderStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 4),
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  filterIconContainer: {
    display: "flex",
    justifyContent: "space-between",
    flex: 2,
  },
  notification: {
    display: "flex",
    flex: 1,
    justifySelf: "flex-end",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "flex-end",
    },
  },
  notificationIcon: {
    margin: theme.spacing(0, 4),
  },
  notificationIconContainer: {},
  profile: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  profileInfo: {
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));

export default function Header() {
  const theme = useTheme();
  const classes = useHeaderStyles();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [authState, authDispatch] = useAuthContext();


  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("access_token"));
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (!token || authState.isLogin || !loginData) return;

    authDispatch(toggleLogin());
    authDispatch(setEmail(loginData.email));
    authDispatch(setUsername(`${loginData.fname} ${loginData.lname}`));
  }, []);

  const handleLogin = () => {
    router.push("/sign-up");
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <div className={classes.filterIconContainer}>
          <TextField
            variant="outlined"
            size="small"
            color="primary"
            placeholder="search show..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="disabled" />
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className={classes.notification}>
          {!isSmallScreen && authState.isLogin ? (
            <div className={classes.notificationIconContainer}>
              <Badge
                variant="dot"
                color="secondary"
                className={classes.notificationIcon}
              >
                <NotificationsRounded color="primary" />
              </Badge>
              <Badge variant="dot" color="secondary">
                <QuestionAnswerRounded color="primary" />
              </Badge>
            </div>
          ) : (
            <div className={classes.notificationIconContainer} />
          )}
          {authState.isLogin ? (
            <AuthProfile classes={classes} />
          ) : (
            <div className={classes.profile}>
              <Button variant="outlined" onClick={handleLogin}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}


