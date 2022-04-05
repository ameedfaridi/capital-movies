import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Login from '../auth/Login';
import { useUIContext } from '../../context/useUIContext';
import { toggleModal } from '../../reducers/ui/actions';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: "#fff",
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({open, setOpen}) {
  const classes = useStyles();
  const [state, dispatch] = useUIContext()

  const handleClose = () => {
    dispatch(toggleModal());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={state.isModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={state.isModalOpen}>
          <div className={classes.paper}>
          {state.activeComponent}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
