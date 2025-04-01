import Box from "@mui/material/Box";
import SignUpForm from "@/components/SignUp/Form";
import "./Signup.css";
import logo from "../assets/preview.png";
import { toast, ToastContainer } from "react-toastify";
import "./toast.css";
import "@/index.css"

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
          minHeight: "100vh", 
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: "20px", sm: "0" }, 
          margin: 0,
        }}
      >
        {/* Box containing form and image */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" }, 
            width: { xs: "100%", sm: "950px" }, 

            height: { xs: "auto", sm: "600px" },
            maxWidth: "1200px", 
            maxHeight: { xs: "none", sm: "600px" }, 
            backgroundColor: "rgb(255, 255, 255)",
            borderRadius: "12px", 
            overflow: "hidden", 
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(100px)",
          }}
        >
          {/* Left Side: Logo with Glassy Background */}
          <Box
            sx={{
              width: { xs: "100%", sm: "50%" },
              height: { xs: "100px", sm: "100%" },
              display: { xs: "none", sm: "flex" }, 
              justifyContent: "center",
              alignItems: "center",
              backgroundColor : " #d5e0e5",
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
                height: { xs: "80%", sm: "100%" },
                borderRadius: "10px 0 0 10px"
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
              borderRadius: "12px", 
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
