import React from "react";
import { TableRow, TableCell } from "@mui/material";
import { PITableCellStyles, PITableRowStyles } from "./PaymentsItemStyle";

export interface PaymentsItemProps {
  date: string;
  amount: number;
  payTo: string;
  description: string;
}

const PaymentsItem: React.FC<PaymentsItemProps> = ({
  date,
  amount,
  payTo,
  description,
}) => {
  return (
    <TableRow sx={PITableRowStyles}>
      <TableCell sx={PITableCellStyles}>{amount}</TableCell>
      <TableCell sx={PITableCellStyles}>{payTo}</TableCell>
      <TableCell sx={PITableCellStyles}>{date}</TableCell>
      <TableCell sx={PITableCellStyles}>{description}</TableCell>
    </TableRow>
  );
};

export default PaymentsItem;
