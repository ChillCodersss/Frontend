import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
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
  CircularProgress,
  Alert,
  Pagination,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { getToken } from "@/services/auth";
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';
import { Navigate } from 'react-router-dom';

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  majorTitle: string | null;
  gradeLevel: string | null;
  lastGradeGPA: number;
  schoolName: string | null;
  aboutMe: string | null;
  province: string | null;
  picName: string | null;
  picUrl: string | null;
  requestStatus: number;
  createDate: string | null;
}

interface Value {
  items: Student[];
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  totalCount: number;
  filteredCount: number;
}

interface ApiResponse {
  value: Value;
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  error: {
    code: string;
    message: string;
  };
}

const useStudents = (
  currentPage: number,
  pageSize: number,
  majorFilter: string,
  gradeFilter: string,
  statusFilter: string,
  token: string | null
) => {
  const [value, setValue] = useState<Value | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  const getMajorCode = (major: string): number | null => {
    switch (major) {
      case 'ریاضی': return 1;
      case 'تجربی': return 2;
      case 'انسانی': return 3;
      default: return null;
    }
  };

  const getGradeCode = (grade: string): number | null => {
    switch (grade) {
      case 'پایه دهم': return 1;
      case 'پایه یازدهم': return 2;
      case 'پایه دوازدهم': return 3;
      default: return null;
    }
  };

  const fetchImage = async (picUrl: string) => {
    if (!token) return '';
    try {
      const response = await fetch(
        `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(picUrl)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }
      console.error(`Failed to load image for URL ${picUrl}, Status: ${response.status}`);
      return '';
    } catch (error) {
      console.error("Error fetching image:", error);
      return '';
    }
  };

  const fetchStudents = useCallback(async () => {
    if (!token) {
      setError('لطفاً دوباره وارد شوید');
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const majorCode = getMajorCode(majorFilter);
      const gradeCode = getGradeCode(gradeFilter);
      const params: Record<string, any> = {
        PageSize: pageSize,
        PageIndex: currentPage,
        Major: majorCode,
        GradeLevel: gradeCode,
      };

      if (statusFilter === 'فعال') {
        params.Status = 1;
      } else if (statusFilter === 'رد شده') {
        params.Status = 6;
      } else if (statusFilter === 'کنسل کرده') {
        params.Status = 7;
      } else if (statusFilter === 'تایید شده') {
        params.status = 3;
      }

      const response = await axios.get<ApiResponse>(
        'http://62.60.213.13/api/RequestCounselor/GetList',
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.isSuccess) {
        setValue(response.data.value);
        const newImageUrls: Record<string, string> = {};
        for (const student of response.data.value.items) {
          if (student.picUrl) {
          }
        }
        setImageUrls(newImageUrls);
      } else {
        setError(response.data.error.message || 'خطا در دریافت اطلاعات');
        setValue(null);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('خطا در دریافت اطلاعات');
      setValue(null);
    } finally {
      setLoading(false);
    }
  }, [currentPage, majorFilter, gradeFilter, statusFilter, pageSize, token]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  return { value, loading, error, imageUrls, setImageUrls, fetchImage, fetchStudents };
};

const StudentList: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPage, setCurrentPage] = useState(1);
  const [majorFilter, setMajorFilter] = useState<string>('همه');
  const [gradeFilter, setGradeFilter] = useState<string>('همه');
  const [statusFilter, setStatusFilter] = useState<string>('همه');
  const [selectedAboutMe, setSelectedAboutMe] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: 'approve' | 'reject' | null;
    studentId: number | null;
  }>({ open: false, action: null, studentId: null });
  const pageSize = isSmallScreen ? 4 : 4;

  useEffect(() => {
    const fetchedToken = getToken();
    setToken(fetchedToken);
    setTokenLoading(false);
  }, []);

  const { value, loading, error, imageUrls, setImageUrls, fetchImage, fetchStudents } = useStudents(
    currentPage,
    pageSize,
    majorFilter,
    gradeFilter,
    statusFilter,
    token
  );

  const observer = useRef<IntersectionObserver | null>(null);
  const imageElements = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const div = entry.target as HTMLDivElement;
            const picUrl = div.dataset.picUrl;
            if (picUrl && !imageUrls[picUrl]) {
              const imageUrl = await fetchImage(picUrl);
              if (imageUrl) {
                setImageUrls((prev) => ({ ...prev, [picUrl]: imageUrl }));
              }
            }
            observer.current?.unobserve(div);
          }
        });
      },
      { threshold: 0.1 }
    );

    imageElements.current.forEach((div) => {
      if (div) observer.current?.observe(div);
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [imageUrls, fetchImage, setImageUrls]);

  const handlePageChange = useCallback((_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }, []);

  const handleMajorFilterChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newFilter: string) => {
      if (newFilter !== null) {
        setMajorFilter(newFilter);
        setCurrentPage(1);
      }
    },
    []
  );

  const handleGradeFilterChange = useCallback(
    (_: React.MouseEvent<HTMLElement>, newFilter: string) => {
      if (newFilter !== null) {
        setGradeFilter(newFilter);
        setCurrentPage(1);
      }
    },
    []
  );

  const handleStatusFilterChange = useCallback(
    (_: React.SyntheticEvent, newFilter: string) => {
      if (newFilter !== null) {
        setStatusFilter(newFilter);
        setCurrentPage(1);
      }
    },
    []
  );

  const handleShowMore = useCallback((aboutMe: string | null) => {
    setSelectedAboutMe(aboutMe || 'ندارد');
  }, []);

  const handleCloseAboutMeDialog = useCallback(() => {
    setSelectedAboutMe(null);
  }, []);

  const handleOpenConfirmDialog = useCallback((action: 'approve' | 'reject', studentId: number) => {
    setConfirmDialog({ open: true, action, studentId });
  }, []);

  const handleCloseConfirmDialog = useCallback(() => {
    setConfirmDialog({ open: false, action: null, studentId: null });
  }, []);

  const handleConfirmAction = useCallback(async () => {
    if (!token || !confirmDialog.studentId || !confirmDialog.action) return;

    try {
      if (confirmDialog.action === 'approve') {
        const formData = new FormData();
        formData.append('Id', confirmDialog.studentId.toString());

        const response = await axios.post(
          'http://62.60.213.13/api/RequestCounselor/Approve',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          console.log(`Approved student with ID: ${confirmDialog.studentId}`);
          await fetchStudents(); // Refresh the student list
        } else {
          console.error('Failed to approve student:', response.data);
        }
      } else if (confirmDialog.action === 'reject') {
        const response = await axios.post(
          'http://62.60.213.13/api/RequestCounselor/Reject',
          { id: confirmDialog.studentId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200) {
          console.log(`Rejected student with ID: ${confirmDialog.studentId}`);
          await fetchStudents(); // Refresh the student list
        } else {
          console.error('Failed to reject student:', response.data);
        }
      }
    } catch (error) {
      console.error(`Error ${confirmDialog.action}ing student:`, error);
    } finally {
      handleCloseConfirmDialog();
    }
  }, [token, confirmDialog, handleCloseConfirmDialog, fetchStudents]);

  const filteredItems = useMemo(() => value?.items || [], [value]);

  const truncateText = (text: string | null, maxLength: number) => {
    if (!text || text === 'ندارد') return 'ندارد';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  if (tokenLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const content = (
    <Box sx={{ 
      direction: 'rtl', 
      padding: 1, 
      maxWidth: 1200, 
      margin: 'auto',
      overflowX: 'auto'
    }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1.8 }}>
        <Tabs
          value={statusFilter}
          onChange={handleStatusFilterChange}
          centered
          sx={{
            '& .MuiTab-root': {
              fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
              color: '#057abe',
              '&.Mui-selected': {
                color: '#057abe',
                fontWeight: 'bold',
              },
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#057abe',
            },
          }}
        >
          <Tab label="همه" value="همه" />
          <Tab label="فعال" value="فعال" />
          <Tab label="رد شده" value="رد شده" />
          <Tab label="تایید شده" value="تایید شده" />
          <Tab label="کنسل کرده" value="کنسل کرده" />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: isSmallScreen ? 2 : 8,
          mb: 3,
          justifyContent: 'center',
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', textAlign: isSmallScreen ? 'center' : 'right' }}>
            رشته
          </Typography>
          <ToggleButtonGroup
            value={majorFilter}
            exclusive
            onChange={handleMajorFilterChange}
            sx={{
              gap: '6px',
              flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
              justifyContent: 'center',
              '& .MuiToggleButton-root': {
                border: '1px solid #057abe',
                color: '#057abe',
                borderRadius: '8px',
                padding: isSmallScreen ? '6px 8px' : '8px 16px',
                fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                '&.Mui-selected': {
                  backgroundColor: '#057abe',
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: 'rgb(177, 188, 205)',
                },
              },
            }}
          >
            <ToggleButton value="همه">همه</ToggleButton>
            <ToggleButton value="ریاضی">ریاضی</ToggleButton>
            <ToggleButton value="تجربی">تجربی</ToggleButton>
            <ToggleButton value="انسانی">انسانی</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold', textAlign: isSmallScreen ? 'center' : 'right' }}>
            پایه
          </Typography>
          <ToggleButtonGroup
            value={gradeFilter}
            exclusive
            onChange={handleGradeFilterChange}
            sx={{
              gap: '6px',
              flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
              justifyContent: 'center',
              '& .MuiToggleButton-root': {
                border: '1px solid #057abe',
                color: '#057abe',
                borderRadius: "8px",
                padding: isSmallScreen ? '6px 8px' : '8px 16px',
                fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                '&.Mui-selected': {
                  backgroundColor: '#057abe',
                  color: 'white',
                },
                '&:hover': {
                  backgroundColor: 'rgb(177, 188, 205)',
                },
              },
            }}
          >
            <ToggleButton value="همه">همه</ToggleButton>
            <ToggleButton value="پایه دهم">پایه دهم</ToggleButton>
            <ToggleButton value="پایه یازدهم">پایه یازدهم</ToggleButton>
            <ToggleButton value="پایه دوازدهم">پایه دوازدهم</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
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
            <TableContainer 
              component={Paper} 
              sx={{ 
                boxShadow: 3, 
                maxHeight: isSmallScreen ? '60vh' : '70vh', 
                overflowY: 'auto', 
                marginTop: isSmallScreen ? '20px' : '50px',
                minWidth: isSmallScreen ? '100%' : 'auto'
              }}
            >
              <Table stickyHeader size={isSmallScreen ? 'small' : 'medium'}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'grey.100', textAlign: "right" }}>
                    {!isSmallScreen && (
                      <>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>نام</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>رشته</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>پایه تحصیلی</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>معدل</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>مدرسه</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>استان</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>تاریخ ایجاد</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "right", padding: '8px' }}>درباره من</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>عملیات</TableCell>
                      </>
                    )}
                    {isSmallScreen && (
                      <>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '4px' }}>اطلاعات دانش‌آموز</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '4px' }}>عملیات</TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.map((student) => (
                    <TableRow key={student.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                      {!isSmallScreen && (
                        <>
                          <TableCell sx={{ padding: '8px' }}>
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
                          <TableCell sx={{ textAlign: "center", padding: '8px' }}>{student.majorTitle || 'ندارد'}</TableCell>
                          <TableCell sx={{ textAlign: "center", padding: '8px' }}>{student.gradeLevel || 'ندارد'}</TableCell>
                          <TableCell sx={{ textAlign: "center", padding: '8px' }}>{student.lastGradeGPA}</TableCell>
                          <TableCell sx={{ textAlign: "center", padding: '8px' }}>{student.schoolName || 'ندارد'}</TableCell>
                          <TableCell sx={{ textAlign: "center", padding: '8px' }}>{student.province || 'ندارد'}</TableCell>
                          <TableCell sx={{ textAlign: "center", padding: '8px' }}>{student.createDate || 'ندارد'}</TableCell>
                          <TableCell sx={{ padding: '8px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography>
                                {truncateText(student.aboutMe, 20)}
                              </Typography>
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
                          <TableCell sx={{ padding: '8px' }}>
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
                              <Typography sx={{ color: 'orange', textAlign: 'center' }}>کنسل کرده</Typography>
                            ) : (
                              <Typography sx={{ textAlign: 'center' }}>-</Typography>
                            )}
                          </TableCell>
                        </>
                      )}
                      {isSmallScreen && (
                        <>
                          <TableCell sx={{ padding: '4px' }}>
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
                                  <strong>استان:</strong> {student.province}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>مدرسه:</strong> {student.schoolName}
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
                          <TableCell sx={{ padding: '4px' }}>
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
                              <Typography variant="caption" sx={{ color: 'red', textAlign: 'center' }}>رد شده</Typography>
                            ) : student.requestStatus === 3 || student.requestStatus === 4 ? (
                              <Typography variant="caption" sx={{ color: 'green', textAlign: 'center' }}>تایید شده</Typography>
                            ) : student.requestStatus === 7 ? (
                              <Typography variant="caption" sx={{ color: 'orange', textAlign: 'center' }}>کنسل کرده</Typography>
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

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={value?.totalPages || 1}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              dir="rtl"
              size={isSmallScreen ? 'small' : 'medium'}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: '#057abe',
                  '&.Mui-selected': {
                    backgroundColor: '#057abe',
                    color: 'white',
                  },
                  '&.MuiPaginationItem-previousNext': {
                    transform: 'rotate(180deg)',
                  },
                },
              }}
            />
          </Box>
        </>
      )}

      <Dialog
        open={!!selectedAboutMe}
        onClose={handleCloseAboutMeDialog}
        dir="rtl"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 'bold' }}>
          درباره من
        </DialogTitle>
        <DialogContent>
          <Typography>{selectedAboutMe}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAboutMeDialog} color="primary">
            بستن
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={confirmDialog.open}
        onClose={handleCloseConfirmDialog}
        dir="rtl"
        maxWidth="xs"
        fullWidth
      >
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
          <Button onClick={handleCloseConfirmDialog} color="primary">
            لغو
          </Button>
          <Button onClick={handleConfirmAction} color="primary" autoFocus>
            تأیید
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  return (
    <>
      <Header />
      <Sidebar>{content}</Sidebar>
    </>
  );
};

export default StudentList;