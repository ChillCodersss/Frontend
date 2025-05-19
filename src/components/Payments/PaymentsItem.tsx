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
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  paymentDate,
  amount,
  payableTo,
  counselingDuration,
  counselorId,
  operation,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const viewProfile = () => {
    navigate(`/OurCounselor/CounselorPage/${counselorId}`);
  };
  return (
    <TableRow sx={PITableRowStyles}>
      <TableCell sx={PITableCellStyles}>{`${amount} تومان`}</TableCell>
      <TableCell sx={PITableCellStyles}>
        <Link
          onClick={viewProfile}
          underline="always"
          sx={{ cursor: "pointer" }}
        >
          {payableTo}
        </Link>
      </TableCell>
      <TableCell
        sx={PITableCellStyles}
      >{`${counselingDuration} ماهه`}</TableCell>
      <TableCell sx={PITableCellStyles}>{paymentDate}</TableCell>
      <TableCell>
        <SecondaryButton
          name="جزییات"
          backgroundColor="rgb(0, 140, 190)"
          fontSize={isMobile ? "0.9rem" : "1rem"}
          width={isMobile ? "90px" : "150px"}
          height={"32px"}
          borderRadius={"8px"}
          onClick={() => {
            operation(
              `شما با پرداخت مبلغ ${amount} تومان دوره ${counselingDuration}ماهه با ${payableTo} را در تاریخ ${paymentDate} نهایی کردید.`
            );
          }}
        />
      </TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
