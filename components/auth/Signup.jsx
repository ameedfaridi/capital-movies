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
import router from "next/router";
import React, { useState } from "react";
import { useUIContext } from "../../context/useUIContext";
import { setModalBody, toggleLoading } from "../../reducers/ui/actions";
import SignIn from "./Login";

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

const initialErrorState = {
  fname: "",
  lname: "",
  password: "",
};

export default function SignUp({ isOnPage }) {
  const classes = useStyles();
  const [uiState, uiDispatch] = useUIContext();
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(initialErrorState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const [isFnameValid, isLnameValid, isPasswordValid] = validateData();
    if (!isFnameValid || !isLnameValid || !isPasswordValid) return;

    uiDispatch(toggleLoading());
    setErrors(initialErrorState);
    const loginData = { fname, lname, email, password };
    localStorage.removeItem("loginData");
    localStorage.setItem("loginData", JSON.stringify(loginData));
    
    setTimeout(() => {
      uiDispatch(toggleLoading());
      if(isOnPage) return router.push("/login");
      handleClick();
    }, 2000);
  };

  const validateData = () => {
    let isFnameValid = true;
    let isLnameValid = true;
    let isPasswordValid = true;
    if (!fname || fname.length < 3) {
      isFnameValid = false;
      setErrors((p) => ({ ...p, fname: "length must be at least 3!" }));
    }
    if (!lname || lname.length < 3) {
      isLnameValid = false;
      setErrors((p) => ({ ...p, lname: "length must be at least 3!" }));
    }
    if (!password || password.length < 8) {
      isPasswordValid = false;
      setErrors((p) => ({ ...p, password: "length must be at least 8!" }));
    }

    return [isFnameValid, isLnameValid, isPasswordValid];
  };

  const handleClick =() => {
    uiDispatch(setModalBody(<SignIn/>));
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={fname}
                onChange={({ target: { value } }) => setFName(value)}
                helperText={errors.fname}
                error={!!errors.fname}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lname}
                onChange={({ target: { value } }) => setLName(value)}
                helperText={errors.lname}
                error={!!errors.lname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
                value={email}
                onChange={({ target: { value } }) => setEmail(value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={({ target: { value } }) => setPassword(value)}
                helperText={errors.password}
                error={!!errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
             {isOnPage 
             ? <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
              : <Typography variant="body2" style={{cursor: "pointer"}} onClick={handleClick}>Already have an account? Sign in</Typography>
              }
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
