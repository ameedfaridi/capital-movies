import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useAuthContext } from "../../context/useAuthContext";
import { useUIContext } from "../../context/useUIContext";
import {
  setEmail as setContextEmail,
  setUsername,
  toggleLogin
} from "../../reducers/auth/actions";
import { setModalBody, toggleLoading, toggleModal } from "../../reducers/ui/actions";
import SignUp from "./Signup";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialErrorState={
  email:"",
  password: "",
}

export default function SignIn({ onLoginPage }) {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState(initialErrorState);
  const [authState, authDispatch] = useAuthContext();
  const [uiState, uiDispatch] = useUIContext();
  const router = useRouter();

  const handleLogin = () => {
    if(!email || !password) {
      if(!email) setErrors(p=>({...p, email:"Please enter email"}));
      if(!password) setErrors(p=>({...p, password:"Please enter password"}));

      return;
    } 

    setErrors(initialErrorState);
    const loginData = JSON.parse(localStorage.getItem("loginData"));
    if (
      !loginData ||
      loginData.email !== email ||
      loginData.password !== password
    )
      return;
    uiDispatch(toggleLoading());
    authDispatch(toggleLogin());
    authDispatch(setContextEmail(loginData.email));
    authDispatch(setUsername(`${loginData.fname} ${loginData.lname}`));
    localStorage.setItem(
      "access_token",
      JSON.stringify(Math.floor(Math.random() * 1e16))
    );

    setTimeout(() => {
      uiDispatch(toggleLoading());
      if (onLoginPage) {
        if (router.query.from)
          return router.push(`/discover/${router.query.from}`);
        router.push("/discover");
      } else {
        uiDispatch(toggleModal());
        if (router.query.from)
          return router.push(`/discover/${router.query.from}`);
      }
    }, 2000);
  };

  const handleClick = ()=> {
    uiDispatch(setModalBody(<SignUp/>));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="off"
            autoFocus
            value={email}
            onChange={({ target: { value } }) => setEmail(value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={({ target: { value } }) => setPassword(value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
            {onLoginPage 
            ? <Link href="/sign-up" variant="body2">
                Dont have an account? Sign Up
              </Link>
            : <Typography variant="body2" style={{cursor:"pointer"}} onClick={handleClick}>
              Dont have an account? Sign Up
              </Typography>
            }
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
