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
  animationDelay?: number;
  convertToPersian?: (text: string | number) => string;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  paymentDate,
  amount,
  studentName,
  operation,
  animationDelay = 0,
  convertToPersian = (text: string | number) => text.toString(),
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  // const navigate = useNavigate();
  // const viewProfile = () => {
  //   // navigate(`/OurCounselor/CounselorPage/${counselorId}`);
  // };
  return (
    <TableRow
      sx={{
        ...PITableRowStyles,
        animation: "fadeInRow 0.4s ease-out",
        animationDelay: `${animationDelay}s`,
        "@keyframes fadeInRow": {
          "0%": {
            opacity: 0,
          },
          "100%": {
            opacity: 1,
          },
        },
      }}
    >
      <TableCell sx={PITableCellStyles}>{`${convertToPersian(
        amount
      )} تومان`}</TableCell>
      <TableCell sx={PITableCellStyles}>
        {/* <Link
          onClick={viewProfile}
          underline="always"
          sx={{ cursor: "pointer" }}
        >
          {studentName}
        </Link> */}
        {convertToPersian(studentName)}
      </TableCell>
      <TableCell sx={PITableCellStyles}>
        {convertToPersian(paymentDate)}
      </TableCell>
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
              `شما در تاریخ ${convertToPersian(
                paymentDate
              )} مبلغ ${convertToPersian(
                amount
              )} تومان بابت حق مشاوره دانش‌آموز ${convertToPersian(
                studentName
              )} دریافت کردید.`
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
