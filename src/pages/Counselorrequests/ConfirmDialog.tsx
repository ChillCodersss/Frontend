import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import { ConfirmDialogState } from "./types";
import SecondaryButton from "@/components/common/SecondaryButton"; // adjust the path if needed

interface ConfirmDialogProps {
  confirmDialog: ConfirmDialogState;
  handleClose: () => void;
  handleConfirm: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  confirmDialog,
  handleClose,
  handleConfirm,
}) => {
  const isApprove = confirmDialog.action === "approve";

  return (
    <Dialog
      open={confirmDialog.open}
      onClose={handleClose}
      dir="rtl"
      fullWidth
      maxWidth="xs"
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
          {isApprove ? "تأیید درخواست" : "رد درخواست"}
        </DialogTitle>
      </Box>
      <DialogContent sx={{ padding: "24px" }}>
        <Typography
          sx={{ fontSize: "17.6px", color: "#424242", textAlign: "center" }}
        >
          {isApprove
            ? "آیا از تأیید درخواست اطمینان دارید؟"
            : "آیا از رد درخواست اطمینان دارید؟"}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{ padding: "16px 24px", borderTop: "1px solid #e0e0e0" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            width: "100%",
          }}
        >
          <SecondaryButton
            name="لغو"
            backgroundColor="rgb(221, 84, 84)"
            width="100px"
            height="32px"
            fontSize="14px"
            borderRadius="12px"
            onClick={handleClose}
          />
          <SecondaryButton
            name="تأیید"
            backgroundColor="rgb(5, 190, 30)"
            width="100px"
            height="32px"
            fontSize="14px"
            borderRadius="12px"
            onClick={handleConfirm}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
