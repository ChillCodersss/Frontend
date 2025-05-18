import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import SecondaryButton from "@/components/common/SecondaryButton";
import StarIcon from "@mui/icons-material/Star";
import { PaginationRenderItemParams } from "@mui/material";
import axios from "axios";
import { getToken } from "@/services/auth";
import { useNavigate } from "react-router-dom";

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
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchCounselors();
  }, [statusFilter, currentPage]);

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const pageSize = 5; // Fixed page size as per API
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
        setCounselors(response.data.value.items);
        setTotalPages(response.data.value.totalPages || 1);
        setTotalCount(response.data.value.totalCount || 0);
      } else {
        setCounselors([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/login");
      }
      setCounselors([]);
      setTotalPages(1);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

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

      await axios.put(
        `http://62.60.213.13:8080/api/RequestCounselor/Cancel/${counselorId}`,
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

      await axios.put(
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

  const content = (
    <Box
      sx={{
        direction: "rtl",
        padding: isSmallScreen ? "8px" : "16px",
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
              gap: "4px",
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
            <ToggleButton key="requested" value="درخواست شده">
              درخواست شده
            </ToggleButton>
            <ToggleButton key="pending" value="در انتظار پرداخت">
              در انتظار پرداخت
            </ToggleButton>
            <ToggleButton key="active" value="فعال">
              فعال
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
                <TableRow sx={{ backgroundColor: "grey.100" }}>
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
                        }}
                      >
                        عملیات
                      </TableCell>
                    </>
                  )}
                  {isSmallScreen && (
                    <>
                      <TableCell
                        key="mobile-info"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "8px 16px",
                          height: "48px",
                          width: "70%",
                        }}
                      >
                        اطلاعات مشاور
                      </TableCell>
                      <TableCell
                        key="mobile-actions"
                        sx={{
                          padding: "8px 16px",
                          height: "48px",
                          width: "30%",
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
                              "& .MuiAvatar-root": {
                                flexShrink: 0,
                              },
                              "& .MuiTypography-root": {
                                flexShrink: 0,
                                minWidth: "80px",
                              },
                            }}
                          >
                            <Avatar
                              src={counselor.picUrl}
                              alt={counselor.counselorName}
                              sx={{ width: "32px", height: "32px" }}
                            />
                            <Typography>{counselor.counselorName}</Typography>
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
                                onClick={() => {
                                  // Handle payment page navigation
                                  console.log("Navigate to payment page");
                                }}
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
                          key={`mobile-info-${counselor.id}`}
                          sx={{
                            padding: "8px 16px",
                            height: "48px",
                            width: "70%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              width: "100%",
                              "& .MuiAvatar-root": {
                                flexShrink: 0,
                              },
                              "& .MuiTypography-root": {
                                flexShrink: 0,
                                minWidth: "80px",
                              },
                            }}
                          >
                            <Avatar
                              src={counselor.picUrl}
                              alt={counselor.counselorName}
                              sx={{ width: "32px", height: "32px" }}
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
                          key={`mobile-actions-${counselor.id}`}
                          sx={{
                            padding: "8px 16px",
                            height: "48px",
                            width: "30%",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                              paddingLeft: "16px",
                            }}
                          >
                            {counselor.requestStatus === 4 && (
                              <>
                                <SecondaryButton
                                  key={`mobile-extend-${counselor.id}`}
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
                                  key={`mobile-cancel-${counselor.id}`}
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
                                key={`mobile-payment-${counselor.id}`}
                                name="صفحه پرداخت"
                                backgroundColor="rgb(5, 122, 190)"
                                width="100px"
                                height="28px"
                                fontSize="12px"
                                onClick={() => {
                                  // Handle payment page navigation
                                  console.log("Navigate to payment page");
                                }}
                                borderRadius="8px"
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: "32px" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              dir="rtl"
              size={isSmallScreen ? "small" : "medium"}
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

  return (
    <>
      <Header />
      <Sidebar>{content}</Sidebar>
    </>
  );
};

export default StudentsCounselors;
