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
// import Sidebar from "@/components/Sidebar/Sidebar";
import {
  PTableHeadRowStyle,
  PTableHeadCellStyle,
  PITableContainerStyle,
  PNotificationBoxStyle,
  PNotificationTextStyle,
  PTableBoxStyle,
  PMainBoxStyle,
} from "./PaymentsStyle";
import ConfirmButton from "@/components/common/ConfirmButton";

const Payments = () => {
  // const examplePayments = [
  //   {
  //     date: "2023/10/01",
  //     amount: 200000,
  //     payTo: "علی رضایی",
  //     description: "دوره ۱ ماهه",
  //   },
  //   {
  //     date: "2025/05/03",
  //     amount: 150000,
  //     payTo: "محمد احمدی",
  //     description: "دوره ۳ ماهه",
  //   },
  //   {
  //     date: "2024/12/15",
  //     amount: 300000,
  //     payTo: "زهرا کریمی",
  //     description: "دوره ۶ ماهه",
  //   },
  // ];
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
      {/* <Header/> */}
      {/* <Sidebar /> */}
      <Box sx={PMainBoxStyle}>
        <Box sx={PNotificationBoxStyle}>
          {/* this shit text need to be fixed */}
          <Typography sx={PNotificationTextStyle}>
            با پرداخت مبلغ ۲۰۰۰۰۰ تومان دوره یک ماهه مشاوره خود با استاد محمد
            احمدی را نهایی کنید.
          </Typography>
          <ConfirmButton name="پرداخت" width={"180px"} />
        </Box>
        <Box sx={PTableBoxStyle}>
          {Loading ? (
            <Typography sx={PNotificationTextStyle}>در حال بارگزاری</Typography>
          ) : (
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
                  {Payments.map((payment) => (
                    <PaymentsItem {...payment} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Payments;
