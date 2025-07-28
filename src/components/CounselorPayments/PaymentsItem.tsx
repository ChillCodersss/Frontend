import React from "react";
import {
  TableRow,
  TableCell,
  // Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PITableCellStyles, PITableRowStyles } from "./PaymentsItemStyle";
// import { useNavigate } from "react-router";
import SecondaryButton from "../common/SecondaryButton";

export interface PaymentsItemProps {
  amount: number;
  paymentDate: string;
  studentName: number;
  operation: (aboutMe: string | null) => void;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  paymentDate,
  amount,
  studentName,
  operation,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const navigate = useNavigate();
  // const viewProfile = () => {
  //   // navigate(`/OurCounselor/CounselorPage/${counselorId}`);
  // };
  return (
    <TableRow sx={PITableRowStyles}>
      <TableCell sx={PITableCellStyles}>{`${amount} تومان`}</TableCell>
      <TableCell sx={PITableCellStyles}>
        {/* <Link
          onClick={viewProfile}
          underline="always"
          sx={{ cursor: "pointer" }}
        >
          {studentName}
        </Link> */}
        {studentName}
      </TableCell>
      <TableCell sx={PITableCellStyles}>{paymentDate}</TableCell>
      <TableCell>
        <SecondaryButton
          name="جزئیات"
          backgroundColor="rgb(63, 81, 181)"
          fontSize={isMobile ? "0.9rem" : "1rem"}
          width={isMobile ? "80px" : "120px"}
          height={"32px"}
          borderRadius="8px"
          onClick={() => {
            operation(
              `شما در تاریخ ${paymentDate} مبلغ ${amount} تومان بابت حق مشاوره دانش‌آموز ${studentName} دریافت کردید.`
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
