import React, { useState } from "react";
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
  IconButton,
  TextField,
  PaginationItem,
} from "@mui/material";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import SecondaryButton from "@/components/common/SecondaryButton";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import AddIcon from "@mui/icons-material/Add";
import StarIcon from "@mui/icons-material/Star";
import InputBox from "@/components/common/inputbox";
import { PaginationRenderItemParams } from "@mui/material";

interface Counselor {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  status:
    | "active"
    | "cancelled"
    | "completed"
    | "requested"
    | "rejected"
    | "pending_payment";
  remainingDays: number;
  rating: number | null;
  profilePhoto: string;
}

// Mock data
const mockCounselors: Counselor[] = [
  {
    id: 1,
    firstName: "علی",
    lastName: "محمدی",
    startDate: "1402/10/01",
    endDate: "1402/12/29",
    status: "active",
    remainingDays: 4,
    rating: null,
    profilePhoto: "https://i.pravatar.cc/150?img=1",
  },
  {
    id: 2,
    firstName: "مریم",
    lastName: "احمدی",
    startDate: "1402/09/15",
    endDate: "1402/12/15",
    status: "completed",
    remainingDays: 0,
    rating: 4,
    profilePhoto: "https://i.pravatar.cc/150?img=5",
  },
  {
    id: 3,
    firstName: "رضا",
    lastName: "کریمی",
    startDate: "1402/11/01",
    endDate: "1403/02/29",
    status: "requested",
    remainingDays: 0,
    rating: null,
    profilePhoto: "https://i.pravatar.cc/150?img=3",
  },
  {
    id: 4,
    firstName: "سارا",
    lastName: "حسینی",
    startDate: "1402/08/01",
    endDate: "1402/11/30",
    status: "cancelled",
    remainingDays: 0,
    rating: null,
    profilePhoto: "https://i.pravatar.cc/150?img=4",
  },
  {
    id: 5,
    firstName: "محمد",
    lastName: "رضایی",
    startDate: "1402/12/01",
    endDate: "1403/03/01",
    status: "rejected",
    remainingDays: 0,
    rating: null,
    profilePhoto: "https://i.pravatar.cc/150?img=6",
  },
  {
    id: 6,
    firstName: "زهرا",
    lastName: "کریمی",
    startDate: "1402/12/15",
    endDate: "1403/03/15",
    status: "pending_payment",
    remainingDays: 30,
    rating: null,
    profilePhoto: "https://i.pravatar.cc/150?img=7",
  },
  {
    id: 7,
    firstName: "امیر",
    lastName: "محمدی",
    startDate: "1402/11/20",
    endDate: "1403/02/20",
    status: "active",
    remainingDays: 60,
    rating: 5,
    profilePhoto: "https://i.pravatar.cc/150?img=8",
  },
  {
    id: 8,
    firstName: "نازنین",
    lastName: "احمدی",
    startDate: "1402/10/10",
    endDate: "1403/01/10",
    status: "completed",
    remainingDays: 0,
    rating: 3,
    profilePhoto: "https://i.pravatar.cc/150?img=9",
  },
];

