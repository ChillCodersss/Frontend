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
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Rating,
  useMediaQuery,
  useTheme,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { Cancel, AccessTime, Star, Close } from "@mui/icons-material";
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import SecondaryButton from "@/components/common/SecondaryButton";

interface Counselor {
  id: number;
  firstName: string;
  lastName: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "cancelled";
  remainingDays: number;
  rating: number | null;
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
    remainingDays: 45,
    rating: null,
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
  },
  {
    id: 3,
    firstName: "رضا",
    lastName: "کریمی",
    startDate: "1402/11/01",
    endDate: "1403/02/29",
    status: "active",
    remainingDays: 90,
    rating: null,
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
  },
];

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
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "#4caf50";
      case "completed":
        return "#2196f3";
      case "cancelled":
        return "#f44336";
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
        padding: isSmallScreen ? 1 : 3,
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
          gap: 2,
          mb: 3,
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{
              mb: 1,
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
            <ToggleButton value="active">فعال</ToggleButton>
            <ToggleButton value="completed">تکمیل شده</ToggleButton>
            <ToggleButton value="cancelled">لغو شده</ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {counselors.length === 0 && (
        <Typography sx={{ textAlign: "center", py: 4 }}>
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
              mb: 2,
              textAlign: "right",
            }}
          >
            لیست مشاوران
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 3,
              maxHeight: isSmallScreen ? "60vh" : "70vh",
              overflowY: "auto",
              minWidth: isSmallScreen ? "100%" : "auto",
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
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
                        }}
                      >
                        نام مشاور
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
                        }}
                      >
                        تاریخ شروع
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
                        }}
                      >
                        تاریخ پایان
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
                        }}
                      >
                        وضعیت
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
                        }}
                      >
                        روزهای باقیمانده
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
                        }}
                      >
                        امتیاز
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
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
                          padding: "16px 8px",
                          height: "64px",
                        }}
                      >
                        اطلاعات مشاور
                      </TableCell>
                      <TableCell
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          padding: "16px 8px",
                          height: "64px",
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
                            padding: "16px 8px",
                            height: "64px",
                          }}
                        >
                          {`${counselor.firstName} ${counselor.lastName}`}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "16px 8px",
                            height: "64px",
                          }}
                        >
                          {counselor.startDate}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "16px 8px",
                            height: "64px",
                          }}
                        >
                          {counselor.endDate}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "16px 8px",
                            height: "64px",
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
                            padding: "16px 8px",
                            height: "64px",
                          }}
                        >
                          {counselor.remainingDays}
                        </TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                            padding: "16px 8px",
                            height: "64px",
                          }}
                        >
                          {counselor.rating ? (
                            <Rating
                              value={counselor.rating}
                              readOnly
                              size="small"
                            />
                          ) : (
                            "بدون امتیاز"
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: "16px 8px", height: "64px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 1,
                            }}
                          >
                            {counselor.status === "active" && (
                              <>
                                <SecondaryButton
                                  name="تمدید"
                                  backgroundColor="rgb(5, 190, 30)"
                                  width="100px"
                                  height="32px"
                                  fontSize="14px"
                                  onClick={() =>
                                    handleExtendClick(counselor.id)
                                  }
                                  borderRadius="12px"
                                />
                                <SecondaryButton
                                  name="لغو"
                                  backgroundColor="rgb(221, 84, 84)"
                                  width="100px"
                                  height="32px"
                                  fontSize="14px"
                                  onClick={() =>
                                    handleCancelClick(counselor.id)
                                  }
                                  borderRadius="12px"
                                />
                                <SecondaryButton
                                  name="امتیازدهی"
                                  backgroundColor="rgb(5, 11, 190)"
                                  width="100px"
                                  height="32px"
                                  fontSize="14px"
                                  onClick={() => handleRate(counselor)}
                                  borderRadius="12px"
                                />
                              </>
                            )}
                            {counselor.status === "completed" &&
                              !counselor.rating && (
                                <SecondaryButton
                                  name="امتیازدهی"
                                  backgroundColor="rgb(5, 11, 190)"
                                  width="100px"
                                  height="32px"
                                  fontSize="14px"
                                  onClick={() => handleRate(counselor)}
                                  borderRadius="12px"
                                />
                              )}
                          </Box>
                        </TableCell>
                      </>
                    )}
                    {isSmallScreen && (
                      <>
                        <TableCell sx={{ padding: "16px 8px", height: "64px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: 1,
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              {`${counselor.firstName} ${counselor.lastName}`}
                            </Typography>
                            <Box
                              sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}
                            >
                              <Typography variant="caption">
                                <strong>تاریخ شروع:</strong>{" "}
                                {counselor.startDate}
                              </Typography>
                              <Typography variant="caption">
                                <strong>تاریخ پایان:</strong>{" "}
                                {counselor.endDate}
                              </Typography>
                              <Typography variant="caption">
                                <strong>وضعیت:</strong>{" "}
                                <span
                                  style={{
                                    color: getStatusColor(counselor.status),
                                  }}
                                >
                                  {getStatusText(counselor.status)}
                                </span>
                              </Typography>
                              <Typography variant="caption">
                                <strong>روزهای باقیمانده:</strong>{" "}
                                {counselor.remainingDays}
                              </Typography>
                              <Typography variant="caption">
                                <strong>امتیاز:</strong>{" "}
                                {counselor.rating ? (
                                  <Rating
                                    value={counselor.rating}
                                    readOnly
                                    size="small"
                                  />
                                ) : (
                                  "بدون امتیاز"
                                )}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ padding: "16px 8px", height: "64px" }}>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              gap: 0.5,
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
                                  borderRadius="12px"
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
                                  borderRadius="12px"
                                />
                                <SecondaryButton
                                  name="امتیازدهی"
                                  backgroundColor="rgb(5, 11, 190)"
                                  width="80px"
                                  height="28px"
                                  fontSize="12px"
                                  onClick={() => handleRate(counselor)}
                                  borderRadius="12px"
                                />
                              </>
                            )}
                            {counselor.status === "completed" &&
                              !counselor.rating && (
                                <SecondaryButton
                                  name="امتیازدهی"
                                  backgroundColor="rgb(5, 11, 190)"
                                  width="80px"
                                  height="28px"
                                  fontSize="12px"
                                  onClick={() => handleRate(counselor)}
                                  borderRadius="12px"
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

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
        <DialogContent sx={{ padding: "24px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              py: 2,
            }}
          >
            <Typography sx={{ fontSize: "1.1rem", color: "#424242" }}>
              لطفاً به مشاور خود امتیاز دهید
            </Typography>
            <Rating
              value={selectedRating}
              onChange={(_, newValue) => setSelectedRating(newValue)}
              size="large"
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
                "& .MuiRating-root": {
                  direction: "rtl",
                },
                "& .MuiRating-decimal": {
                  direction: "ltr",
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions
          sx={{ padding: "16px 24px", borderTop: "1px solid #e0e0e0" }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
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
              onClick={() => setRatingDialogOpen(false)}
            />
            <SecondaryButton
              name="ثبت امتیاز"
              backgroundColor="rgb(5, 122, 190)"
              width="100px"
              height="32px"
              fontSize="14px"
              borderRadius="12px"
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
            sx={{ fontSize: "1.1rem", color: "#424242", textAlign: "center" }}
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
              gap: 2,
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
