import React from "react";
import {
  Box,
  useMediaQuery,
  Typography,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
  Avatar,
  Rating,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SchoolIcon from "@mui/icons-material/School";
import CircleIcon from "@mui/icons-material/Circle";
import SecondaryButton from "../components/common/SecondaryButton";
import { CgArrowBottomLeft } from "react-icons/cg";

const OurCounselor = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [filter, setFilter] = React.useState("همه");

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", direction: "rtl" }}>
      {/* Top Poster */}
      <Box
        sx={{
          width: "100%",
          height: isMobile ? "200px" : "300px",
          backgroundImage: "url(/images/top-poster.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          marginBottom: "20px",
          background: "linear-gradient(to right,rgb(249, 234, 23),rgb(255, 222, 60))", // Fallback color if image is not found
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
      </Box>

      {/* Search and Filter Container */}
      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto 60px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Box
          sx={{ display: "flex", gap: "10px", alignItems: "center", flex: 1 }}
        >
          <TextField
            fullWidth
            placeholder="جستجو..."
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              minWidth: "48px",
              height: "48px",
              borderRadius: "8px",
              backgroundColor: "rgb(8, 57, 136)",
              "&:hover": {
                backgroundColor: "#rgb(8, 57, 136)",
              },
            }}
          >
            <SearchIcon />
          </Button>
        </Box>

        <Box sx={{ marginRight: "60px" }}>
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
          padding: isMobile ? "0 16px" : "0 40px",
          display: "flex",
          justifyContent: "center",
          paddingBottom: "100px",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : "repeat(auto-fit, minmax(400px, 1fr))",
            rowGap: "30px",
            columnGap: "40px",
            justifyContent: "center",
            width: "100%",
            maxWidth: "1600px",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Box
              key={item}
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
                  تجربه کار: ۳ سال
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
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
                  src="src\assets\photo_2024-03-29_17-27-37.jpg"
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
                    امیرمحمد عزیزی
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    <CircleIcon
                      sx={{
                        fontSize: "16px",
                        verticalAlign: "middle",
                        marginLeft: "4px",
                      }}
                    />
                   ریاضی
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    <SchoolIcon
                      sx={{
                        fontSize: "16px",
                        verticalAlign: "middle",
                        marginLeft: "4px",
                      }}
                    />
                      مهندسی کامپیوتر
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#666" }}>
                    <CalendarMonthIcon
                      sx={{
                        fontSize: "16px",
                        verticalAlign: "middle",
                        marginLeft: "4px",
                      }}
                    />
                    کنکور سال ۱۴۰۱
                  </Typography>
                </Box>
              </Box>

              {/* Navigation Button */}
              <SecondaryButton
                name="مشاهده"
                backgroundColor="transparent"
                width="auto"
                height="50px"
                fontSize="16px"
                borderRadius="8px"
                sx={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  padding: "0 20px",
                  minHeight: "35px",
                  lineHeight: "35px",
                  background:
                    "linear-gradient(45deg, rgb(8, 57, 136) 0%,rgb(8, 57, 136) 100%)",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OurCounselor;
