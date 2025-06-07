import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
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
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
} from "@mui/material";
import axios from "axios";
import { getToken } from "@/services/auth";
import { Navigate } from "react-router-dom";
import StudentDisplayPopup from "@/components/StudentDisplay/StudentDisplay";

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
  studentId: number;
  remainingDays: number | null;
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

  interface RequestParams {
    PageSize: number;
    PageIndex: number;
    Major: number | null;
    GradeLevel: number | null;
    Status?: number;
  }

  const getMajorCode = (major: string): number | null => {
    switch (major) {
      case "ریاضی":
        return 1;
      case "تجربی":
        return 2;
      case "انسانی":
        return 3;
      default:
        return null;
    }
  };

  const getGradeCode = (grade: string): number | null => {
    switch (grade) {
      case "پایه دهم":
        return 1;
      case "پایه یازدهم":
        return 2;
      case "پایه دوازدهم":
        return 3;
      default:
        return null;
    }
  };

  const fetchImage = async (picUrl: string) => {
    if (!token) return "";
    try {
      const response = await fetch(
        `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(
          picUrl
        )}`,
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
      console.error(
        `Failed to load image for URL ${picUrl}, Status: ${response.status}`
      );
      return "";
    } catch (error) {
      console.error("Error fetching image:", error);
      return "";
    }
  };

  const fetchStudents = useCallback(async () => {
    if (!token) {
      setError("لطفاً دوباره وارد شوید");
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

      if (statusFilter === "فعال") {
        params.Status = 4;
      } else if (statusFilter === "گذشته") {
        params.Status = 5;
      }
      const response = await axios.get<ApiResponse>(
        "http://62.60.213.13/api/RequestCounselor/MyStudents",
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
            if (imageUrl) {
              newImageUrls[student.picUrl] = imageUrl;
            }
          }
        }
        setImageUrls(newImageUrls);
      } else {
        setError(response.data.error.message || "خطا در دریافت اطلاعات");
        setValue(null);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setError("خطا در دریافت اطلاعات");
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
      Object.values(imageUrls).forEach(
        (url) => url && URL.revokeObjectURL(url)
      );
    };
  }, [imageUrls]);

  return {
    value,
    loading,
    error,
    imageUrls,
    setImageUrls,
    fetchImage,
    fetchStudents,
  };
};

