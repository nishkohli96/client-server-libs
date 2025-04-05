import { Fragment, type ReactElement, type Ref, forwardRef } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement;
  },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type ConfirmationDialogProps = {
  title: string;
  contentText?: string;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  confirmBtnText?: string;
  cancelBtnText?: string;
};

const ConfirmationDialog = ({
  title,
  contentText,
  open,
  onConfirm,
  onClose,
  confirmBtnText = 'Okay',
  cancelBtnText = 'Cancel'
}: ConfirmationDialogProps) => {
  return (
    <Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {title}
        </DialogTitle>
        {contentText && (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {contentText}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={onClose}>
            {cancelBtnText}
          </Button>
          <Button onClick={onConfirm}>
            {confirmBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmationDialog;
