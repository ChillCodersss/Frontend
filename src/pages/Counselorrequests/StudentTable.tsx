import React, { useMemo } from 'react';
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
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { Value, Student } from './types';
import { styles } from './styles';

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
  const filteredItems = useMemo(() => value?.items || [], [value]);

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text || text === 'ندارد') return 'ندارد';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <>
      {loading && (
        <Box sx={styles.loadingContainer}>
          <CircularProgress size={24} />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && !value && (
        <Typography sx={{ textAlign: 'center', py: 4 }}>
          داده‌ای یافت نشد
        </Typography>
      )}
      {!loading && !error && value && (
        <>
          {filteredItems.length === 0 ? (
            <Typography sx={{ textAlign: 'center', py: 2 }}>
              دانش‌آموزی یافت نشد
            </Typography>
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
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>
                          اطلاعات دانش‌آموز
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', ...styles.tableCell }}>وضعیت</TableCell>
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
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                              <Box
                                data-pic-url={student.picUrl}
                                ref={(el: HTMLDivElement) => {
                                  if (el && student.picUrl) imageElements.current.set(student.picUrl, el);
                                }}
                              >
                                {student.picUrl && imageUrls[student.picUrl] ? (
                                  <Avatar
                                    src={imageUrls[student.picUrl]}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    sx={{ width: 60, height: 60, margin: 0 }}
                                  />
                                ) : (
                                  <Avatar sx={{ width: 60, height: 60, bgcolor: 'grey.300', margin: 0 }}>
                                    {student.firstName.charAt(0)}
                                  </Avatar>
                                )}
                              </Box>
                              <Typography sx={{ marginRight: 1, fontWeight: 'bold' }}>
                                {`${student.firstName} ${student.lastName}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>{student.majorTitle || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.gradeLevel || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.lastGradeGPA}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.schoolName || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.province || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>{student.createDate || 'ندارد'}</TableCell>
                          <TableCell sx={styles.tableCell}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography>{truncateText(student.aboutMe, 20)}</Typography>
                              {student.aboutMe && student.aboutMe.length > 20 && (
                                <Button
                                  size="small"
                                  onClick={() => handleShowMore(student.aboutMe)}
                                  sx={{ color: '#057abe' }}
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
                                  onClick={() => handleOpenConfirmDialog('approve', student.id)}
                                  sx={{ color: 'green' }}
                                >
                                  <CheckCircle />
                                </IconButton>
                                <IconButton
                                  onClick={() => handleOpenConfirmDialog('reject', student.id)}
                                  sx={{ color: 'red' }}
                                >
                                  <Cancel />
                                </IconButton>
                              </Box>
                            ) : student.requestStatus === 6 ? (
                              <Typography sx={{ color: 'red', textAlign: 'center' }}>رد شده</Typography>
                            ) : student.requestStatus === 3 ? (
                              <Typography sx={{ color: 'green', textAlign: 'center' }}>تایید شده</Typography>
                            ) : student.requestStatus === 7 ? (
                              <Typography sx={{ color: 'orange', textAlign: 'center' }}>لغو شده</Typography>
                            ) : (
                              <Typography sx={{ textAlign: 'center' }}>-</Typography>
                            )}
                          </TableCell>
                        </>
                      )}
                      {isSmallScreen && (
                        <>
                          <TableCell sx={styles.tableCell}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box
                                  data-pic-url={student.picUrl}
                                  ref={(el: HTMLDivElement) => {
                                    if (el && student.picUrl) imageElements.current.set(student.picUrl, el);
                                  }}
                                >
                                  {student.picUrl && imageUrls[student.picUrl] ? (
                                    <Avatar
                                      src={imageUrls[student.picUrl]}
                                      alt={`${student.firstName} ${student.lastName}`}
                                      sx={{ width: 40, height: 40 }}
                                    />
                                  ) : (
                                    <Avatar sx={{ width: 40, height: 40, bgcolor: 'grey.300' }}>
                                      {student.firstName.charAt(0)}
                                    </Avatar>
                                  )}
                                </Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                                  {`${student.firstName} ${student.lastName}`}
                                </Typography>
                              </Box>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                <Typography variant="caption">
                                  <strong>رشته:</strong> {student.majorTitle || 'ندارد'}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>پایه:</strong> {student.gradeLevel || 'ندارد'}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>معدل:</strong> {student.lastGradeGPA}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>استان:</strong> {student.province || 'ندارد'}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>مدرسه:</strong> {student.schoolName || 'ندارد'}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>تاریخ ایجاد:</strong> {student.createDate || 'ندارد'}
                                </Typography>
                              </Box>
                              <Typography variant="caption" sx={{ display: 'flex', gap: 1 }}>
                                <strong>درباره من:</strong>
                                {truncateText(student.aboutMe, 15)}
                                {student.aboutMe && student.aboutMe.length > 15 && (
                                  <Button
                                    size="small"
                                    onClick={() => handleShowMore(student.aboutMe)}
                                    sx={{ color: '#057abe', padding: 0, minWidth: 'auto' }}
                                  >
                                    بیشتر
                                  </Button>
                                )}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={styles.tableCell}>
                            {student.requestStatus === 1 ? (
                              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenConfirmDialog('approve', student.id)}
                                  sx={{ color: 'green' }}
                                >
                                  <CheckCircle fontSize="small" />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  onClick={() => handleOpenConfirmDialog('reject', student.id)}
                                  sx={{ color: 'red' }}
                                >
                                  <Cancel fontSize="small" />
                                </IconButton>
                              </Box>
                            ) : student.requestStatus === 6 ? (
                              <Typography variant="caption" sx={{ color: 'red', textAlign: 'center' }}>
                                رد شده
                              </Typography>
                            ) : student.requestStatus === 3 ? (
                              <Typography variant="caption" sx={{ color: 'green', textAlign: 'center' }}>
                                تایید شده
                              </Typography>
                            ) : student.requestStatus === 7 ? (
                              <Typography variant="caption" sx={{ color: 'orange', textAlign: 'center' }}>
                                لغو شده
                              </Typography>
                            ) : (
                              <Typography variant="caption" sx={{ textAlign: 'center' }}>-</Typography>
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
        </>
      )}
    </>
  );
};

export default StudentTable;