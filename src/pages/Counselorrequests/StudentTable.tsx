import React, { useMemo, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Button,
  IconButton,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { Value, Student } from './types';
import { styles } from './styles';
import StudentDetailsDialog from './StudentDetailDialog';
import defaultProfilePic from '@/assets/DefaultPerson.png';

interface StudentTableProps {
  value: Value | null;
  loading: boolean;
  error: string | null;
  imageUrls: Record<string, string>;
  imageElements: React.MutableRefObject<Map<string, HTMLDivElement>>;
  handleShowMore: (aboutMe: string | null) => void;
  handleOpenConfirmDialog: (action: 'approve' | 'reject', studentId: number) => void;
  isSmallScreen: boolean;
}

// Utility function to convert numbers to Persian digits
const toPersianDigits = (number: number | string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return number
    .toString()
    .replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
};

const StudentTable: React.FC<StudentTableProps> = ({
  value,
  loading,
  error,
  imageUrls,
  imageElements,
  handleShowMore,
  handleOpenConfirmDialog,
  isSmallScreen,
}) => {
  const theme = useTheme();
  const isVerySmallScreen = useMediaQuery(theme.breakpoints.down(350));
  const filteredItems = useMemo(() => value?.items || [], [value]);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text || text === 'ندارد') return 'ندارد';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const handleImageError = (picUrl: string | null) => {
    if (picUrl) {
      setFailedImages((prev) => new Set(prev).add(picUrl));
    }
  };

  const handleOpenDetailsDialog = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseDetailsDialog = () => {
    setSelectedStudent(null);
  };

  return (
    <>
      {loading && (
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={24} />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3, width: '100%' }}>
          {error}
        </Alert>
      )}
      {!loading && !error && !value && (
        <Typography sx={{ textAlign: 'center', py: 4, width: '100%' }}>
          داده‌ای یافت نشد
        </Typography>
      )}
      {!loading && !error && value && (
        <>
          {filteredItems.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 2, width: '100%' }}>
              دانش‌آموزی یافت نشد
            </Typography>
          ) : isVerySmallScreen ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: '8px' }}>
              {filteredItems.map((student: Student) => (
                <Paper key={student.id} sx={{ padding: '12px', display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    data-pic-url={student.picUrl}
                    ref={(el: HTMLDivElement) => {
                      if (el && student.picUrl) imageElements.current.set(student.picUrl, el);
                    }}
                  >
                    <Avatar
                      src={
                        student.picUrl && imageUrls[student.picUrl] && !failedImages.has(student.picUrl)
                          ? imageUrls[student.picUrl]
                          : defaultProfilePic
                      }
                      alt={`${student.firstName} ${student.lastName}`}
                      sx={{ width: 48, height: 48 }}
                      imgProps={{ onError: () => handleImageError(student.picUrl) }}
                    />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {`${student.firstName} ${student.lastName}`}
                    </Typography>
                    <Button
                      size="small"
                      onClick={() => handleOpenDetailsDialog(student)}
                      sx={{ color: '#057abe', fontSize: '0.8rem', padding: '4px 8px' }}
                      aria-label="جزئیات دانش‌آموز"
                    >
                      جزئیات
                    </Button>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {student.requestStatus === 1 ? (
                      <>
                        <IconButton
                          size="medium"
                          onClick={() => handleOpenConfirmDialog('approve', student.id)}
                          sx={{ color: 'green', padding: '8px' }}
                          aria-label="تأیید درخواست"
                        >
                          <CheckCircle fontSize="medium" />
                        </IconButton>
                        <IconButton
                          size="medium"
                          onClick={() => handleOpenConfirmDialog('reject', student.id)}
                          sx={{ color: 'red', padding: '8px' }}
                          aria-label="رد درخواست"
                        >
                          <Cancel fontSize="medium" />
                        </IconButton>
                      </>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{
                          color:
                            student.requestStatus === 6
                              ? 'red'
                              : student.requestStatus === 3
                              ? 'green'
                              : student.requestStatus === 7
                              ? 'orange'
                              : 'inherit',
                          fontSize: '0.9rem',
                        }}
                      >
                        {student.requestStatus === 6
                          ? 'رد'
                          : student.requestStatus === 3
                          ? 'تایید'
                          : student.requestStatus === 7
                          ? 'لغو'
                          : '-'}
                      </Typography>
                    )}
                  </Box>
                </Paper>
              ))}
            </Box>
          ) : (
            <TableContainer component={Paper} sx={styles.tableContainer}>
              <Table stickyHeader size={isSmallScreen ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow sx={styles.tableHead}>
                    {!isSmallScreen && (
                      <>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>نام</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>رشته</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>پایه تحصیلی</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>معدل</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>مدرسه</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>استان</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>تاریخ ایجاد</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell, textAlign: 'right' }}>
                          درباره من
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>وضعیت</TableCell>
                      </>
                    )}
                    {isSmallScreen && (
                      <>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell, width: '40%' }}>دانش‌آموز</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell, width: '30%' }}>جزئیات</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell, width: '30%' }}>وضعیت</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.map((student: Student) => (
                    <TableRow key={student.id} sx={styles.tableRow}>
                      {!isSmallScreen && (
                        <>
                          <TableCell sx={styles.tableCell}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingRight: '16px' }}>
                              <Box
                                data-pic-url={student.picUrl}
                                ref={(el: HTMLDivElement) => {
                                  if (el && student.picUrl) imageElements.current.set(student.picUrl, el);
                                }}
                              >
                                {student.picUrl && imageUrls[student.picUrl] && !failedImages.has(student.picUrl) ? (
                                  <Avatar
                                    src={imageUrls[student.picUrl]}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    sx={{ width: 60, height: 60, margin: 0 }}
                                    imgProps={{ onError: () => handleImageError(student.picUrl) }}
                                  />
                                ) : (
                                  <Avatar
                                    src={defaultProfilePic}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    sx={{ width: 60, height: 60, bgcolor: 'grey.300', margin: 0 }}
                                  >
                                    {student.firstName.charAt(0)}
                                  </Avatar>
                                )}
                              </Box>
                              <Typography sx={{ marginRight: 1, fontWeight: 'bold', fontSize: '0.9rem' }}>
                                {`${student.firstName} ${student.lastName}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>{student.majorTitle || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.gradeLevel || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{toPersianDigits(student.lastGradeGPA)}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.schoolName || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.province || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.createDate ? toPersianDigits(student.createDate) : 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography>{truncateText(student.aboutMe, 20)}</Typography>
                              {student.aboutMe && student.aboutMe.length > 20 && (
                                <Button
                                  size="small"
                                  onClick={() => handleShowMore(student.aboutMe)}
                                  sx={{ color: '#057abe', fontSize: '0.8rem' }}
                                  aria-label="نمایش بیشتر درباره من"
                                >
                                  نمایش بیشتر
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {student.requestStatus === 1 ? (
                              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                <IconButton
                                  size="medium"
                                  onClick={() => handleOpenConfirmDialog('approve', student.id)}
                                  sx={{ color: 'green', padding: '8px' }}
                                  aria-label="تأیید درخواست"
                                >
                                  <CheckCircle fontSize="medium" />
                                </IconButton>
                                <IconButton
                                  size="medium"
                                  onClick={() => handleOpenConfirmDialog('reject', student.id)}
                                  sx={{ color: 'red', padding: '8px' }}
                                  aria-label="رد درخواست"
                                >
                                  <Cancel fontSize="medium" />
                                </IconButton>
                              </Box>
                            ) : (
                              <Typography
                                sx={{
                                  color:
                                    student.requestStatus === 6
                                      ? 'red'
                                      : student.requestStatus === 3
                                      ? 'green'
                                      : student.requestStatus === 7
                                      ? 'orange'
                                      : 'inherit',
                                  textAlign: 'center',
                                  fontSize: '0.9rem',
                                }}
                              >
                                {student.requestStatus === 6
                                  ? 'رد شده'
                                  : student.requestStatus === 3
                                  ? 'تایید شده'
                                  : student.requestStatus === 7
                                  ? 'لغو شده'
                                  : '-'}
                              </Typography>
                            )}
                          </TableCell>
                        </>
                      )}
                      {isSmallScreen && (
                        <>
                          <TableCell sx={{ ...styles.tableCell, padding: '6px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'flex-end' }}>
                              <Box
                                data-pic-url={student.picUrl}
                                ref={(el: HTMLDivElement) => {
                                  if (el && student.picUrl) imageElements.current.set(student.picUrl, el);
                                }}
                              >
                                {student.picUrl && imageUrls[student.picUrl] && !failedImages.has(student.picUrl) ? (
                                  <Avatar
                                    src={imageUrls[student.picUrl]}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    sx={{ width: 40, height: 40 }}
                                    imgProps={{ onError: () => handleImageError(student.picUrl) }}
                                  />
                                ) : (
                                  <Avatar
                                    src={defaultProfilePic}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    sx={{ width: 40, height: 40, bgcolor: 'grey.300' }}
                                  >
                                    {student.firstName.charAt(0)}
                                  </Avatar>
                                )}
                              </Box>
                              <Typography variant="body2" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                                {`${student.firstName} ${student.lastName}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ ...styles.tableCell, padding: '6px' }}>
                            <Button
                              size="small"
                              onClick={() => handleOpenDetailsDialog(student)}
                              sx={{ color: '#057abe', fontSize: '0.8rem', padding: '6px 12px' }}
                              aria-label="جزئیات دانش‌آموز"
                            >
                              جزئیات
                            </Button>
                          </TableCell>
                          <TableCell sx={{ ...styles.tableCell, padding: '6px' }}>
                            {student.requestStatus === 1 ? (
                              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                                <IconButton
                                  size="medium"
                                  onClick={() => handleOpenConfirmDialog('approve', student.id)}
                                  sx={{ color: 'green', padding: '8px' }}
                                  aria-label="تأیید درخواست"
                                >
                                  <CheckCircle fontSize="medium" />
                                </IconButton>
                                <IconButton
                                  size="medium"
                                  onClick={() => handleOpenConfirmDialog('reject', student.id)}
                                  sx={{ color: 'red', padding: '8px' }}
                                  aria-label="رد درخواست"
                                >
                                  <Cancel fontSize="medium" />
                                </IconButton>
                              </Box>
                            ) : (
                              <Typography
                                variant="body2"
                                sx={{
                                  color:
                                    student.requestStatus === 6
                                      ? 'red'
                                      : student.requestStatus === 3
                                      ? 'green'
                                      : student.requestStatus === 7
                                      ? 'orange'
                                      : 'inherit',
                                  textAlign: 'center',
                                  fontSize: '0.9rem',
                                }}
                              >
                                {student.requestStatus === 6
                                  ? 'رد'
                                  : student.requestStatus === 3
                                  ? 'تایید'
                                  : student.requestStatus === 7
                                  ? 'لغو'
                                  : '-'}
                              </Typography>
                            )}
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {isSmallScreen && (
            <StudentDetailsDialog
              open={!!selectedStudent}
              student={selectedStudent}
              handleClose={handleCloseDetailsDialog}
              handleShowMore={handleShowMore}
            />
          )}
        </>
      )}
    </>
  );
};

export default StudentTable;