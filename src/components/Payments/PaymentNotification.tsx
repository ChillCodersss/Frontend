import React from "react";
import { useNavigate } from "react-router";
import {
  TableRow,
  TableCell,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SecondaryButton from "../common/SecondaryButton";
import {
  PITableCellStyles,
  PITableRowStyles,
  PITableOperationCellStyles,
} from "./PaymentsItemStyle";
import { payingPayments } from "@/services/payments";
import { getToken } from "@/services/auth";
import { PaymentsItemProps } from "./PaymentsItem";
import { toast } from "react-toastify";

interface NotificationItemProps extends PaymentsItemProps {
  operation: () => void;
  onCancelClick: () => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  id,
  amount,
  payableTo,
  counselingDuration,
  counselorId,
  operation,
  onCancelClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const viewProfile = () => {
    navigate(`/OurCounselor/CounselorPage/${counselorId}`);
  };
  const handlePaymentClick = async () => {
    try {
      const token = getToken() || "";
      const data = await payingPayments(token, id);
      if (data.isSuccess) {
        toast.success(data.message);
        operation();
      } else if (data.isFailure) {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("خطا در انجام پرداخت");
    }
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
      <TableCell sx={PITableCellStyles}>---</TableCell>
      <TableCell sx={PITableOperationCellStyles}>
        <SecondaryButton
          name="پرداخت"
          backgroundColor="rgb(0, 140, 190)"
          fontSize={isMobile ? "0.9rem" : "1rem"}
          width={isMobile ? "90px" : "150px"}
          height={"32px"}
          borderRadius={"8px"}
          onClick={handlePaymentClick}
        />
        <SecondaryButton
          name="لغو"
          backgroundColor="#d32f2f"
          fontSize={isMobile ? "0.9rem" : "1rem"}
          width={isMobile ? "90px" : "150px"}
          height={"32px"}
          borderRadius={"8px"}
          onClick={() => onCancelClick()}
        />
      </TableCell>
    </TableRow>
  );
};
