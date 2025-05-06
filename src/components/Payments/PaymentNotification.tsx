import { Box, Typography } from "@mui/material";
import ConfirmButton from "../common/ConfirmButton";
import {
  NotificationBoxStyle,
  NotificationTextStyle,
} from "./PaymentNotificationStyle";
import { payingPayments } from "@/services/payments";
import { getToken } from "@/services/auth";
import { PaymentsItemProps } from "./PaymentsItem";
import { toast, ToastContainer } from "react-toastify";

export const NotificationBox = (payment: PaymentsItemProps) => {
  const text: string = `با پرداخت ${payment.amount} تومان دوره ${payment.counselingDuration}
    ماهه با ${payment.payableTo} را نهایی کنید.`;
  const handlePaymentClick = async () => {
    try {
      const token = getToken() || "";
      const result = await payingPayments(token, payment.id);
      if (result.data.isSuccess) {
        toast.success(result.data.message);
      } else if (result.data.isFailure) {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      toast.error("خطا در انجام پرداخت");
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          width: "220px",
          padding: "5px 10px",
          gap: "2px",
          fontSize: "0.9rem",
          textAlign: "right",
        }}
      />
      <Box sx={NotificationBoxStyle}>
        <Typography sx={NotificationTextStyle}>{text}</Typography>
        <ConfirmButton
          name="پرداخت"
          width={"180px"}
          onClick={handlePaymentClick}
        />
      </Box>
    </>
  );
};
