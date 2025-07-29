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
import { ToastContainer } from "react-toastify";
import PaymentsItem, {
  PaymentsItemProps,
} from "@/components/CounselorPayments/PaymentsItem";
import { useEffect, useState, useCallback } from "react";
import { CounselorPaymentsHistory } from "@/services/counselorPayments";
import { getToken } from "@/services/auth";
import {
  PTableHeadRowStyle,
  PTableHeadCellStyle,
  PITableContainerStyle,
  PTableBoxStyle,
  PMainBoxStyle,
  PPaginationStyle,
  PTextStyle,
} from "./CounselorPaymentsStyles";
import SecondaryButton from "@/components/common/SecondaryButton";
import PaginationItem from "@mui/material/PaginationItem";

// Function to convert English numbers to Persian
const convertToPersianNumbers = (text: string | number): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return text
    .toString()
    .replace(/[0-9]/g, (match) => persianNumbers[parseInt(match)]);
};

const CounselorPayments = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [payments, setPayments] = useState<PaymentsItemProps[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [moreDetails, setMoreDetails] = useState<string | null>(null);

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
      const data = await CounselorPaymentsHistory(token, 5, page);
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
            textAlign: "center",
            margin: "16px 16px 0px 16px",
            color: "#333",
          }}
        >
          پرداخت‌های من
        </Typography>
        {loading ? (
          <Typography sx={PTextStyle}>در حال بارگذاری</Typography>
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
                            دانش‌آموز
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
                        {payments.map((payment, index) => (
                          <PaymentsItem
                            key={index}
                            {...payment}
                            operation={showMoreDetails}
                            animationDelay={index * 0.1}
                            convertToPersian={convertToPersianNumbers}
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
      </Box>
    </>
  );
};

export default CounselorPayments;
