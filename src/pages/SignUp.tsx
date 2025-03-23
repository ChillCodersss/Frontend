import Box from "@mui/material/Box";
import SignUpForm from "@/components/SignUp/Form";
import "./background.css";
import logo from "@/assets/0669059b94bcaa07e8a8443ee02252e7.png";
import { toast, ToastContainer } from "react-toastify";
import "./toast.css";
import { useEffect, useState } from "react";

const Signup = () => {


  return (
    <div className="area">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <Box
        sx={{
          minHeight: "100vh", // Ensure it covers the full viewport height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "20px", sm: "0" }, // Add padding on small screens
          margin: 0,
        }}
      >
        {/* Box containing form and image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
            width: { xs: "100%", sm: "800px" }, // Full width on small screens
            height: { xs: "auto", sm: "600px" }, // Auto height on small screens
            maxWidth: "1200px", // Max width for PC
            maxHeight: { xs: "none", sm: "600px" }, // Max height for PC
            // backgroundColor: "rgba(255, 255, 255, 0.2)",
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "12px", // Rounded corners
            //overflow: "hidden", // Prevent content from overflowing
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(100px)",
            // border: "3px solid rgb(101, 243, 224)",
          }}
        >
          {/* Left Side: Logo with Glassy Background */}
          <Box
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: { xs: "100px", sm: "100%" },
              display: { xs: "none", sm: "flex" }, // Hide on screens smaller than 600px
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: " #f4c417", // Semi-transparent background
              // backgroundColor: "rgba(224, 224, 224, 0.74)",
              backgroundColor : " #d7e2e8",
              backdropFilter: "blur(10px)",
              borderRight: {
                xs: "none",
                sm: "3px solid #BFD9D9",
              },
             borderRadius: "10px 0 0 10px"
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: { xs: "60%", sm: "100%" },
                height: { xs: "80%", sm: "80%" },
              }}
            />
          </Box>

          {/* Right Side: Signup Form */}
          <Box
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: { xs: "auto", sm: "100%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(10px)",
              borderRadius: "12px", // Rounded corners
              marginBottom : { xs: "20px", sm: "0px" },
              marginTop : { xs: "20px", sm: "0px" },
            }}
          >
            <SignUpForm />
          </Box>
        </Box>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="custom-toast-container"
        />
      </Box>
    </div>
  );
};

export default Signup;
