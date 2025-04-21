import React, { useState } from "react";
import { Box, Typography, Avatar, useMediaQuery } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import CircleIcon from "@mui/icons-material/Circle";
import { Swiper, SwiperSlide } from "swiper/react";
// import Footer from "@/components/Footer/Footer";
// import "swiper/css"; there is some problem with this import
//import "swiper/swiper.min.css";
//import "swiper/css/pagination"; there is some problem with this import
//import "swiper/modules/pagination/pagination.min.css";
import "./Landing.css";

import { Pagination } from "swiper/modules";

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

const Landing: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:960px)");
  const isDesktop = useMediaQuery("(min-width:961px)");
  const [counselors, setCounselors] = useState<Counselor[]>([]);

  const fetchCounselors = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://localhost:8080/api/Counselor/GetList",
        {
          params: {},
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

  return (
    <div style={{ width: "100vw", overflowX: "hidden" }}>
      <header
        style={{
          backgroundColor: "gray",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        header
      </header>
      <main>
        <section className="l-container">banner</section>
        <section className="l-container">...</section>
        <section className="l-container">
          <Box>
            <Swiper
              dir="rtl"
              slidesPerView={"auto"}
              grabCursor={true}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {counselors.map((counselor) => (
                <SwiperSlide>
                  <Box
                    key={counselor.id}
                    sx={{
                      height: "250px",
                      width: "100%",
                      maxWidth: "500px",
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
            </Swiper>
          </Box>
        </section>
        <section className="l-container">...</section>
        <section className="l-container">...</section>
      </main>
      <footer
        style={{
          backgroundColor: "gray",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        footer
      </footer>
    </div>
  );
};

export default Landing;
