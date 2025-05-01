import { SxProps } from "@mui/material";

export const paymentsItemStyles: SxProps = {
  height: { xs: "250px", md: "180px" },
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  display: "flex",
  border: "1px solid rgb(183, 183, 183)",
  marginTop: "10px",
  padding: "10px",
  justifyContent: "space-between",
  position: "relative",
  direction: "rtl",
  "&:hover": {
    boxShadow: "0 4px 4px rgba(0,0,0,0.2)",
  },
};

export const paymentsItemBoxStyles: SxProps = {
  display: { xs: "flex", md: "none" },
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "100%",
  "& > *": {
    marginBottom: "5px",
  },
  "& > *:last-child": {
    marginBottom: "0",
  },
};

export const paymentsItemBoxMdStyles: SxProps = {
  display: { sx: "none", md: "flex" },
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  height: "100%",
  marginLeft: "10px",
  "& > *": {
    marginBottom: "5px",
  },
  "& > *:last-child": {
    marginBottom: "0",
  },
  "& > *:first-child": {
    marginTop: "0",
  },
};

export const paymentsItemBoxEndStyles: SxProps = {
  display: { sx: "none", md: "flex" },
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "space-between",
  height: "100%",
  marginRight: "10px",
};
