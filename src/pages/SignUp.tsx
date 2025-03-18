import Box from "@mui/material/Box";
import SignUpForm from "@/components/SignUp/Form";
import "./background.css";
import logo from "@/assets/logo2.png";

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
          padding: { xs: "50px", sm: "0" }, // Add padding on small screens
          margin: 0,
        }}
      >
        {/* Box containing form and image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
            width: { xs: "100%", sm: "700px" }, // Full width on small screens
            height: { xs: "auto", sm: "500px" }, // Auto height on small screens
            maxWidth: "1200px", // Max width for PC
            maxHeight: { xs: "none", sm: "600px" }, // Max height for PC
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "12px", // Rounded corners
            overflow: "hidden", // Prevent content from overflowing
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Add shadow
            backdropFilter: "blur(10px)", // Glassy effect
            border: "2px solid #BFD9D9",
          }}
        >
          {/* Left Side: Logo with Glassy Background */}
          <Box
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: { xs: "100px", sm: "100%" }, // Fixed height on mobile
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
              backdropFilter: "blur(10px)", // Glassy effect
              borderRight: {
                xs: "none",
                sm: "1px solid #BFD9D9",
              }, // Optional: Adds a subtle border
            }}
          >
            {/* <img
              src={logo}
              alt="Logo"
              style={{
                width: { xs: "100%", sm: "50%" }, // Adjust the size of the logo
                height: "60%",
              }}
            /> */}
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: { xs: "60%", sm: "80%" }, // Responsive width
                height: { xs: "80%", sm: "60%" },
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
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
              backdropFilter: "blur(10px)", // Glassy effect
            }}
          >
            <SignUpForm />
          </Box>
        </Box>
      </Box>
    </div>
  );
  
};

export default Signup;
