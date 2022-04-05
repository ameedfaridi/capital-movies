import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useUIContext } from '../../context/useUIContext';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1111111111111111111,
      color: '#fff',
    },
  }));

export default function Loader() {
    const classes = useStyles();
    const [uiState] = useUIContext()

  return (
    <Backdrop className={classes.backdrop} open={uiState.isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
