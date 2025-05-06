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
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import axios from 'axios';
import { getToken } from "@/services/auth";
import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

// TypeScript interfaces
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

const token = getToken();

// Custom hook for fetching students
const useStudents = (
  currentPage: number,
  pageSize: number,
  majorFilter: string,
  gradeFilter: string
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
    try {
      setLoading(true);
      setError(null);
      const majorCode = getMajorCode(majorFilter);
      const gradeCode = getGradeCode(gradeFilter);
      const response = await axios.get<ApiResponse>(
        'http://62.60.213.13/api/RequestCounselor/GetList',
        {
          params: { PageSize: pageSize, PageIndex: currentPage, Major: majorCode, GradeLevel: gradeCode },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.isSuccess) {
        setValue(response.data.value);
        const newImageUrls: Record<string, string> = {};
        for (const student of response.data.value.items) {
          if (student.picUrl) {
            newImageUrls[student.picUrl] = ''; // Placeholder for lazy loading
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
  }, [currentPage, majorFilter, gradeFilter, pageSize]);

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      Object.values(imageUrls).forEach((url) => url && URL.revokeObjectURL(url));
    };
  }, [imageUrls]);

  return { value, loading, error, imageUrls, setImageUrls, fetchImage };
};

// StudentList component
const StudentList: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm')); // 600px or smaller
  const [currentPage, setCurrentPage] = useState(1);
  const [majorFilter, setMajorFilter] = useState<string>('همه');
  const [gradeFilter, setGradeFilter] = useState<string>('همه');
  const [selectedAboutMe, setSelectedAboutMe] = useState<string | null>(null);
  const [actionStatus, setActionStatus] = useState<Record<number, 'approved' | 'rejected' | null>>({});
  const pageSize = isSmallScreen ? 2 : 4;

  const { value, loading, error, imageUrls, setImageUrls, fetchImage } = useStudents(
    currentPage,
    pageSize,
    majorFilter,
    gradeFilter
  );

  // Lazy loading images with IntersectionObserver
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

  const handlePageChange = useCallback((event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  }, []);

  const handleMajorFilterChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
      if (newFilter !== null) {
        setMajorFilter(newFilter);
        setCurrentPage(1);
      }
    },
    []
  );

  const handleGradeFilterChange = useCallback(
    (event: React.MouseEvent<HTMLElement>, newFilter: string) => {
      if (newFilter !== null) {
        setGradeFilter(newFilter);
        setCurrentPage(1);
      }
    },
    []
  );

  const handleShowMore = useCallback((aboutMe: string | null) => {
    setSelectedAboutMe(aboutMe || 'ندارد');
  }, []);

  const handleCloseDialog = useCallback(() => {
    setSelectedAboutMe(null);
  }, []);

  const handleApprove = useCallback(async (studentId: number) => {
    try {
      const formData = new FormData();
      formData.append('Id', studentId.toString());

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
        console.log(`Approved student with ID: ${studentId}`);
        setActionStatus((prev) => ({ ...prev, [studentId]: 'approved' }));
      } else {
        console.error('Failed to approve student:', response.data);
      }
    } catch (error) {
      console.error('Error approving student:', error);
    }
  }, []);

  const handleReject = useCallback(async (studentId: number) => {
    try {
      const response = await axios.post(
        'http://62.60.213.13/api/RequestCounselor/Reject',
        { id: studentId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log(`Rejected student with ID: ${studentId}`);
        setActionStatus((prev) => ({ ...prev, [studentId]: 'rejected' }));
      } else {
        console.error('Failed to reject student:', response.data);
      }
    } catch (error) {
      console.error('Error rejecting student:', error);
    }
  }, []);

  // Memoize filtered items
  const filteredItems = useMemo(() => value?.items || [], [value]);

  // Truncate text for About Me
  const truncateText = (text: string | null, maxLength: number) => {
    if (!text || text === 'ندارد') return 'ندارد';
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  const content = (
    <Box sx={{ 
      direction: 'rtl', 
      padding: isSmallScreen ? 1 : 3, 
      maxWidth: 1200, 
      margin: 'auto',
      overflowX: 'auto'
    }}>
      {/* Filter Controls */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: 2,
          mb: 3,
          justifyContent: 'center',
        }}
      >
        <Box>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', textAlign: isSmallScreen ? 'center' : 'right' }}>
            فیلتر رشته
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
                color: ' #057abe',
                borderRadius: '8px',
                padding: isSmallScreen ? '6px 8px' : '8px 16px',
                fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                '&.Mui-selected': {
                  backgroundColor: ' #057abe',
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
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'medium', textAlign: isSmallScreen ? 'center' : 'right' }}>
            فیلتر پایه
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
                color: ' #057abe',
                borderRadius: "8px",
                padding: isSmallScreen ? '6px 8px' : '8px 16px',
                fontSize: isSmallScreen ? '0.75rem' : '0.875rem',
                '&.Mui-selected': {
                  backgroundColor: ' #057abe',
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
                // marginBottom: '35px',
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
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>سطح تحصیلی</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>معدل</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>مدرسه</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: "center", padding: '8px' }}>استان</TableCell>
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
                          <TableCell sx={{ padding: '8px' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography>
                                {truncateText(student.aboutMe, 20)}
                              </Typography>
                              {student.aboutMe && student.aboutMe.length > 20 && (
                                <Button
                                  size="small"
                                  onClick={() => handleShowMore(student.aboutMe)}
                                  sx={{ color: ' #057abe' }}
                                >
                                  نمایش بیشتر
                                </Button>
                              )}
                            </Box>
                          </TableCell>
                          <TableCell sx={{ padding: '8px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                              <IconButton
                                onClick={() => handleApprove(student.id)}
                                disabled={!!actionStatus[student.id]}
                                sx={{ color: actionStatus[student.id] === 'approved' ? 'green' : 'green' }}
                              >
                                <CheckCircle />
                              </IconButton>
                              <IconButton
                                onClick={() => handleReject(student.id)}
                                disabled={!!actionStatus[student.id]}
                                sx={{ color: actionStatus[student.id] === 'rejected' ? 'red' : 'red' }}
                              >
                                <Cancel />
                              </IconButton>
                            </Box>
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
                              </Box>
                              <Typography variant="caption" sx={{ display: 'flex', gap: 1 }}>
                                <strong>درباره من:</strong> 
                                {truncateText(student.aboutMe, 15)}
                                {student.aboutMe && student.aboutMe.length > 15 && (
                                  <Button
                                    size="small"
                                    onClick={() => handleShowMore(student.aboutMe)}
                                    sx={{ color: ' #057abe', padding: 0, minWidth: 'auto' }}
                                  >
                                    بیشتر
                                  </Button>
                                )}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ padding: '4px' }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleApprove(student.id)}
                                disabled={!!actionStatus[student.id]}
                                sx={{ color: actionStatus[student.id] === 'approved' ? 'green' : 'green' }}
                              >
                                <CheckCircle fontSize="small" />
                              </IconButton>
                              <IconButton
                                size="small"
                                onClick={() => handleReject(student.id)}
                                disabled={!!actionStatus[student.id]}
                                sx={{ color: actionStatus[student.id] === 'rejected' ? 'red' : 'red' }}
                              >
                                <Cancel fontSize="small" />
                              </IconButton>
                            </Box>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/* Pagination */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Pagination
              count={value.totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              dir="rtl"
              size={isSmallScreen ? 'small' : 'medium'}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: ' #057abe',
                  '&.Mui-selected': {
                    backgroundColor: ' #057abe',
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

      {/* About Me Dialog */}
      <Dialog
        open={!!selectedAboutMe}
        onClose={handleCloseDialog}
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
          <Button onClick={handleCloseDialog} color="primary">
            بستن
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