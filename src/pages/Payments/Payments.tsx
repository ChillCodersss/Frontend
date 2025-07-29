import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import PaymentsItem, {
  PaymentsItemProps,
} from "../../components/Payments/PaymentsItem";
import { useEffect, useState, useCallback } from "react";
import { PaymentsHistory, cancelRequestCounselor } from "@/services/payments";
import { getToken } from "@/services/auth";
import {
  PTitleStyle,
  PTableHeadRowStyle,
  PTableHeadCellStyle,
  PITableContainerStyle,
  PTableBoxStyle,
  PMainBoxStyle,
  PPaginationStyle,
  PTextStyle,
} from "./PaymentsStyle";
import { NotificationItem } from "@/components/Payments/PaymentNotification";
import { toast } from "react-toastify";
import SecondaryButton from "@/components/common/SecondaryButton";
import PaginationItem from "@mui/material/PaginationItem";

// Function to convert English numbers to Persian
const convertToPersianNumbers = (text: string | number): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return text
    .toString()
    .replace(/[0-9]/g, (match) => persianNumbers[parseInt(match)]);
};

const Payments = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [payments, setPayments] = useState<PaymentsItemProps[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moreDetails, setMoreDetails] = useState<string | null>(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  const handlePageChange = useCallback(
    (_: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    []
  );

  const showMoreDetails = useCallback((aboutMe: string | null) => {
    setMoreDetails(aboutMe || "...");
  }, []);

  const closeMoreDetails = useCallback(() => {
    setMoreDetails(null);
  }, []);

  const fetchPayments = async (page: number = 1) => {
    try {
      const token = getToken();
      if (!token) {
        console.error("کاربر وارد نشده است.");
        return;
      }
      setLoading(true);
      const data = await PaymentsHistory(token, 5, page);
      if (data.isSuccess) {
        setPayments(data.value.items);
        setTotalPages(data.value.totalPages);
        setLoading(false);
      } else {
        console.error("خطا در ارتباط با سرور");
        setLoading(false);
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage]);

  const handleCancelClick = () => {
    setCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    try {
      const token = getToken();
      if (!token) {
        return;
      }
      const data = await cancelRequestCounselor(token);
      if (data.isSuccess) {
        toast.success("درخواست با موفقیت لغو شد.");
        fetchPayments(currentPage);
      } else {
        toast.error("خطا در لغو درخواست.");
      }
    } catch (error) {
      toast.error("خطا در ارتباط با سرور");
      console.error("خطا در ارتباط با سرور", error);
    } finally {
      setCancelDialogOpen(false);
    }
  };

  const handleCancelClose = () => {
    setCancelDialogOpen(false);
  };

  return (
    <>
      <Box>
        <Typography
          variant="h5"
          sx={{
            ...PTitleStyle,
            mb: 0,
          }}
        >
          پرداخت‌های من
        </Typography>
        {loading ? (
          <Typography sx={PTextStyle}>در حال بارگذاری</Typography>
        ) : (
          <Box sx={PMainBoxStyle}>
            {payments.length === 0 ? (
              <Typography sx={PTextStyle}>شما پرداختی ندارید</Typography>
            ) : (
              <Box sx={PTableBoxStyle}>
                <TableContainer sx={PITableContainerStyle}>
                  <Table>
                    <TableHead>
                      <TableRow sx={PTableHeadRowStyle}>
                        <TableCell
                          sx={{ ...PTableHeadCellStyle, width: "20%" }}
                        >
                          مبلغ
                        </TableCell>
                        <TableCell
                          sx={{ ...PTableHeadCellStyle, width: "15%" }}
                        >
                          مشاور
                        </TableCell>
                        <TableCell
                          sx={{ ...PTableHeadCellStyle, width: "15%" }}
                        >
                          طول دوره
                        </TableCell>
                        <TableCell
                          sx={{ ...PTableHeadCellStyle, width: "15%" }}
                        >
                          تاریخ
                        </TableCell>
                        <TableCell
                          sx={{ ...PTableHeadCellStyle, width: "35%" }}
                        >
                          عملیات
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payments
                        .filter((payment) => !payment.isPaid)
                        .map((payment, index) => (
                          <NotificationItem
                            key={payment.id}
                            {...payment}
                            operation={fetchPayments}
                            onCancelClick={handleCancelClick}
                            animationDelay={index * 0.1}
                            convertToPersian={convertToPersianNumbers}
                          />
                        ))}
                      {payments
                        .filter((payment) => payment.isPaid)
                        .map((payment, index) => (
                          <PaymentsItem
                            key={payment.id}
                            {...payment}
                            operation={showMoreDetails}
                            animationDelay={index * 0.1}
                            convertToPersian={convertToPersianNumbers}
                          />
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
                    sx={PPaginationStyle}
                    renderItem={(item) => (
                      <PaginationItem
                        {...item}
                        page={
                          item.page
                            ? convertToPersianNumbers(item.page)
                            : undefined
                        }
                      />
                    )}
                  />
                </Box>
              </Box>
            )}
          </Box>
        )}
        <Dialog
          open={!!moreDetails}
          onClose={closeMoreDetails}
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
              جزییات
            </DialogTitle>
          </Box>
          <DialogContent sx={{ padding: "24px" }}>
            <Typography
              sx={{ fontSize: "17.6px", color: "#424242", textAlign: "center" }}
            >
              {moreDetails}
            </Typography>
          </DialogContent>
          <DialogActions
            sx={{ padding: "16px 24px", borderTop: "1px solid #e0e0e0" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <SecondaryButton
                name="بستن"
                backgroundColor="rgb(221, 84, 84)"
                width="100px"
                height="32px"
                fontSize="14px"
                borderRadius="12px"
                onClick={closeMoreDetails}
              />
            </Box>
          </DialogActions>
        </Dialog>

        <Dialog
          open={cancelDialogOpen}
          onClose={handleCancelClose}
          dir="rtl"
          maxWidth="xs"
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
              لغو درخواست مشاوره
            </DialogTitle>
          </Box>
          <DialogContent sx={{ padding: "26px" }}>
            <Typography
              sx={{ fontSize: "17.6px", color: "#424242", textAlign: "center" }}
            >
              آیا مطمئن هستید که می‌خواهید این پرداخت را لغو کنید؟
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
                onClick={handleCancelClose}
              />
              <SecondaryButton
                name="بله"
                backgroundColor="rgb(5, 190, 30)"
                width="100px"
                height="32px"
                fontSize="14px"
                borderRadius="12px"
                onClick={handleCancelConfirm}
              />
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Payments;
