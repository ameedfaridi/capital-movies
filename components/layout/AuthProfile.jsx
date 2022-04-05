import {
    Avatar, ClickAwayListener, Typography
} from "@material-ui/core";
import React from "react";
import { useAuthContext } from "../../context/useAuthContext";
import SimplePopover from "../ui/Popover";

export default function AuthProfile({classes}) {
    const [authState] = useAuthContext();
  
    const [anchorEl, setAnchorEl] = React.useState(null);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <ClickAwayListener onClickAway={handleClose}>
        <div className={classes.profile} onClick={handleClick}>
          <Avatar className={classes.avatar}>{authState.username[0]}</Avatar>
          <SimplePopover anchorEl={anchorEl} handleClose={handleClose} />
          <div className={classes.profileInfo}>
            <Typography variant="body2" color="textSecondary">
              <b>{authState.username}</b>
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {authState.email}
            </Typography>
          </div>
        </div>
      </ClickAwayListener>
    );
  }