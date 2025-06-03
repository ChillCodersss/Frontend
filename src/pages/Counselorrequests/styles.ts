import { SxProps, Theme } from "@mui/material";

export const styles: Record<string, SxProps<Theme>> = {
  container: {
    direction: "rtl",
    padding: 1,
    maxWidth: 1200,
    margin: "16px",
    overflowX: "auto",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    py: 4,
  },
  tabs: {
    borderBottom: 1,
    borderColor: "divider",
    mb: 2.5,
    "& .MuiTab-root": {
      fontSize: (theme) => (theme.breakpoints.down("sm") ? "0.875rem" : "1rem"),
      padding: (theme) =>
        theme.breakpoints.down("sm") ? "8px 12px" : "12px 24px",
      color: "#057abe",
      "&.Mui-selected": { color: "#057abe", fontWeight: "bold" },
    },
    "& .MuiTabs-indicator": { backgroundColor: "#057abe" },
  },
  filterSection: {
    display: "flex",
    flexDirection: "row",
    gap: 1,
    mb: 3,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  toggleButtonGroup: {
    gap: "6px",
    flexWrap: (theme) => (theme.breakpoints.down("sm") ? "wrap" : "nowrap"),
    justifyContent: "center",
    "& .MuiToggleButton-root": {
      border: "1px solid #057abe",
      color: "#057abe",
      borderRadius: "8px",
      padding: "8px 16px",
      fontSize: "0.875rem",
      "&.Mui-selected": { backgroundColor: "#057abe", color: "white" },
      "&:hover": { backgroundColor: "rgb(177, 188, 205)" },
    },
  },
  tableContainer: {
    boxShadow: 3,
    maxHeight: (theme) => (theme.breakpoints.down("sm") ? "60vh" : "70vh"),
    overflowY: "auto",
    marginTop: (theme) => (theme.breakpoints.down("sm") ? "20px" : "50px"),
    minWidth: (theme) => (theme.breakpoints.down("sm") ? "100%" : "auto"),
  },
  tableHead: {
    backgroundColor: "grey.100",
    textAlign: "right",
  },
  tableRow: {
    "&:hover": { bgcolor: "grey.50" },
  },
  tableCell: {
    padding: (theme) => (theme.breakpoints.down("sm") ? "8px" : "8px"),
    textAlign: "center",
    verticalAlign: "middle",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    mt: 2,
    "& .MuiPaginationItem-root": {
      color: "#057abe",
      "&.Mui-selected": { backgroundColor: "#057abe", color: "white" },
      "&.MuiPaginationItem-previousNext": { transform: "rotate(180deg)" },
    },
  },
  studentDetailsDialog: {
    "& .MuiDialog-paper": {
      padding: 2,
      borderRadius: 2,
    },
  },
};
