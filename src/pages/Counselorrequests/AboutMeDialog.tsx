import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { styles } from './styles';

interface AboutMeDialogProps {
  selectedAboutMe: string | null;
  handleClose: () => void;
}

const AboutMeDialog: React.FC<AboutMeDialogProps> = ({ selectedAboutMe, handleClose }) => {
  return (
    <Dialog open={!!selectedAboutMe} onClose={handleClose} sx={styles.aboutMeDialog}>
      <DialogTitle sx={{ fontWeight: 'bold' }}>درباره من</DialogTitle>
      <DialogContent>
        <Typography>{selectedAboutMe}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AboutMeDialog;