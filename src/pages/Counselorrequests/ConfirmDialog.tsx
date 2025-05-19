import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { ConfirmDialogState } from './types';
import { styles } from './styles';

interface ConfirmDialogProps {
  confirmDialog: ConfirmDialogState;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ confirmDialog, handleClose, handleConfirm }) => {
  return (
    <Dialog open={confirmDialog.open} onClose={handleClose} sx={styles.confirmDialog}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>
        {confirmDialog.action === 'approve' ? 'تأیید درخواست' : 'رد درخواست'}
      </DialogTitle>
      <DialogContent>
        <Typography>
          {confirmDialog.action === 'approve'
            ? 'آیا از تأیید درخواست اطمینان دارید؟'
            : 'آیا از رد درخواست اطمینان دارید؟'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          لغو
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          تأیید
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;