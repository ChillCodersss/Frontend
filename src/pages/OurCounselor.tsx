import React from "react";
import {
  Box,
  useMediaQuery,
  Typography,
  TextField,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

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
          marginBottom: "100px",
          background: "linear-gradient(to right,rgb(51, 13, 87), #9400D3)", // Fallback color if image is not found
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "white", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}
        >
          مشاوران ما
        </Typography>
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
              backgroundColor: "#9400D3",
              "&:hover": {
                backgroundColor: "#7B00B8",
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
                border: "1px solid #9400D3",
                color: "#9400D3",
                borderRadius: "8px",
                padding: "8px 16px",
                "&.Mui-selected": {
                  backgroundColor: "#9400D3",
                  color: "white",
                },
                "&:hover": {
                  backgroundColor: "rgba(148, 0, 211, 0.1)",
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
          {/* Test counselor boxes */}
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
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgb(183, 183, 183)",
                "&:hover": {
                  boxShadow: "0 4px 4px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Typography variant="h6">مشاور {item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OurCounselor;
