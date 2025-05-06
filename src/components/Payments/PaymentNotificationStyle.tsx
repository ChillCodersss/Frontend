import { SxProps } from "@mui/material";

export const NotificationBoxStyle: SxProps = {
  display: "flex",
  flexGrow: 1,
  flexDirection: { xs: "column", md: "row" },
  justifyContent: "center",
  alignItems: "center",
  direction: "rtl",
  margin: "50px 0 20px 0",
  padding: "20px",
  backgroundColor: "rgba(90, 129, 235, 0.53)",
  borderRadius: "8px",
  border: "1px solid rgba(71, 61, 247)",
  maxWidth: "75%",
};

export const NotificationTextStyle: SxProps = {
  textAlign: { xs: "center", md: "center" },
  margin: "20px 10px",
};
