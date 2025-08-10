import { SxProps } from "@mui/material";

export const contactPageBoxStyle: SxProps = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  padding: "20px",
  boxSizing: "border-box",
  animation: "slideLeft 0.5s cubic-bezier(0.4,0,0.2,1)",
  "@keyframes slideLeft": {
    from: {
      opacity: 0,
      transform: "translateX(70px)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  },
};

export const contactPageTitleStyle: SxProps = {
  marginBottom: "16px",
  textAlign: "center",
};

export const contactPageTextFieldStyle: SxProps = {
  marginBottom: "16px",
};

export const contactPageDividerStyle: SxProps = {
  marginBottom: "16px",
};

export const contactPageListBoxStyle: SxProps = {
  maxHeight: 400,
  overflowY: "auto",
};

export const contactPagePaginationBoxStyle: SxProps = {
  direction: "rtl",
  mt: 2,
  display: "flex",
  justifyContent: "center",
};

export const contactPagePaginationStyle: SxProps = {
  marginBottom: "40px",
  "& .MuiPaginationItem-root": {
    color: "rgb(8, 57, 136)",
    "&.Mui-selected": {
      backgroundColor: "rgb(8, 57, 136)",
      color: "white",
    },
    "&.MuiPaginationItem-previousNext": {
      transform: "rotate(180deg)",
    },
  },
};
