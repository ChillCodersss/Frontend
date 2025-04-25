import axios from "axios";
import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, useMediaQuery, Fab } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import SecondaryButton from "../common/SecondaryButton";
import { Navigation } from "swiper/modules";
import "swiper";
import "../../../node_modules/swiper/swiper.css";
import "../../../node_modules/swiper/swiper-bundle.css";
import "../../../node_modules/swiper/modules/pagination.css";
import "../../../node_modules/swiper/modules/navigation.css";
import "swiper/swiper-bundle.css";
// import "swiper/swiper-bundle.min.css";
import { useNavigate } from "react-router";

// there is a bug in the swiiper that enables the scroll part of the browser

interface Counselor {
  id: number;
  fullName: string;
  uniMajor: string;
  hsMajor: string;
  uniName: string;
  entranceExamYear: string;
  employmentDuration: number;
  picName: string | null;
  picUrl: string;
}

interface ApiResponse {
  value: {
    items: Counselor[];
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    totalCount: number;
    filteredCount: number;
  };
  isSuccess: boolean;
  isFailure: boolean;
  message: string | null;
  error: {
    code: string;
    message: string;
  };
}

const CounselorSwiper = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:960px)");
  const isDesktop = useMediaQuery("(min-width:961px)");
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const navigate = useNavigate();

  const fetchCounselors = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://localhost:8080/api/Counselor/GetList",
        {
          params: { PageSize: 5, PageIndex: 1 },
        }
      );

      if (response.data.isSuccess) {
        setCounselors(response.data.value.items || []);
      } else {
        setCounselors([]);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
      setCounselors([]);
    }
  };

  useEffect(() => {
    fetchCounselors();
  }, []);

  const SPV = isMobile || isTablet ? 1 : 3;
  const centered = isMobile ? true : false;

  return (
    <Box
      sx={{
        padding: "20px 0px",
        height: "100vh",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: "8px",
          gap: "5px",
          marginRight: "20px",
          marginBottom: "20px",
          // position: "absolute",
          // top: "10px",
          // right: "10px",
          zIndex: 10,
          // backgroundColor: "#f4c417",
          borderRadius: "50%",
          // cursor: "pointer",
        }}
      >
        <Fab sx={{ boxShadow: "none" }} aria-label="next" id="custom-next">
          <ArrowBackIosRoundedIcon />
        </Fab>
        <Fab sx={{ boxShadow: "none" }} aria-label="prev" id="custom-prev">
          <ArrowForwardIosRoundedIcon />
        </Fab>
      </Box>
      <Box>
        <Swiper
          dir="rtl"
          slidesPerView={SPV}
          grabCursor={true}
          spaceBetween={30}
          centeredSlides={centered}
          navigation={{
            prevEl: "#custom-prev",
            nextEl: "#custom-next",
          }}
          modules={[Navigation]}
          className="mySwiper"
          style={{ padding: "0 20px" }}
        >
          {counselors.map((counselor) => (
            <SwiperSlide key={counselor.id}>
              <Box
                key={counselor.id}
                sx={{
                  height: "250px",
                  width: "100%",
                  maxWidth: isMobile ? "300px" : "500px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  border: "1px solid rgb(183, 183, 183)",
                  position: "relative",
                  "&:hover": {
                    boxShadow: "0 4px 4px rgba(0,0,0,0.2)",
                  },
                }}
              >
                {/* Top Section */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px",
                  }}
                >
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    تجربه کار: {counselor.employmentDuration} سال
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      paddingLeft: "2px",
                    }}
                  >
                    <StarIcon sx={{ color: "#FFD700", fontSize: "20px" }} />
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      ۴.۸
                    </Typography>
                  </Box>
                </Box>

                {/* Profile Section */}
                <Box
                  sx={{
                    display: "flex",
                    gap: "16px",
                    padding: "0 16px",
                    marginTop: "10px",
                  }}
                >
                  <Avatar
                    sx={{
                      width: isMobile ? 100 : 120,
                      height: isMobile ? 100 : 120,
                      border: "2px solid rgb(8, 57, 136)",
                    }}
                    src={counselor.picUrl}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {counselor.fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      <CircleIcon
                        sx={{
                          fontSize: "16px",
                          verticalAlign: "middle",
                          marginLeft: "4px",
                        }}
                      />
                      {counselor.hsMajor}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      <SchoolIcon
                        sx={{
                          fontSize: "16px",
                          verticalAlign: "middle",
                          marginLeft: "4px",
                        }}
                      />
                      {counselor.uniMajor}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      <EventIcon
                        sx={{
                          fontSize: "16px",
                          verticalAlign: "middle",
                          marginLeft: "4px",
                        }}
                      />
                      کنکور {counselor.entranceExamYear}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
          <SwiperSlide>
            <Box
              sx={{
                height: "250px",
                width: "100%",
                maxWidth: isMobile ? "300px" : "500px",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                border: "1px solid rgb(183, 183, 183)",
                position: "relative",
                "&:hover": {
                  boxShadow: "0 4px 4px rgba(0,0,0,0.2)",
                },
              }}
            >
              <SecondaryButton
                name="مشاهده بیشتر"
                width={"50%"}
                height={"60px"}
                backgroundColor={"#f4c417"}
                fontSize={"20px"}
                borderRadius={"9px"}
                onClick={() => {
                  navigate("/OurCounselor");
                }}
              />
            </Box>
          </SwiperSlide>
        </Swiper>
      </Box>
    </Box>
  );
};

export default CounselorSwiper;
