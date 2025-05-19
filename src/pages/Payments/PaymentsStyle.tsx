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

export const PPaginationStyle: SxProps = {
  "& .MuiPaginationItem-root": {
    color: " #057abe",
    "&.Mui-selected": {
      backgroundColor: " #057abe",
      color: "white",
    },
    "&.MuiPaginationItem-previousNext": {
      transform: "rotate(180deg)",
    },
  },
};

export const PTextStyle: SxProps = {
  textAlign: "center",
  margin: "30px 10px",
};
