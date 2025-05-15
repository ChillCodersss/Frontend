import React from "react";
import { TableRow, TableCell, Link } from "@mui/material";
import { PITableCellStyles, PITableRowStyles } from "./PaymentsItemStyle";
import { useNavigate } from "react-router";

export interface PaymentsItemProps {
  id: number;
  amount: number;
  isPaid: boolean;
  counselingDuration: number;
  payableTo: string;
  paymentDate: string;
  counselorId: number;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  paymentDate,
  amount,
  payableTo,
  counselingDuration,
  counselorId,
}) => {
  const navigate = useNavigate();
  const viewProfile = () => {
    navigate(`/OurCounselor/CounselorPage/${counselorId}`);
  };
  return (
    <TableRow sx={PITableRowStyles}>
      <TableCell sx={PITableCellStyles}>{`${amount} تومان`}</TableCell>
      <TableCell sx={PITableCellStyles}>
        <Link onClick={viewProfile} underline="always">
          {payableTo}
        </Link>
      </TableCell>
      <TableCell
        sx={PITableCellStyles}
      >{`${counselingDuration} ماهه`}</TableCell>
      <TableCell sx={PITableCellStyles}>{paymentDate}</TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
