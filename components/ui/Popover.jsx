import Popover from "@material-ui/core/Popover";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useRouter } from 'next/router';
import React from "react";
import { protectedRoutes } from "../../assets/constants";
import { useAuthContext } from "../../context/useAuthContext";
import { toggleLogin } from "../../reducers/auth/actions";

const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
    cursor: "pointer",
  },
}));


export default function SimplePopover({ anchorEl, handleClose }) {
  const classes = useStyles();
  const router = useRouter();
  const [authState, authDispatch] = useAuthContext();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    authDispatch(toggleLogin());

    if(protectedRoutes.findIndex(route => route === router.pathname) !== -1) return router.push('/discover');
  };

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Typography className={classes.typography} onClick={handleLogout}>
          Logout
        </Typography>
      </Popover>
    </div>
  );
}
