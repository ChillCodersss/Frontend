import { SxProps } from "@mui/material";

export const OuterBoxStyle: SxProps = {
  height: "fit-content",
  width: "100%",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

export const SwiperStyle: SxProps = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  padding: "8px",
  gap: "5px",
  marginRight: "20px",
  marginBottom: "20px",
  zIndex: 10,
  borderRadius: "50%",
};

export const SwiperSlideStyle: SxProps = {
  height: "240px",
  width: "100%",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  background:
    "linear-gradient(90deg, rgba(37, 70, 124, 0.1) 0%,rgb(255, 255, 255) 50%, rgba(37, 70, 124, 0.1) 100%)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  position: "relative",
  "&:hover": {
    boxShadow: "0 2px 4px rgb(0, 0, 0, 0.25)",
  },
  justifySelf: "center",
  alignSelf: "center",
};

export const SwiperSlideTopSection: SxProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px",
  borderRadius: "8px 8px 0 0",
  backgroundColor: "rgb(0, 153, 255)",
  // background:
  //   "linear-gradient(45deg, rgba(8, 57, 136, 0.05) 0%, rgba(8, 57, 136, 0.1) 100%)",
};
export const SwiperSlideTopSectionRateStyle: SxProps = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  paddingLeft: "2px",
  background: "rgba(255, 255, 255, 0.23)",
  padding: "4px 8px",
  borderRadius: "12px",
};
export const SwiperSlideAvatar: SxProps = {
  border: "2px solid #1a49ba",
  transition: "all 0.5s",
  cursor: "pointer",
  "&:hover": {
    boxShadow: "0 4px 12px rgba(8, 57, 136, 0.3)",
    transform: "translateY(-3px)",
  },
};

export const SwiperSlideIconButtonStyle: SxProps = {
  position: "absolute",
  backgroundColor: "#FFD700",
  boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "#FFD700",
    transform: "translateY(-2px)",
    boxShadow: "0 6px 16px rgba(255, 215, 0, 0.4)",
  },
};

export const IconStyle: SxProps = {
  fontSize: "16px",
  verticalAlign: "middle",
  marginLeft: "4px",
  color: "#1a49ba",
};
