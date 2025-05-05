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
import PaymentsItem from "../../components/Payments/PaymentsItem";
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
  const examplePayments = [
    {
      date: "2023/10/01",
      amount: 200000,
      payTo: "علی رضایی",
      description: "دوره ۱ ماهه",
    },
    {
      date: "2025/05/03",
      amount: 150000,
      payTo: "محمد احمدی",
      description: "دوره ۳ ماهه",
    },
    {
      date: "2024/12/15",
      amount: 300000,
      payTo: "زهرا کریمی",
      description: "دوره ۶ ماهه",
    },
  ];

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
                {examplePayments.map((payment) => (
                  <PaymentsItem {...payment} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
};

export default Payments;
