import Box from "@mui/material/Box";
import SignUpForm from '@/components/SignUp/Form';
import EmailIcon from '@mui/icons-material/Email';

// If the image is in the `src` folder, import it like this:
import sampleImage from "@/assets/picture-en3dnh2zi84sgt3t.jpg"; // Adjust the path
const Signup = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh", // Ensure it covers the full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #6a11cb, #2575fc)", // Gradient background
        padding: { xs: "20px", sm: "0" }, // Add padding on small screens
        margin : 0
      }}
    >
      {/* Box containing form and image */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" }, // Stack vertically on small screens
          width: { xs: "100%", sm: "1200px" }, // Full width on small screens
          height: { xs: "auto", sm: "600px" }, // Auto height on small screens
          maxWidth: "1200px", // Max width for PC
          maxHeight: { xs: "none", sm: "600px" }, // Max height for PC
          backgroundColor: "white", // Background color of the box
          borderRadius: "12px", // Rounded corners
          overflow: "hidden", // Prevent content from overflowing
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)", // Add shadow
        }}
      >
        {/* Left Side: Sample Picture */}
        <Box
          sx={{
            width: { xs: "100%", sm: "50%" }, // 50% width on PC, full width on mobile
            height: { xs: "200px", sm: "100%" }, // Fixed height on mobile, full height on PC
            backgroundImage: `url(${sampleImage})`, // Use the imported image
            backgroundSize: "cover", // Cover the entire area
            backgroundPosition: "center", // Center the image
            border: "2px solid red", // Debugging border (remove after testing)
          }}
        />

        {/* Right Side: Signup Form */}
        <Box
          sx={{
            backgroundColor : " rgba(154, 33, 236, 0.1)",
            width: { xs: "100%", sm: "50%" }, // 50% width on PC, full width on mobile
            height: { xs: "auto", sm: "100%" }, // Auto height on mobile, full height on PC
            display: "flex",
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
            //padding: { xs: "20px", sm: "40px" }, // Responsive padding
          }}
        >
          <SignUpForm />
        </Box>
      </Box>
    </Box>
    
  );
};

export default Signup;