const toPersianNumber = (num: number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

const toPersianDate = (date: string): string => {
  return date.replace(/\d/g, (x) => toPersianNumber(parseInt(x)));
};

const StudentsCounselors: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [currentPage, setCurrentPage] = useState(1);
  const [counselors, setCounselors] = useState<Counselor[]>(mockCounselors);
  const [selectedCounselor, setSelectedCounselor] = useState<Counselor | null>(
    null
  );
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("همه");
  const pageSize = isSmallScreen ? 2 : 4;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState<
    "extend" | "cancel" | null
  >(null);
  const [selectedCounselorId, setSelectedCounselorId] = useState<number | null>(
    null
  );
  const [comment, setComment] = useState<string>("");

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const handleCancel = (counselorId: number) => {
    setCounselors(
      counselors.map((counselor) =>
        counselor.id === counselorId
          ? { ...counselor, status: "cancelled" as const }
          : counselor
      )
    );
  };

  const handleExtension = (counselorId: number) => {
    setCounselors(
      counselors.map((counselor) =>
        counselor.id === counselorId
          ? { ...counselor, remainingDays: counselor.remainingDays + 30 }
          : counselor
      )
    );
  };

  const handleRate = (counselor: Counselor) => {
    setSelectedCounselor(counselor);
    setSelectedRating(counselor.rating);
    setRatingDialogOpen(true);
  };

  const handleRatingSubmit = () => {
    if (!selectedCounselor || !selectedRating) return;

    setCounselors(
      counselors.map((counselor) =>
        counselor.id === selectedCounselor.id
          ? { ...counselor, rating: selectedRating }
          : counselor
      )
    );
    setRatingDialogOpen(false);
    setComment("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4caf50"; // سبز
      case "completed":
        return "#2196f3"; // آبی
      case "cancelled":
        return "#f44336"; // قرمز
      case "requested":
        return "#ff9800"; // نارنجی
      case "rejected":
        return "#9e9e9e"; // خاکستری
      case "pending_payment":
        return "#9c27b0"; // بنفش
      default:
        return "#757575";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "فعال";
      case "completed":
        return "تکمیل شده";
      case "cancelled":
        return "لغو شده";
      case "requested":
        return "درخواست شده";
      case "rejected":
        return "رد درخواست";
      case "pending_payment":
        return "در انتظار پرداخت";
      default:
        return status;
    }
  };

  const handleStatusFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setStatusFilter(newFilter);
      setCurrentPage(1);
    }
  };

  // Filter counselors based on status
  const filteredCounselors = counselors.filter((counselor) => {
    if (statusFilter === "همه") return true;
    return counselor.status === statusFilter;
  });

  // Calculate pagination for filtered results
  const totalPages = Math.ceil(filteredCounselors.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedCounselors = filteredCounselors.slice(
    startIndex,
    startIndex + pageSize
  );

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
            <ToggleButton value="همه">همه</ToggleButton>
            <ToggleButton value="active">فعال</ToggleButton>
            <ToggleButton value="completed">تکمیل شده</ToggleButton>
            <ToggleButton value="cancelled">لغو شده</ToggleButton>
            <ToggleButton value="requested">درخواست شده</ToggleButton>
            <ToggleButton value="rejected">رد درخواست</ToggleButton>
            <ToggleButton value="pending_payment">
              در انتظار پرداخت
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {counselors.length === 0 && (
        <Typography sx={{ textAlign: "center", py: "32px" }}>
          مشاوری یافت نشد
        </Typography>
      )}
      {counselors.length > 0 && (
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
                {paginatedCounselors.map((counselor) => (
                  <TableRow
                    key={counselor.id}
                    sx={{ "&:hover": { bgcolor: "grey.50" } }}
                  >
                    {!isSmallScreen && (
                      <>
                        <TableCell
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
                              src={counselor.profilePhoto}
                              alt={`${counselor.firstName} ${counselor.lastName}`}
                              sx={{ width: "32px", height: "32px" }}
                            />
                            <Typography>
                              {`${counselor.firstName} ${counselor.lastName}`}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          {toPersianDate(counselor.startDate)}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          {toPersianDate(counselor.endDate)}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          <Typography
                            sx={{ color: getStatusColor(counselor.status) }}
                          >
                            {getStatusText(counselor.status)}
                          </Typography>
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "15%",
                          }}
                        >
                          {toPersianNumber(counselor.remainingDays)}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "8px 16px",
                            height: "48px",
                            width: "10%",
                          }}
                        >
                          {counselor.rating ? (
                            <Rating
                              value={counselor.rating}
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
                          ) : counselor.remainingDays < 5 &&
                            counselor.status === "active" ? (
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
                            {counselor.status === "active" && (
                              <>
                                <SecondaryButton
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
                            {counselor.status === "pending_payment" && (
                              <SecondaryButton
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
                              src={counselor.profilePhoto}
                              alt={`${counselor.firstName} ${counselor.lastName}`}
                              sx={{ width: "32px", height: "32px" }}
                            />
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {`${counselor.firstName} ${counselor.lastName}`}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell
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
                            {counselor.status === "active" && (
                              <>
                                <SecondaryButton
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
                            {counselor.status === "pending_payment" && (
                              <SecondaryButton
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
                      {...item}
                      children={toPersianNumber(item.page || 0)}
                    />
                  );
                }
                return <PaginationItem {...item} />;
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
