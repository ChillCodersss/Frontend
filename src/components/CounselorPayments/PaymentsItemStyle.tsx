import { SxProps } from "@mui/material";

export const PITableCellStyles: SxProps = {
  textAlign: "center",
  padding: "8px",
};
export const PITableOperationCellStyles: SxProps = {
  gap: "10px",
  display: "flex",
  justifyContent: "center",
  flexDirection: { xs: "column", md: "row" },
};
export const PITableRowStyles: SxProps = { "&:hover": { bgcolor: "grey.50" } };