const Students: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(1);
  const [majorFilter, setMajorFilter] = useState<string>("همه");
  const [gradeFilter, setGradeFilter] = useState<string>("همه");
  const [statusFilter, setStatusFilter] = useState<string>("فعال");
  // const [selectedAboutMe, setSelectedAboutMe] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const pageSize = isSmallScreen ? 4 : 4;

  useEffect(() => {
    const fetchedToken = getToken();
    setToken(fetchedToken);
    setTokenLoading(false);
  }, []);

  const { value, loading, error, imageUrls, setImageUrls, fetchImage } =
    useStudents(
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

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    []
  );

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

  // const handleCloseAboutMeDialog = useCallback(() => {
  //   setSelectedAboutMe(null);
  // }, []);

  const filteredItems = useMemo(() => value?.items || [], [value]);

  if (tokenLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box
      sx={{
        direction: "rtl",
        padding: 1,
        maxWidth: 1200,
        margin: "auto",
        overflowX: "auto",
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1.8 }}>
        <Tabs
          value={statusFilter}
          onChange={handleStatusFilterChange}
          centered
          sx={{
            "& .MuiTab-root": {
              fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
              color: "#057abe",
              "&.Mui-selected": {
                color: "#057abe",
                fontWeight: "bold",
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#057abe",
            },
          }}
        >
          <Tab label="فعال" value="فعال" />
          <Tab label="گذشته" value="گذشته" />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: isSmallScreen ? 2 : 8,
          mb: 3,
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
              fontWeight: "bold",
              textAlign: isSmallScreen ? "center" : "right",
            }}
          >
            رشته
          </Typography>
          <ToggleButtonGroup
            value={majorFilter}
            exclusive
            onChange={handleMajorFilterChange}
            sx={{
              gap: "6px",
              flexWrap: isSmallScreen ? "wrap" : "nowrap",
              justifyContent: "center",
              "& .MuiToggleButton-root": {
                border: "1px solid #057abe",
                color: "#057abe",
                borderRadius: "8px",
                padding: isSmallScreen ? "6px 8px" : "8px 16px",
                fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
                "&.Mui-selected": {
                  backgroundColor: "#057abe",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "rgb(177, 188, 205)",
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
          <Typography
            variant="body1"
            sx={{
              mb: 1,
              fontWeight: "bold",
              textAlign: isSmallScreen ? "center" : "right",
            }}
          >
            پایه
          </Typography>
          <ToggleButtonGroup
            value={gradeFilter}
            exclusive
            onChange={handleGradeFilterChange}
            sx={{
              gap: "6px",
              flexWrap: isSmallScreen ? "wrap" : "nowrap",
              justifyContent: "center",
              "& .MuiToggleButton-root": {
                border: "1px solid #057abe",
                color: "#057abe",
                borderRadius: "8px",
                padding: isSmallScreen ? "6px 8px" : "8px 16px",
                fontSize: isSmallScreen ? "0.75rem" : "0.875rem",
                "&.Mui-selected": {
                  backgroundColor: "#057abe",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "rgb(177, 188, 205)",
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
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={24} />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && !value && (
        <Typography sx={{ textAlign: "center", py: 4 }}>
          داده‌ای یافت نشد
        </Typography>
      )}
      {!loading && !error && value && (
        <>
          {filteredItems.length === 0 ? (
            <Typography sx={{ textAlign: "center", py: 2 }}>
              دانش‌آموزی یافت نشد
            </Typography>
          ) : (
            <TableContainer
              component={Paper}
              sx={{
                boxShadow: 3,
                maxHeight: isSmallScreen ? "60vh" : "70vh",
                overflowY: "auto",
                marginTop: isSmallScreen ? "20px" : "50px",
                minWidth: isSmallScreen ? "100%" : " ",
              }}
            >
              <Table stickyHeader size={isSmallScreen ? "small" : "medium"}>
                <TableHead>
                  <TableRow
                    sx={{ backgroundColor: "grey.100", textAlign: "right" }}
                  >
                    {!isSmallScreen && (
                      <>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: "right",
                            padding: "8px",
                            paddingRight: "120px",
                          }}
                        >
                          نام
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            padding: "8px",
                          }}
                        >
                          رشته
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            padding: "8px",
                          }}
                        >
                          پایه تحصیلی
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            padding: "8px",
                          }}
                        >
                          روز باقی مانده
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            padding: "8px",
                          }}
                        >
                          عملیات
                        </TableCell>
                      </>
                    )}
                    {isSmallScreen && (
                      <>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            padding: "4px",
                          }}
                        >
                          اطلاعات دانش‌آموز
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            padding: "4px",
                          }}
                        >
                          عملیات
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredItems.map((student) => (
                    <TableRow
                      key={student.id}
                      sx={{ "&:hover": { bgcolor: "grey.50" } }}
                    >
                      {!isSmallScreen && (
                        <>
                          <TableCell
                            sx={{ padding: "8px", textAlign: "center" }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "right",
                                gap: 1,
                                paddingRight: "50px",
                              }}
                            >
                              <Box
                                data-pic-url={student.picUrl}
                                ref={(el: HTMLDivElement) => {
                                  if (el && student.picUrl)
                                    imageElements.current.set(
                                      student.picUrl,
                                      el
                                    );
                                }}
                              >
                                {student.picUrl && imageUrls[student.picUrl] ? (
                                  <Avatar
                                    src={imageUrls[student.picUrl]}
                                    alt={`${student.firstName} ${student.lastName}`}
                                    sx={{ width: 60, height: 60 }}
                                  />
                                ) : (
                                  <Avatar
                                    sx={{
                                      width: 60,
                                      height: 60,
                                      bgcolor: "grey.300",
                                    }}
                                  >
                                    {student.firstName.charAt(0)}
                                  </Avatar>
                                )}
                              </Box>
                              <Typography sx={{ fontWeight: "bold" }}>
                                {`${student.firstName} ${student.lastName}`}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", padding: "8px" }}
                          >
                            {student.majorTitle || "ندارد"}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", padding: "8px" }}
                          >
                            {student.gradeLevel || "ندارد"}
                          </TableCell>
                          <TableCell
                            sx={{ textAlign: "center", padding: "8px" }}
                          >
                            {student.remainingDays || "ندارد"}
                          </TableCell>
                          <TableCell sx={{ padding: "8px" }}>
                            <StudentDisplayPopup
                              studentId={student.studentId.toString()}
                            />
                          </TableCell>
                        </>
                      )}
                      {isSmallScreen && (
                        <>
                          <TableCell sx={{ padding: "4px" }}>
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Box
                                  data-pic-url={student.picUrl}
                                  ref={(el: HTMLDivElement) => {
                                    if (el && student.picUrl)
                                      imageElements.current.set(
                                        student.picUrl,
                                        el
                                      );
                                  }}
                                >
                                  {student.picUrl &&
                                  imageUrls[student.picUrl] ? (
                                    <Avatar
                                      src={imageUrls[student.picUrl]}
                                      alt={`${student.firstName} ${student.lastName}`}
                                      sx={{ width: 40, height: 40 }}
                                    />
                                  ) : (
                                    <Avatar
                                      sx={{
                                        width: 40,
                                        height: 40,
                                        bgcolor: "grey.300",
                                      }}
                                    >
                                      {student.firstName.charAt(0)}
                                    </Avatar>
                                  )}
                                </Box>
                                <Typography
                                  variant="subtitle2"
                                  sx={{ fontWeight: "bold" }}
                                >
                                  {`${student.firstName} ${student.lastName}`}
                                </Typography>
                              </Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexWrap: "wrap",
                                  gap: 1,
                                }}
                              >
                                <Typography variant="caption">
                                  <strong>رشته:</strong>{" "}
                                  {student.majorTitle || "ندارد"}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>پایه:</strong>{" "}
                                  {student.gradeLevel || "ندارد"}
                                </Typography>
                                <Typography variant="caption">
                                  <strong>روز باقی مانده:</strong>{" "}
                                  {student.remainingDays || "ندارد"}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell sx={{ padding: "4px" }}>
                            <StudentDisplayPopup
                              studentId={student.studentId.toString()}
                            />
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Pagination
              count={value?.totalPages || 1}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              dir="rtl"
              size={isSmallScreen ? "small" : "medium"}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "#057abe",
                  "&.Mui-selected": {
                    backgroundColor: "#057abe",
                    color: "white",
                  },
                  "&.MuiPaginationItem-previousNext": {
                    transform: "rotate(180deg)",
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Students;
