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
} from "@mui/material";
import PaymentsItem, {
  PaymentsItemProps,
} from "../../components/Payments/PaymentsItem";
import { useEffect, useState, useCallback } from "react";
import { PaymentsHistory } from "@/services/payments";
import { getToken } from "@/services/auth";
import Header from "@/components/Header/Header";
import Sidebar from "@/components/Sidebar/Sidebar";
import {
  PTableHeadRowStyle,
  PTableHeadCellStyle,
  PITableContainerStyle,
  PTableBoxStyle,
  PMainBoxStyle,
  PPaginationStyle,
} from "./PaymentsStyle";
import { NotificationTextStyle } from "@/components/Payments/PaymentNotificationStyle";
import { NotificationBox } from "@/components/Payments/PaymentNotification";

const Payments = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [payments, setPayments] = useState<PaymentsItemProps[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, page: number) => {
      setCurrentPage(page);
    },
    []
  );
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

  return (
    <>
      <Header />
      <Sidebar>
        {loading ? (
          <Typography sx={NotificationTextStyle}>در حال بارگزاری</Typography>
        ) : (
          <Box>
            <Box sx={PMainBoxStyle}>
              {payments
                .filter((payment) => !payment.isPaid)
                .map((payment) => (
                  <NotificationBox {...payment} />
                ))}
              <Box sx={PTableBoxStyle}>
                <TableContainer sx={PITableContainerStyle}>
                  <Table>
                    <TableHead>
                      <TableRow sx={PTableHeadRowStyle}>
                        <TableCell sx={PTableHeadCellStyle}>مبلغ</TableCell>
                        <TableCell sx={PTableHeadCellStyle}>مشاور</TableCell>
                        <TableCell sx={PTableHeadCellStyle}>تاریخ</TableCell>
                        <TableCell sx={PTableHeadCellStyle}>طول دوره</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {payments ? (
                        payments
                          .filter((payment) => payment.isPaid)
                          .map((payment) => (
                            <PaymentsItem key={payment.id} {...payment} />
                          ))
                      ) : (
                        <Typography sx={NotificationTextStyle}>
                          {"شما پرداختی ندارید"}
                        </Typography>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
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
          </Box>
        )}
      </Sidebar>
    </>
  );
};

export default Payments;
