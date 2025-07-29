import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from '@mui/material';
import SecondaryButton from "@/components/common/SecondaryButton";

interface AboutMeDialogProps {
  selectedAboutMe: string | null;
  handleClose: () => void;
}

const AboutMeDialog: React.FC<AboutMeDialogProps> = ({ selectedAboutMe, handleClose }) => {
  return (
    <Dialog
      open={!!selectedAboutMe}
      onClose={handleClose}
      dir="rtl"
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "16px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <DialogTitle
          sx={{
            fontWeight: "bold",
            padding: "20px 24px",
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#f8f9fa",
            borderRadius: "16px 16px 0 0",
          }}
        >
          درباره من
        </DialogTitle>
      </Box>
      <DialogContent sx={{ padding: "24px" }}>
        <Typography
          sx={{
            fontSize: "16px",
            color: "#424242",
            textAlign: "center",
            whiteSpace: "pre-line",
          }}
        >
          {selectedAboutMe}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          padding: "16px 24px",
          borderTop: "1px solid #e0e0e0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <SecondaryButton
            name="بستن"
            backgroundColor="rgb(5, 122, 190)"
            width="100px"
            height="32px"
            fontSize="14px"
            borderRadius="12px"
            onClick={handleClose}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AboutMeDialog;
