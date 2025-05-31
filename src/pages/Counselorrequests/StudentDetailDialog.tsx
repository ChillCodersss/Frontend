import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box } from '@mui/material';
import { StudentDetailsDialogProps } from './types';
import { styles } from './styles';

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
      dir= 'rtl'
      maxWidth= 'xs'
      fullWidth
      sx={styles.studentDetailsDialog}
    >
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
          {`${student.firstName} ${student.lastName}`}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
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
              <strong>درباره من:</strong> {student.aboutMe ? student.aboutMe.slice(0, 15) + (student.aboutMe.length > 15 ? '...' : '') : 'ندارد'}
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
      <DialogActions>
        <Button onClick={handleClose} sx={{ color: '#057abe' }}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetailsDialog;