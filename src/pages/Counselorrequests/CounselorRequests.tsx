import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Box, CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { getToken } from "@/services/auth";
import { Value, ApiResponse, RequestParams, ConfirmDialogState } from './types';
import { styles } from './styles';
import FilterSection from './FilterSection';
import StudentTable from './StudentTable';
import AboutMeDialog from './AboutMeDialog';
import ConfirmDialog from './ConfirmDialog';
import PaginationControls from './PaginationControls';

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
      const params: RequestParams = {
        PageSize: pageSize,
        PageIndex: currentPage,
        Major: majorCode,
        GradeLevel: gradeCode,
      };

      if (statusFilter === 'فعال') params.Status = 1;
      else if (statusFilter === 'رد شده') params.Status = 6;
      else if (statusFilter === 'لغو شده') params.Status = 7;
      else if (statusFilter === 'تایید شده') params.Status = 3;

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
            const imageUrl = await fetchImage(student.picUrl);
            if (imageUrl) newImageUrls[student.picUrl] = imageUrl;
          }
        }
        setImageUrls(newImageUrls);
      } else {
        setError(response.data.error?.message || 'خطا در دریافت اطلاعات');
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

const CounselorRequests: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [currentPage, setCurrentPage] = useState(1);
  const [majorFilter, setMajorFilter] = useState<string>('همه');
  const [gradeFilter, setGradeFilter] = useState<string>('همه');
  const [statusFilter, setStatusFilter] = useState<string>('همه');
  const [selectedAboutMe, setSelectedAboutMe] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    action: null,
    studentId: null,
  });
  const pageSize = isSmallScreen ? 4 : 4;
  const imageElements = useRef<Map<string, HTMLDivElement>>(new Map());

  const { value, loading, error, imageUrls, setImageUrls, fetchImage, fetchStudents } = useStudents(
    currentPage,
    pageSize,
    majorFilter,
    gradeFilter,
    statusFilter,
    token
  );

  useEffect(() => {
    const fetchedToken = getToken();
    setToken(fetchedToken);
    setTokenLoading(false);
  }, []);

  const observer = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const div = entry.target as HTMLDivElement;
            const picUrl = div.dataset.picUrl;
            if (picUrl && !imageUrls[picUrl]) {
              const imageUrl = await fetchImage(picUrl);
              if (imageUrl) setImageUrls((prev) => ({ ...prev, [picUrl]: imageUrl }));
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
          await fetchStudents();
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
          await fetchStudents();
        }
      }
    } catch (error) {
      console.error(`Error ${confirmDialog.action}ing student:`, error);
    } finally {
      handleCloseConfirmDialog();
    }
  }, [token, confirmDialog, handleCloseConfirmDialog, fetchStudents]);

  if (tokenLoading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
        <Box sx={styles.container}>
          <FilterSection
            statusFilter={statusFilter}
            majorFilter={majorFilter}
            gradeFilter={gradeFilter}
            handleStatusFilterChange={handleStatusFilterChange}
            handleMajorFilterChange={handleMajorFilterChange}
            handleGradeFilterChange={handleGradeFilterChange}
            isSmallScreen={isSmallScreen}
          />
          <StudentTable
            value={value}
            loading={loading}
            error={error}
            imageUrls={imageUrls}
            imageElements={imageElements}
            handleShowMore={handleShowMore}
            handleOpenConfirmDialog={handleOpenConfirmDialog}
            isSmallScreen={isSmallScreen}
          />
          <PaginationControls
            totalPages={value?.totalPages || 1}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            isSmallScreen={isSmallScreen}
          />
          <AboutMeDialog
            selectedAboutMe={selectedAboutMe}
            handleClose={handleCloseAboutMeDialog}
          />
          <ConfirmDialog
            confirmDialog={confirmDialog}
            handleClose={handleCloseConfirmDialog}
            handleConfirm={handleConfirmAction}
          />
        </Box>
    </>
  );
};

export default CounselorRequests;