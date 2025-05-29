import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  useMediaQuery,
  Fab,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import CircleIcon from "@mui/icons-material/Circle";
import { IoIosArrowBack } from "react-icons/io";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import SecondaryButton from "../common/SecondaryButton";
import { Navigation, Autoplay } from "swiper/modules";
import {
  OuterBoxStyle,
  SwiperStyle,
  SwiperSlideStyle,
  IconStyle,
  SwiperSlideTopSection,
  SwiperSlideAvatar,
  SwiperSlideTopSectionRateStyle,
  SwiperSlideIconButtonStyle,
} from "./SwiperStyles";
import "swiper";
import "../../../node_modules/swiper/swiper.css";
import "../../../node_modules/swiper/swiper-bundle.css";
import "../../../node_modules/swiper/modules/pagination.css";
import "../../../node_modules/swiper/modules/navigation.css";
import "swiper/swiper-bundle.css";
// import "swiper/swiper-bundle.min.css";
import { useNavigate } from "react-router";

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
  // const isDesktop = useMediaQuery("(min-width:961px)");
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const navigate = useNavigate();

  const fetchCounselors = async () => {
    try {
      const response = await axios.get<ApiResponse>(
        "http://62.60.213.13/api/Counselor/GetList",
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

  return (
    <Box sx={OuterBoxStyle}>
      <Box sx={SwiperStyle}>
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
          slidesPerView={1}
          centeredSlides={true}
          grabCursor={true}
          spaceBetween={30}
          autoplay={{
            delay: 7000,
            disableOnInteraction: true,
            stopOnLastSlide: true,
          }}
          breakpoints={{
            600: {
              centeredSlides: false,
            },
            960: {
              slidesPerView: 3,
              centeredSlides: false,
            },
          }}
          navigation={{
            prevEl: "#custom-prev",
            nextEl: "#custom-next",
          }}
          modules={[Navigation, Autoplay]}
          className="mySwiper"
          style={{ padding: "4px 20px" }}
        >
          {counselors.map((counselor) => (
            <SwiperSlide key={counselor.id}>
              <Box
                key={counselor.id}
                sx={{
                  ...SwiperSlideStyle,
                  maxWidth: isMobile ? "300px" : "500px",
                }}
              >
                {/* Top Section */}
                <Box sx={SwiperSlideTopSection}>
                  <Typography variant="body2" sx={{ color: "#fff" }}>
                    تجربه کار: {counselor.employmentDuration} سال
                  </Typography>
                  <Box sx={SwiperSlideTopSectionRateStyle}>
                    <StarIcon sx={{ color: "#FFD700", fontSize: "20px" }} />
                    <Typography variant="body2" sx={{ color: "#fff" }}>
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
                    onClick={() => {
                      navigate(`/OurCounselor/CounselorPage/${counselor.id}`);
                    }}
                    sx={{
                      width: isMobile ? 100 : 120,
                      height: isMobile ? 100 : 120,
                      ...SwiperSlideAvatar,
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
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", color: "#1a49ba" }}
                    >
                      {counselor.fullName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      <CircleIcon sx={IconStyle} />
                      {counselor.hsMajor}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      <SchoolIcon sx={IconStyle} />
                      {counselor.uniMajor}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      <EventIcon sx={IconStyle} />
                      کنکور {counselor.entranceExamYear}
                    </Typography>
                  </Box>
                </Box>
                <IconButton
                  onClick={() => {
                    navigate(`/OurCounselor/CounselorPage/${counselor.id}`);
                  }}
                  sx={{
                    bottom: isMobile ? "15px" : "20px",
                    left: isMobile ? "15px" : "20px",
                    width: isMobile ? "32px" : isTablet ? "36px" : "40px",
                    height: isMobile ? "32px" : isTablet ? "36px" : "40px",
                    ...SwiperSlideIconButtonStyle,
                  }}
                >
                  <IoIosArrowBack
                    style={{
                      fontSize: isMobile ? "20px" : isTablet ? "22px" : "24px",
                      color: "#1a49ba",
                    }}
                  />
                </IconButton>
              </Box>
            </SwiperSlide>
          ))}
          <SwiperSlide style={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                ...SwiperSlideStyle,
                justifyContent: "center",
                maxWidth: isMobile ? "300px" : "500px",
              }}
            >
              <SecondaryButton
                name="مشاهده بیشتر"
                width={"60%"}
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
