import React from "react";
import {
  TableRow,
  TableCell,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { PITableCellStyles, PITableRowStyles } from "./PaymentsItemStyle";
import { useNavigate } from "react-router";
import SecondaryButton from "../common/SecondaryButton";

export interface PaymentsItemProps {
  id: number;
  amount: number;
  isPaid: boolean;
  counselingDuration: number;
  payableTo: string;
  paymentDate: string;
  counselorId: number;
  operation: (aboutMe: string | null) => void;
  animationDelay?: number;
  convertToPersian?: (text: string | number) => string;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  paymentDate,
  amount,
  payableTo,
  counselingDuration,
  counselorId,
  operation,
  animationDelay = 0,
  convertToPersian = (text: string | number) => text.toString(),
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const viewProfile = () => {
    navigate(`/OurCounselor/CounselorPage/${counselorId}`);
  };
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
        <Link
          onClick={viewProfile}
          underline="always"
          sx={{ cursor: "pointer" }}
        >
          {payableTo}
        </Link>
      </TableCell>
      <TableCell sx={PITableCellStyles}>{`${convertToPersian(
        counselingDuration
      )} ماهه`}</TableCell>
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
              `شما با پرداخت مبلغ ${convertToPersian(
                amount
              )} تومان دوره ${convertToPersian(
                counselingDuration
              )}ماهه با ${payableTo} را در تاریخ ${convertToPersian(
                paymentDate
              )} نهایی کردید.`
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
