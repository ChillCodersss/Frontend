import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  Typography,
  TextField,
  // Button,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  // Rating,
  Pagination,
  IconButton,
  CircularProgress,
  Fade,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import CircleIcon from "@mui/icons-material/Circle";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sampp from "../assets/DefaultPerson.png";
// import ourCounselorPoster from "../assets/ourcounselor_poster.png";
import './OurCounselor.css';
import Logo from "@/assets/UsersGroup.svg";

const toPersianNumber = (num: number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return num.toString().replace(/\d/g, (x) => persianDigits[parseInt(x)]);
};

interface Counselor {
  id: number;
  fullName: string;
  uniMajor: string;
  hsMajor: string;
  uniName: string;
  entranceExamYear: number;
  employmentDuration: number;
  picName: string | null;
  picUrl: string | null; // This is the MinIO file path
  rate: number;
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

const OurCounselor = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const isTablet = useMediaQuery("(min-width:601px) and (max-width:960px)");
  // const isDesktop = useMediaQuery("(min-width:961px)");
  const [filter, setFilter] = React.useState("همه");
  const [searchText, setSearchText] = useState("");
  const [counselors, setCounselors] = useState<Counselor[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [loadingTimeouts, setLoadingTimeouts] = useState<
    Record<string, number>
  >({});
  const pageSize = 4;
  const navigate = useNavigate();

  const getMajorCode = (major: string) => {
    switch (major) {
      case "ریاضی":
        return 1;
      case "تجربی":
        return 2;
      case "انسانی":
        return 3;
      default:
        return null;
    }
  };

  const fetchCounselors = async () => {
    try {
      setLoading(true);
      setError(null);
      const majorCode = filter === "همه" ? null : getMajorCode(filter);
      const response = await axios.get<ApiResponse>(
        "http://62.60.213.13/api/Counselor/GetList",
        {
          params: {
            PageSize: pageSize,
            PageIndex: currentPage,
            FullName: searchText,
            HsMajor: majorCode,
          },
        }
      );

      if (response.data.isSuccess) {
        setCounselors(response.data.value.items || []);
        setTotalPages(response.data.value.totalPages);
      } else {
        setError(
          response.data.error.message || "خطا در دریافت اطلاعات مشاوران"
        );
        setCounselors([]);
      }
    } catch (error) {
      console.error("Error fetching counselors:", error);
      setError("خطا در دریافت اطلاعات مشاوران");
      setCounselors([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchImage = async (picUrl: string): Promise<void> => {
    try {
      // Set a timeout to stop loading after 5 seconds
      const timeoutId = window.setTimeout(() => {
        setImageUrls((prev) => ({
          ...prev,
          [picUrl]: sampp, // Use default avatar after timeout
        }));
      });

      setLoadingTimeouts((prev) => ({
        ...prev,
        [picUrl]: timeoutId,
      }));

      const response = await fetch(
        `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(
          picUrl
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);
        setImageUrls((prev) => ({
          ...prev,
          [picUrl]: imageUrl,
        }));
        // Clear the timeout if image loads successfully
        window.clearTimeout(loadingTimeouts[picUrl]);
      } else {
        // Use default avatar if fetch fails
        setImageUrls((prev) => ({
          ...prev,
          [picUrl]: sampp,
        }));
        window.clearTimeout(loadingTimeouts[picUrl]);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      // Use default avatar if there's an error
      setImageUrls((prev) => ({
        ...prev,
        [picUrl]: sampp,
      }));
      window.clearTimeout(loadingTimeouts[picUrl]);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      for (const counselor of counselors) {
        if (counselor.picUrl) {
          await fetchImage(counselor.picUrl);
        }
      }
    };

    if (counselors.length > 0) {
      fetchImages();
    }

    return () => {
      Object.values(loadingTimeouts).forEach((timeout) =>
        window.clearTimeout(timeout)
      );
    };
  }, [counselors]);

  // Cleanup timeouts when component unmounts
  useEffect(() => {
    return () => {
      Object.values(loadingTimeouts).forEach((timeout) =>
        window.clearTimeout(timeout)
      );
    };
  }, [loadingTimeouts]);

  useEffect(() => {
    fetchCounselors();
  }, [currentPage, filter, searchText]);

  const handleFilterChange = (
    _: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      setCurrentPage(1);
    }
  };

  // const handleSearch = () => {
  //   setCurrentPage(1);
  //   fetchCounselors();
  // };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleViewProfile = (counselorId: number) => {
    navigate(`/OurCounselor/CounselorPage/${counselorId}`);
  };

  return (
    <>
      <Box sx={{ minHeight: "100vh", direction: "rtl" }}>
        {/* Top Poster */}
        <section className='oc-container oc-banner'>
            <div className='oc-banner-bg'>
                <img className="oc-banner-bg-img" src={Logo}/>
            </div>
            <Fade timeout={600} in={true}>
                <h1 className='oc-banner-h'>مشاوران ما</h1>
            </Fade>
            <Fade timeout={600} in={true}>
                <p className="oc-banner-p">با مشاوران متخصص و با تجربه ما، مسیر موفقیت را هموار کنید</p>
            </Fade>
        </section>
        {/* <Box
          sx={{
            width: "100%",
            height: isMobile ? "200px" : "400px",
            background: "radial-gradient(circle at bottom left, #1a49ba, #09f)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
            padding: isMobile ? "0" : "0 40px",
            overflow: "hidden",
          }}
        >
          <Box
            component="img"
            src={ourCounselorPoster}
            alt="Counselor Poster"
            sx={{
              height: isMobile ? "200px" : "600px",
              width: "auto",
              position: "absolute",
              left: isMobile ? "40px" : "200px",
              top: -40,
              display: isMobile ? "none" : "block",
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              position: "relative",
              zIndex: 1,
              marginRight: isMobile ? "20px" : "40px",
            }}
          >
            <Typography
              variant={isMobile ? "h5" : "h2"}
              sx={{
                color: "white",
                textAlign: "right",
                padding: "0 20px",
                maxWidth: "800px",
                fontWeight: "bold",
                textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                fontSize: isMobile ? "1.5rem" : undefined,
              }}
            >
              مشاوران ما
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "h6"}
              sx={{
                color: "white",
                textAlign: "right",
                padding: "0 20px",
                maxWidth: isMobile ? "300px" : "800px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                fontSize: isMobile ? "0.75rem" : undefined,
                whiteSpace: "nowrap",
              }}
            >
              با مشاوران متخصص و با تجربه ما، مسیر موفقیت را هموار کنید
            </Typography>
          </Box>
        </Box> */}

        {/* Search and Filter Container */}
        <Box
          sx={{
            maxWidth: "1200px",
            margin: "20px auto 40px",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: isMobile ? "20px" : "0px",
            flexWrap: "nowrap",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              flex: isMobile ? "1 1 100%" : "1 1 auto",
              minWidth: isMobile ? "100%" : isTablet ? "350px" : "300px",
              maxWidth: isMobile ? "100%" : isTablet ? "600px" : "500px",
              width: isMobile ? "100%" : "auto",
            }}
          >
            <TextField
              fullWidth
              placeholder="جستجو..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon sx={{ color: "rgb(8, 57, 136)", mr: 1 }} />
                ),
              }}
              sx={{
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  backgroundColor: "#f5f5f5",
                  marginRight: isMobile ? "0px" : "40px",
                },
              }}
            />
          </Box>

          <Box
            sx={{
              flex: isMobile ? "1 1 100%" : "0 0 auto",
              width: isMobile ? "100%" : "auto",
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-start",
              marginLeft: isMobile ? "0px" : "40px",
            }}
          >
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilterChange}
              sx={{
                display: "flex",
                gap: "15px",
                "& .MuiToggleButton-root": {
                  border: "1px solid rgb(8, 57, 136)",
                  color: "#rgb(8, 57, 136)",
                  borderRadius: "8px",
                  padding: "8px 16px",
                  "&.Mui-selected": {
                    backgroundColor: "rgb(8, 57, 136)",
                    color: "white",
                  },
                  "&:hover": {
                    backgroundColor: "rgb(177, 188, 205)",
                  },
                },
              }}
            >
              <ToggleButton value="همه">همه</ToggleButton>
              <ToggleButton value="ریاضی">ریاضی</ToggleButton>
              <ToggleButton value="تجربی">تجربی</ToggleButton>
              <ToggleButton value="انسانی">انسانی</ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>

        {/* Counselors Container */}
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            margin: "0 auto",
            padding: isMobile ? "0px 16px" : "0 40px",
            display: "flex",
            justifyContent: "center",
            paddingBottom: isMobile ? "10px" : "50px",
            boxSizing: "border-box",
          }}
        >
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Typography>در حال بارگذاری...</Typography>
            </Box>
          ) : error ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Typography color="error">{error}</Typography>
            </Box>
          ) : counselors.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <Typography>مشاوری یافت نشد</Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                rowGap: "30px",
                columnGap: "40px",
                justifyContent: "center",
                width: "100%",
                maxWidth: "1600px",
              }}
            >
              {counselors.map((counselor) => (
                <Box
                  key={counselor.id}
                  sx={{
                    height: "240px",
                    width: "100%",
                    maxWidth: "500px",
                    backgroundColor: "#fff",
                    borderRadius: "16px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(183, 183, 183, 0.2)",
                    position: "relative",
                    transition: "all 0.3s ease",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* Top Section */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "16px",
                      background:
                        "linear-gradient(45deg, rgba(8, 57, 136, 0.05) 0%, rgba(8, 57, 136, 0.1) 100%)",
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: "rgb(8, 57, 136)", fontWeight: 500 }}
                    >
                      تجربه کار: {toPersianNumber(counselor.employmentDuration)} سال
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        paddingLeft: "2px",
                        background: "rgba(255, 215, 0, 0.1)",
                        padding: "4px 8px",
                        borderRadius: "12px",
                      }}
                    >
                      <StarIcon sx={{ color: "#FFD700", fontSize: "20px" }} />
                      <Typography
                        variant="body2"
                        sx={{ color: "#666", fontWeight: 500 }}
                      >
                        {toPersianNumber(counselor.rate)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Profile Section */}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      padding: "20px",
                      // marginTop: "10px",
                    }}
                  >
                    {counselor.picUrl && !imageUrls[counselor.picUrl] ? (
                      <Box
                        sx={{
                          width: isMobile ? 100 : 120,
                          height: isMobile ? 100 : 120,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "3px solid rgb(8, 57, 136)",
                          borderRadius: "50%",
                          backgroundColor: "rgba(8, 57, 136, 0.05)",
                        }}
                      >
                        <CircularProgress
                          size={isMobile ? 60 : 70}
                          sx={{
                            color: "rgb(8, 57, 136)",
                          }}
                        />
                      </Box>
                    ) : (
                      <Avatar
                        onClick={() => handleViewProfile(counselor.id)}
                        sx={{
                          width: isMobile ? 100 : 120,
                          height: isMobile ? 100 : 120,
                          border: "3px solid rgb(8, 57, 136)",
                          boxShadow: "0 4px 12px rgba(8, 57, 136, 0.2)",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                          "&:hover": {
                            transform: "scale(1.05)",
                            boxShadow: "0 6px 16px rgba(8, 57, 136, 0.3)",
                          },
                        }}
                        src={
                          counselor.picUrl ? imageUrls[counselor.picUrl] : sampp
                        }
                      />
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        justifyContent: "center",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", color: "rgb(8, 57, 136)" }}
                      >
                        {counselor.fullName}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <CircleIcon
                          sx={{
                            fontSize: "16px",
                            color: "rgb(8, 57, 136)",
                            marginLeft: "8px",
                          }}
                        />
                        {counselor.hsMajor}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <SchoolIcon
                          sx={{
                            fontSize: "16px",
                            color: "rgb(8, 57, 136)",
                            marginLeft: "8px",
                          }}
                        />
                        {counselor.uniMajor}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#666",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <EventIcon
                          sx={{
                            fontSize: "16px",
                            color: "rgb(8, 57, 136)",
                            marginLeft: "8px",
                          }}
                        />
                        کنکور {toPersianNumber(counselor.entranceExamYear)}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Navigation Button */}
                  <IconButton
                    onClick={() => handleViewProfile(counselor.id)}
                    sx={{
                      position: "absolute",
                      bottom: isMobile ? "25px" : "20px",
                      left: "20px",
                      backgroundColor: "#FFD700",
                      width: isMobile ? "32px" : isTablet ? "36px" : "40px",
                      height: isMobile ? "32px" : isTablet ? "36px" : "40px",
                      boxShadow: "0 4px 12px rgba(255, 215, 0, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFD700",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 16px rgba(255, 215, 0, 0.4)",
                      },
                    }}
                  >
                    <IoIosArrowBack
                      style={{
                        fontSize: isMobile
                          ? "20px"
                          : isTablet
                          ? "22px"
                          : "24px",
                        color: "rgb(8, 57, 136)",
                      }}
                    />
                  </IconButton>
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Pagination - Only show if there are items */}
        {!loading && !error && counselors.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              // marginBottom: "40px",
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              dir="rtl"
              showFirstButton={false}
              showLastButton={false}
              sx={{
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
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default OurCounselor;
