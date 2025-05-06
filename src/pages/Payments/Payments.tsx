import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import PaymentsItem, {
  PaymentsItemProps,
} from "../../components/Payments/PaymentsItem";
import { useEffect, useState } from "react";
import { PaymentsHistory } from "@/services/payments";
import { getToken } from "@/services/auth";
import Header from "@/components/Header/Header";
// import Sidebar from "@/components/Sidebar/Sidebar";
import {
  PTableHeadRowStyle,
  PTableHeadCellStyle,
  PITableContainerStyle,
  PTableBoxStyle,
  PMainBoxStyle,
} from "./PaymentsStyle";
import { NotificationTextStyle } from "@/components/Payments/PaymentNotificationStyle";
import { NotificationBox } from "@/components/Payments/PaymentNotification";

const Payments = () => {
  const [Payments, setPayments] = useState<PaymentsItemProps[]>([]);
  const [Loading, setLoading] = useState(true);
  const fetchPayments = async () => {
    try {
      const token = getToken();
      if (!token) {
        console.error("کاربر وارد نشده است.");
        return;
      }
      setLoading(true);
      const response = await PaymentsHistory(token, 10, 1);
      if (response.data.isSuccess) {
        setPayments(response.data.value.items);
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
      {/* <Sidebar /> */}
      {Loading ? (
        <Typography sx={NotificationTextStyle}>در حال بارگزاری</Typography>
      ) : (
        <Box sx={PMainBoxStyle}>
          {Payments.filter((payment) => !payment.isPaid).map((payment) => (
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
                  {Payments.filter((payment) => payment.isPaid).map(
                    (payment) => (
                      <PaymentsItem {...payment} />
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Payments;
