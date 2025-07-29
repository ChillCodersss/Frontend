import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from '@mui/material';
import { StudentDetailsDialogProps } from './types';
import SecondaryButton from "@/components/common/SecondaryButton";

const StudentDetailsDialog: React.FC<StudentDetailsDialogProps> = ({
  open,
  student,
  handleClose,
  handleShowMore,
}) => {
  if (!student) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      dir="rtl"
      maxWidth="xs"
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
            textAlign: "center",
          }}
        >
          {`${student.firstName} ${student.lastName}`}
        </DialogTitle>
      </Box>

      <DialogContent sx={{ padding: "24px" }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2">
            <strong>رشته:</strong> {student.majorTitle || 'ندارد'}
          </Typography>
          <Typography variant="body2">
            <strong>پایه:</strong> {student.gradeLevel || 'ندارد'}
          </Typography>
          <Typography variant="body2">
            <strong>معدل:</strong> {student.lastGradeGPA}
          </Typography>
          <Typography variant="body2">
            <strong>مدرسه:</strong> {student.schoolName || 'ندارد'}
          </Typography>
          <Typography variant="body2">
            <strong>استان:</strong> {student.province || 'ندارد'}
          </Typography>
          <Typography variant="body2">
            <strong>تاریخ ایجاد:</strong> {student.createDate || 'ندارد'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2">
              <strong>درباره من:</strong>{' '}
              {student.aboutMe
                ? student.aboutMe.slice(0, 15) +
                  (student.aboutMe.length > 15 ? '...' : '')
                : 'ندارد'}
            </Typography>
            {student.aboutMe && student.aboutMe.length > 15 && (
              <Button
                size="small"
                onClick={() => handleShowMore(student.aboutMe)}
                sx={{ color: '#057abe', padding: 0, minWidth: 'auto' }}
              >
                بیشتر
              </Button>
            )}
          </Box>
        </Box>
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

export default StudentDetailsDialog;
