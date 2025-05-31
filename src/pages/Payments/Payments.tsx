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
  Button,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import PaymentsItem, {
  PaymentsItemProps,
} from "../../components/Payments/PaymentsItem";
import { useEffect, useState, useCallback } from "react";
import { PaymentsHistory, cancelRequestCounselor } from "@/services/payments";
import { getToken } from "@/services/auth";
import {
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

  const fetchPayments = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("کاربر وارد نشده است.");
        return;
      }
      setLoading(true);
      const data = await PaymentsHistory(token, 10, 1);
      if (data.isSuccess) {
        setPayments(data.value.items);
        setTotalPages(data.totalPages);
        setLoading(false);
      } else {
        console.error("خطا در ارتباط با سرور");
      }
    } catch (error) {
      console.error("خطا در ارتباط با سرور", error);
    }
  };
  useEffect(() => {
    fetchPayments();
  }, []);

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
        fetchPayments();
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
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          width: "220px",
          padding: "5px 10px",
          gap: "2px",
          fontSize: "0.9rem",
          textAlign: "right",
        }}
      />
      <Box>
        {/* Add the title here */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "right",
            margin: "16px 16px 24px 16px",
            color: "#333",
          }}
        >
          پرداخت‌های من
        </Typography>
        {loading ? (
          <Typography sx={PTextStyle}>در حال بارگزاری</Typography>
        ) : (
          <Box>
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
                          .map((payment) => (
                            <NotificationItem
                              key={payment.id}
                              {...payment}
                              operation={fetchPayments}
                              onCancelClick={handleCancelClick}
                            />
                          ))}
                        {payments
                          .filter((payment) => payment.isPaid)
                          .map((payment) => (
                            <PaymentsItem
                              key={payment.id}
                              {...payment}
                              operation={showMoreDetails}
                            />
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Pagination
                      count={totalPages}
                      page={currentPage}
                      onChange={handlePageChange}
                      color="primary"
                      dir="rtl"
                      size={isSmallScreen ? "small" : "medium"}
                      sx={PPaginationStyle}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        )}
        <Dialog
          open={!!moreDetails}
          onClose={closeMoreDetails}
          dir="rtl"
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>جزییات</DialogTitle>
          <DialogContent>
            <Typography>{moreDetails}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeMoreDetails} color="primary">
              بستن
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={cancelDialogOpen}
          onClose={handleCancelClose}
          dir="rtl"
          maxWidth="xs"
          fullWidth
        >
          <DialogTitle sx={{ fontWeight: "bold" }}>
            لغو درخواست مشاوره{" "}
          </DialogTitle>
          <DialogContent>
            <Typography>
              آیا مطمئن هستید که می‌خواهید این پرداخت را لغو کنید؟
            </Typography>
          </DialogContent>
          <DialogActions sx={{ gap: "10px" }}>
            <Button
              onClick={handleCancelClose}
              color="primary"
              variant="contained"
            >
              خیر
            </Button>
            <Button
              onClick={handleCancelConfirm}
              color="error"
              variant="outlined"
            >
              بله، لغو کن
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};

export default Payments;