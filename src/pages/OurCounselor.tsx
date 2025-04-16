import React from "react";
import { Box, useMediaQuery, Typography } from "@mui/material";

const OurCounselor = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ minHeight: "100vh" }}>
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
          Our Counselors
        </Typography>
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
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Typography variant="h6">Counselor {item}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default OurCounselor;
