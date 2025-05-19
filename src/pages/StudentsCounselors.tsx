import React, { useState, useEffect, useCallback } from "react";
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
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  TextField,
  PaginationItem,
  IconButton,
} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import SecondaryButton from "@/components/common/SecondaryButton";
import StarIcon from "@mui/icons-material/Star";
import { PaginationRenderItemParams } from "@mui/material";
import axios from "axios";
import { getToken } from "@/services/auth";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface Counselor {
  id: number;
  counselorName: string;
  counselorId: number;
  requestStatus: number;
  requestStatusTitle: string;
  startDate: string | null;
  endDate: string | null;
  remainingDays: number | null;
  rate: number;
  picName: string;
  picUrl: string;
}

interface ApiResponse {
  value: {
    items: Counselor[];
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    totalCount: number;
    filteredCount: number;
  };
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  error: {
    code: string;
    message: string;
  };
}

const statusMapping: Record<number, string> = {
  1: "درخواست شده",
  3: "در انتظار پرداخت",
  4: "فعال",
  5: "تکمیل شده",
  6: "رد درخواست",
  7: "لغو شده",
};

const statusColorMapping: Record<number, string> = {
  1: "#ff9800", // نارنجی
  3: "#9c27b0", // بنفش
  4: "#4caf50", // سبز
  5: "#2196f3", // آبی
  6: "#9e9e9e", // خاکستری
  7: "#f44336", // قرمز
};

