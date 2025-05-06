import { SxProps } from "@mui/material";

export const PMainBoxStyle: SxProps = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

export const PTableBoxStyle: SxProps = { flexGrow: 1, minWidth: "75%" };

export const PITableContainerStyle: SxProps = {
  direction: "rtl",
  boxShadow: 3,
  maxHeight: "70vh",
  overflowY: "auto",
  marginTop: "50px",
};

export const PTableHeadRowStyle: SxProps = {
  backgroundColor: "grey.100",
  textAlign: "right",
};

export const PTableHeadCellStyle: SxProps = {
  fontWeight: "bold",
  textAlign: "center",
  padding: "8px",
};

export const PNotificationBoxStyle: SxProps = {
  display: "flex",
  flexDirection: { xs: "column", md: "row" },
  justifyContent: "center",
  alignItems: "center",
  direction: "rtl",
  margin: "50px 0 20px 0",
  padding: "10px",
  backgroundColor: "rgba(90, 129, 235, 0.53)",
  borderRadius: "8px",
  border: "1px solid rgba(71, 61, 247)",
  maxWidth: "75%",
};

export const PNotificationTextStyle: SxProps = {
  textAlign: { xs: "center", md: "right" },
  margin: "10px",
};
