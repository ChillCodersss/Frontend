import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { PITableCellStyles, PITableRowStyles } from "./PaymentsItemStyle";

export interface PaymentsItemProps {
  id: number;
  amount: number;
  isPaid: boolean;
  counselingDuration: number;
  payableTo: string;
  paymentDate: string;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  paymentDate,
  amount,
  payableTo,
  counselingDuration,
}) => {
  return (
    <TableRow sx={PITableRowStyles}>
      <TableCell sx={PITableCellStyles}>{amount}</TableCell>
      <TableCell sx={PITableCellStyles}>{payableTo}</TableCell>
      <TableCell sx={PITableCellStyles}>{paymentDate}</TableCell>
      <TableCell sx={PITableCellStyles}>{counselingDuration}</TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