const toPersianNumber = (num: number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

const toPersianDate = (date: string): string => {
  return date.replace(/\d/g, (x) => toPersianNumber(parseInt(x)));
};

const StudentsCounselors: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(1);
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(
    null
  );
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("همه");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "extend" | "cancel" | null
  >(null);
  const [selectedCounselorId, setSelectedCounselorId] = useState<number | null>(
    null
  );
  const [comment, setComment] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedCounselorDetails, setSelectedCounselorDetails] =
    useState<Counselor | null>(null);

  const fetchCounselors = useCallback(async () => {
    try {
      setLoading(true);
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const pageSize = 5;
      const url =
        statusFilter === "همه"
          ? `http://62.60.213.13:8080/api/RequestCounselor/MyCounselors?PageSize=${pageSize}&PageIndex=${currentPage}`
          : `http://62.60.213.13:8080/api/RequestCounselor/MyCounselors?Status=${getStatusNumber(
              statusFilter
            )}&PageSize=${pageSize}&PageIndex=${currentPage}`;

      const response = await axios.get<ApiResponse>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (
        response.data &&
        response.data.value &&
        Array.isArray(response.data.value.items)
      ) {
        const sortedCounselors =
          statusFilter === "همه"
            ? [...response.data.value.items].sort((a, b) => {
                // Put active counselors (status 4) first
                if (a.requestStatus === 4 && b.requestStatus !== 4) return -1;
                if (a.requestStatus !== 4 && b.requestStatus === 4) return 1;
                return 0;
              })
            : response.data.value.items;
        setCounselors(sortedCounselors);
        setTotalPages(response.data.value.totalPages || 1);
      } else {
        setCounselors([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      }
      setCounselors([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, currentPage, navigate]);

  useEffect(() => {
    fetchCounselors();
  }, [fetchCounselors]);

  const getStatusNumber = (statusText: string): number => {
    const statusMap: { [key: string]: number } = {
      "درخواست شده": 1,
      "در انتظار پرداخت": 3,
      فعال: 4,
      "تکمیل شده": 5,
      "رد درخواست": 6,
      "لغو شده": 7,
    };
    return statusMap[statusText] || 0;
  };

  const getStatusText = (status: number): string => {
    return statusMapping[status] || "نامشخص";
  };

  const getStatusColor = (status: number) => {
    return statusColorMapping[status] || "#757575";
  };

  const handleStatusFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setStatusFilter(newFilter);
      setCurrentPage(1);
    }
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleCancel = async (counselorId: number) => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        `http://62.60.213.13:8080/api/RequestCounselor/Cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCounselors(
        counselors.map((counselor) =>
          counselor.id === counselorId
            ? { ...counselor, requestStatus: 7 }
            : counselor
        )
      );
    } catch (error) {
      console.error("Error canceling counselor:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleExtension = async (counselorId: number) => {
    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        `http://62.60.213.13:8080/api/RequestCounselor/Extend/${counselorId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCounselors(
        counselors.map((counselor) =>
          counselor.id === counselorId
            ? {
                ...counselor,
                remainingDays: (counselor.remainingDays || 0) + 30,
              }
            : counselor
        )
      );
    } catch (error) {
      console.error("Error extending counselor:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleRate = async (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setSelectedRating(counselor.rate);
    setRatingDialogOpen(true);
  };

  const handleRatingSubmit = async () => {
    if (!selectedCounselor || !selectedRating) return;

    try {
      const token = getToken();
      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(
        `http://62.60.213.13:8080/api/RequestCounselor/Rate/${selectedCounselor.id}`,
        {
          rate: selectedRating,
          comment: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCounselors(
        counselors.map((counselor) =>
          counselor.id === selectedCounselor.id
            ? { ...counselor, rate: selectedRating }
            : counselor
        )
      );
      setRatingDialogOpen(false);
      setComment("");
    } catch (error) {
      console.error("Error submitting rating:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const handleConfirmAction = () => {
    if (!selectedCounselorId) return;

    if (confirmAction === "extend") {
      handleExtension(selectedCounselorId);
    } else if (confirmAction === "cancel") {
      handleCancel(selectedCounselorId);
    }

    setConfirmDialogOpen(false);
    setConfirmAction(null);
    setSelectedCounselorId(null);
  };

  const handleExtendClick = (counselorId: number) => {
    setSelectedCounselorId(counselorId);
    setConfirmAction("extend");
    setConfirmDialogOpen(true);
  };

  const handleCancelClick = (counselorId: number) => {
    setSelectedCounselorId(counselorId);
    setConfirmAction("cancel");
    setConfirmDialogOpen(true);
  };

  const handleShowDetails = (counselor: Counselor) => {
    setSelectedCounselorDetails(counselor);
    setDetailsDialogOpen(true);
  };

  const content = (
    <Box
      sx={{
        direction: "rtl",
        padding: isSmallScreen ? "8px" : "16px 16px 0px 16px",
        maxWidth: 1200,
        margin: "auto",
        overflowX: "auto",
      }}
    >
      {/* Filter Controls */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmallScreen ? "column" : "row",
          gap: "8px",
          mb: "12px",
          mt: isSmallScreen ? "16px" : 0,
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{
              mb: "4px",
              fontWeight: "medium",
              textAlign: isSmallScreen ? "center" : "right",
            }}
          >
            فیلتر وضعیت
          </Typography>
          <ToggleButtonGroup
            value={statusFilter}
            exclusive
            onChange={handleStatusFilterChange}
            sx={{
              gap: "8px",
              flexWrap: isSmallScreen ? "wrap" : "nowrap",
              justifyContent: "center",
              "& .MuiToggleButton-root": {
                border: "1px solid #057abe",
                color: "#057abe",
                borderRadius: "8px",
                padding: isSmallScreen ? "4px 6px" : "6px 12px",
                fontSize: isSmallScreen ? "12px" : "14px",
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
            <ToggleButton key="all" value="همه">
              همه
            </ToggleButton>
            <ToggleButton key="active" value="فعال">
              فعال
            </ToggleButton>
            <ToggleButton key="requested" value="درخواست شده">
              درخواست شده
            </ToggleButton>
            <ToggleButton key="pending" value="در انتظار پرداخت">
              در انتظار پرداخت
            </ToggleButton>
            <ToggleButton key="completed" value="تکمیل شده">
              تکمیل شده
            </ToggleButton>
            <ToggleButton key="rejected" value="رد درخواست">
              رد درخواست
            </ToggleButton>
            <ToggleButton key="cancelled" value="لغو شده">
              لغو شده
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {loading ? (
        <Typography sx={{ textAlign: "center", py: "32px" }}>
          در حال بارگذاری...
        </Typography>
      ) : counselors.length === 0 ? (
        <Typography sx={{ textAlign: "center", py: "32px" }}>
          مشاوری یافت نشد
        </Typography>
      ) : (
        <>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#424242",
              mb: "16px",
              textAlign: "right",
            }}
          >
            لیست مشاوران
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              maxHeight: isSmallScreen ? "50vh" : "60vh",
              overflowY: "auto",
              minWidth: isSmallScreen ? "100%" : "auto",
            }}
          >
            <Table stickyHeader size={isSmallScreen ? "small" : "medium"}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  {!isSmallScreen && (
                    <>
                      <TableCell
                        key="name"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "20%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        نام مشاور
                      </TableCell>
                      <TableCell
                        key="startDate"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "15%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        تاریخ شروع
                      </TableCell>
                      <TableCell
                        key="endDate"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "15%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        تاریخ پایان
                      </TableCell>
                      <TableCell
                        key="status"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "15%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        وضعیت
                      </TableCell>
                      <TableCell
                        key="remainingDays"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "15%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        روزهای باقیمانده
                      </TableCell>
                      <TableCell
                        key="rating"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "10%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        امتیاز
                      </TableCell>
                      <TableCell
                        key="actions"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "15%",
                          paddingLeft: "32px",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        عملیات
                      </TableCell>
                    </>
                  )}
                  {isSmallScreen && (
                    <>
                      <TableCell
                        key="mobile-name"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "50%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        نام مشاور
                      </TableCell>
                      <TableCell
                        key="mobile-details"
                        sx={{
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "25%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        جزئیات
                      </TableCell>
                      <TableCell
                        key="mobile-actions"
                        sx={{
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "25%",
                          backgroundColor: "#f5f5f5",
                        }}
                      >
                        عملیات
                      </TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {counselors.map((counselor) => (
                  <TableRow
                    key={`counselor-${counselor.id}`}
                    sx={{ "&:hover": { bgcolor: "grey.50" } }}
                  >
                    {!isSmallScreen && (
                      <>
                        <TableCell
                          key={`name-${counselor.id}`}
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "20%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                              width: "100%",
                              cursor: "pointer",
                              "&:hover .counselor-name": {
                                color: "#1976d2",
                              },
                            }}
                            onClick={() =>
                              navigate(
                                `/OurCounselor/CounselorPage/${counselor.counselorId}`
                              )
                            }
                          >
                            <Avatar
                              src={counselor.picUrl}
                              alt={counselor.counselorName}
                              sx={{ width: "48px", height: "48px" }}
                            />
                            <Typography className="counselor-name">
                              {counselor.counselorName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          key={`startDate-${counselor.id}`}
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          {counselor.startDate
                            ? toPersianDate(counselor.startDate)
                            : "-"}
                        </TableCell>
                        <TableCell
                          key={`endDate-${counselor.id}`}
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          {counselor.endDate
                            ? toPersianDate(counselor.endDate)
                            : "-"}
                        </TableCell>
                        <TableCell
                          key={`status-${counselor.id}`}
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          <Typography
                            sx={{
                              color: getStatusColor(counselor.requestStatus),
                            }}
                          >
                            {getStatusText(counselor.requestStatus)}
                          </Typography>
                        </TableCell>
                        <TableCell
                          key={`remainingDays-${counselor.id}`}
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          {counselor.remainingDays
                            ? toPersianNumber(counselor.remainingDays)
                            : "-"}
                        </TableCell>
                        <TableCell
                          key={`rating-${counselor.id}`}
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "10%",
                          }}
                        >
                          {counselor.rate > 0 ? (
                            <Rating
                              value={counselor.rate}
                              readOnly
                              size="small"
                              sx={{
                                "& .MuiRating-label": {
                                  fontFamily: "inherit",
                                },
                              }}
                              getLabelText={(value) =>
                                `${toPersianNumber(value)} ستاره`
                              }
                            />
                          ) : counselor.remainingDays !== null &&
                            counselor.remainingDays < 5 &&
                            counselor.requestStatus === 4 ? (
                            <Box
                              onClick={() => handleRate(counselor)}
                              sx={{
                                width: "32px",
                                height: "32px",
                                borderRadius: "50%",
                                backgroundColor: "rgb(108, 73, 203)",
                                color: "white",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                margin: "0 auto",
                                animation: "pulse 2s infinite",
                                "@keyframes pulse": {
                                  "0%": {
                                    boxShadow:
                                      "0 0 0 0 rgba(108, 73, 203, 0.4)",
                                  },
                                  "70%": {
                                    boxShadow:
                                      "0 0 0 10px rgba(108, 73, 203, 0)",
                                  },
                                  "100%": {
                                    boxShadow: "0 0 0 0 rgba(108, 73, 203, 0)",
                                  },
                                },
                                "&:hover": {
                                  backgroundColor: "rgb(87, 57, 168)",
                                  animation: "none",
                                },
                              }}
                            >
                              <StarIcon sx={{ fontSize: "20px" }} />
                            </Box>
                          ) : (
                            "بدون امتیاز"
                          )}
                        </TableCell>
                        <TableCell
                          key={`actions-${counselor.id}`}
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                            paddingLeft: "32px",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            {counselor.requestStatus === 4 && (
                              <>
                                <SecondaryButton
                                  key={`extend-${counselor.id}`}
                                  name="تمدید"
                                  backgroundColor="rgb(5, 190, 30)"
                                  width="80px"
                                  height="28px"
                                  fontSize="12px"
                                  onClick={() =>
                                    handleExtendClick(counselor.id)
                                  }
                                  borderRadius="8px"
                                />
                                <SecondaryButton
                                  key={`cancel-${counselor.id}`}
                                  name="لغو"
                                  backgroundColor="rgb(221, 84, 84)"
                                  width="80px"
                                  height="28px"
                                  fontSize="12px"
                                  onClick={() =>
                                    handleCancelClick(counselor.id)
                                  }
                                  borderRadius="8px"
                                />
                              </>
                            )}
                            {counselor.requestStatus === 3 && (
                              <SecondaryButton
                                key={`payment-${counselor.id}`}
                                name="صفحه پرداخت"
                                backgroundColor="rgb(5, 122, 190)"
                                width="100px"
                                height="28px"
                                fontSize="12px"
                                onClick={() => navigate("/dashboard/payments")}
                                borderRadius="8px"
                              />
                            )}
                          </Box>
                        </TableCell>
                      </>
                    )}
                    {isSmallScreen && (
                      <>
                        <TableCell
                          key={`mobile-name-${counselor.id}`}
                          sx={{
                            padding: "8px 16px",
                            height: "48px",
                            width: "50%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              width: "100%",
                            }}
                          >
                            <Avatar
                              src={counselor.picUrl}
                              alt={counselor.counselorName}
                              sx={{ width: "48px", height: "48px" }}
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {counselor.counselorName}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          key={`mobile-details-${counselor.id}`}
                          sx={{
                            padding: "8px 16px",
                            height: "48px",
                            width: "25%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <VisibilityIcon
                              sx={{
                                color: "#057abe",
                                cursor: "pointer",
                                "&:hover": {
                                  color: "#035a8f",
                                },
                              }}
                              onClick={() => handleShowDetails(counselor)}
                            />
                          </Box>
                        </TableCell>
                        <TableCell
                          key={`mobile-actions-${counselor.id}`}
                          sx={{
                            padding: "8px 16px",
                            height: "48px",
                            width: "25%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              alignItems: "center",
                            }}
                          >
                            {counselor.requestStatus === 4 && (
                              <>
                                <SecondaryButton
                                  key={`mobile-extend-${counselor.id}`}
                                  name="تمدید"
                                  backgroundColor="rgb(5, 190, 30)"
                                  width="50px"
                                  height="22px"
                                  fontSize="10px"
                                  onClick={() =>
                                    handleExtendClick(counselor.id)
                                  }
                                  borderRadius="4px"
                                />
                                <SecondaryButton
                                  key={`mobile-cancel-${counselor.id}`}
                                  name="لغو"
                                  backgroundColor="rgb(221, 84, 84)"
                                  width="50px"
                                  height="22px"
                                  fontSize="10px"
                                  onClick={() =>
                                    handleCancelClick(counselor.id)
                                  }
                                  borderRadius="4px"
                                />
                              </>
                            )}
                            {counselor.requestStatus === 3 && (
                              <SecondaryButton
                                key={`mobile-payment-${counselor.id}`}
                                name="صفحه پرداخت"
                                backgroundColor="rgb(5, 122, 190)"
                                width="70px"
                                height="22px"
                                fontSize="10px"
                                onClick={() => navigate("/dashboard/payments")}
                                borderRadius="4px"
                              />
                            )}
                          </Box>
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {isSmallScreen ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                padding: "16px 0",
                width: "100%",
              }}
            >
              <IconButton
                onClick={() =>
                  handlePageChange(
                    {} as React.ChangeEvent<unknown>,
                    Math.max(1, currentPage - 1)
                  )
                }
                disabled={currentPage === 1}
                sx={{
                  backgroundColor: "rgb(5, 122, 190)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgb(4, 98, 152)",
                  },
                  "&:disabled": {
                    backgroundColor: "#e0e0e0",
                    color: "#9e9e9e",
                  },
                }}
              >
                <ArrowForwardIosIcon />
              </IconButton>

              <Typography
                sx={{
                  color: "#057abe",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                صفحه {toPersianNumber(currentPage)} از{" "}
                {toPersianNumber(totalPages)}
              </Typography>

              <IconButton
                onClick={() =>
                  handlePageChange(
                    {} as React.ChangeEvent<unknown>,
                    Math.min(totalPages, currentPage + 1)
                  )
                }
                disabled={currentPage === totalPages}
                sx={{
                  backgroundColor: "rgb(5, 122, 190)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "rgb(4, 98, 152)",
                  },
                  "&:disabled": {
                    backgroundColor: "#e0e0e0",
                    color: "#9e9e9e",
                  },
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", mt: "32px" }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                dir="rtl"
                size="medium"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "#057abe",
                    fontFamily: "inherit",
                    "&.Mui-selected": {
                      backgroundColor: "#057abe",
                      color: "white",
                    },
                    "&.MuiPaginationItem-previousNext": {
                      transform: "rotate(180deg)",
                    },
                  },
                }}
                renderItem={(item: PaginationRenderItemParams) => {
                  if (item.type === "page") {
                    return (
                      <PaginationItem
                        key={`page-${item.page}`}
                        {...item}
                        children={toPersianNumber(item.page || 0)}
                      />
                    );
                  }
                  return (
                    <PaginationItem key={`pagination-${item.type}`} {...item} />
                  );
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Rating Dialog */}
      <Dialog
        open={ratingDialogOpen}
        onClose={() => setRatingDialogOpen(false)}
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
            امتیازدهی به مشاور
          </DialogTitle>
        </Box>
        <DialogContent sx={{ padding: "16px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              py: "8px",
            }}
          >
            <Typography sx={{ fontSize: "17.6px", color: "#424242" }}>
              لطفاً به مشاور خود امتیاز دهید
            </Typography>
            <Rating
              value={selectedRating}
              onChange={(_, newValue) => setSelectedRating(newValue)}
              size="large"
              precision={1}
              sx={{
                "& .MuiRating-iconFilled": {
                  color: "#ffc107",
                },
                "& .MuiRating-iconHover": {
                  color: "#ffc107",
                },
                "& .MuiRating-iconEmpty": {
                  color: "#e0e0e0",
                },
                "& .MuiRating-label": {
                  fontFamily: "inherit",
                },
                direction: "rtl",
              }}
              getLabelText={(value) => `${toPersianNumber(value)} ستاره`}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="نظر خود را بنویسید..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "white",
                  borderRadius: { xs: "6px", sm: "6px", md: "8px" },
                  transition: "border-color 0.3s ease",
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgb(204, 207, 209)",
                    borderWidth: "2px",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#1976d2",
                    borderWidth: "2.3px",
                  },
                },
                "& .MuiOutlinedInput-input": {
                  textAlign: "right",
                  direction: "rtl",
                },
                "& .MuiInputBase-input::placeholder": {
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  textAlign: "right",
                  direction: "rtl",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ padding: "12px 16px", borderTop: "1px solid #e0e0e0" }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "8px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <SecondaryButton
              name="انصراف"
              backgroundColor="rgb(221, 84, 84)"
              width="80px"
              height="28px"
              fontSize="12px"
              borderRadius="8px"
              onClick={() => setRatingDialogOpen(false)}
            />
            <SecondaryButton
              name="ثبت امتیاز"
              backgroundColor="rgb(5, 122, 190)"
              width="80px"
              height="28px"
              fontSize="12px"
              borderRadius="8px"
              onClick={handleRatingSubmit}
            />
          </Box>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
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
            {confirmAction === "extend" ? "تمدید مشاوره" : "لغو مشاوره"}
          </DialogTitle>
        </Box>
        <DialogContent sx={{ padding: "24px" }}>
          <Typography
            sx={{ fontSize: "17.6px", color: "#424242", textAlign: "center" }}
          >
            {confirmAction === "extend"
              ? "آیا از تمدید مشاوره اطمینان دارید؟"
              : "آیا از لغو مشاوره اطمینان دارید؟"}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{ padding: "16px 24px", borderTop: "1px solid #e0e0e0" }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "16px",
              width: "100%",
              justifyContent: "flex-end",
            }}
          >
            <SecondaryButton
              name="انصراف"
              backgroundColor="rgb(221, 84, 84)"
              width="100px"
              height="32px"
              fontSize="14px"
              borderRadius="12px"
              onClick={() => setConfirmDialogOpen(false)}
            />
            <SecondaryButton
              name="بله"
              backgroundColor="rgb(5, 190, 30)"
              width="100px"
              height="32px"
              fontSize="14px"
              borderRadius="12px"
              onClick={handleConfirmAction}
            />
          </Box>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const renderDetailsDialog = () => (
    <Dialog
      open={detailsDialogOpen}
      onClose={() => setDetailsDialogOpen(false)}
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
          جزئیات مشاور
        </DialogTitle>
      </Box>
      <DialogContent sx={{ padding: "24px" }}>
        {selectedCounselorDetails && (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Avatar
                src={selectedCounselorDetails.picUrl}
                alt={selectedCounselorDetails.counselorName}
                sx={{ width: "96px", height: "96px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {selectedCounselorDetails.counselorName}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#666" }}>وضعیت:</Typography>
                <Typography
                  sx={{
                    color: getStatusColor(
                      selectedCounselorDetails.requestStatus
                    ),
                  }}
                >
                  {getStatusText(selectedCounselorDetails.requestStatus)}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#666" }}>تاریخ شروع:</Typography>
                <Typography>
                  {selectedCounselorDetails.startDate
                    ? toPersianDate(selectedCounselorDetails.startDate)
                    : "-"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#666" }}>تاریخ پایان:</Typography>
                <Typography>
                  {selectedCounselorDetails.endDate
                    ? toPersianDate(selectedCounselorDetails.endDate)
                    : "-"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#666" }}>
                  روزهای باقیمانده:
                </Typography>
                <Typography>
                  {selectedCounselorDetails.remainingDays
                    ? toPersianNumber(selectedCounselorDetails.remainingDays)
                    : "-"}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ color: "#666" }}>امتیاز:</Typography>
                {selectedCounselorDetails.rate > 0 ? (
                  <Rating
                    value={selectedCounselorDetails.rate}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-label": {
                        fontFamily: "inherit",
                      },
                    }}
                    getLabelText={(value) => `${toPersianNumber(value)} ستاره`}
                  />
                ) : (
                  <Typography>بدون امتیاز</Typography>
                )}
              </Box>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions
        sx={{ padding: "16px 24px", borderTop: "1px solid #e0e0e0" }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            width: "100%",
            justifyContent: "flex-end",
          }}
        >
          <SecondaryButton
            name="بستن"
            backgroundColor="rgb(221, 84, 84)"
            width="100px"
            height="32px"
            fontSize="14px"
            borderRadius="12px"
            onClick={() => setDetailsDialogOpen(false)}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );

  return (
    <>
      <Header />
      <Sidebar>
        {content}
        {renderDetailsDialog()}
      </Sidebar>
    </>
  );
};

export default StudentsCounselors;
