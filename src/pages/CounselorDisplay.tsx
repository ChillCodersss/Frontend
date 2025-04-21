import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DomainIcon from "@mui/icons-material/Domain";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import StarIcon from "@mui/icons-material/Star";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ConfirmButton from "@/components/common/ConfirmButton";
import SecondaryButton from "@/components/common/SecondaryButton";
import useMediaQuery from "@mui/material/useMediaQuery";

interface PostData {
  username: string;
  province: string;
  entranceExamYear: string;
  uniMajor: string;
  uniName: string;
  hsMajorTitle: string;
  content: string;
  profilePic: string;
  workExperience: string;
  rating: string;
}

const CounselorDisplay: React.FC = () => {
  const [postData, setPostData] = useState<PostData>({
    username: "",
    province: "",
    entranceExamYear: "",
    uniMajor: "",
    uniName: "",
    hsMajorTitle: "",
    content: "کاربر هنوز توضیحاتی درباره خود اضافه نکرده است.",
    profilePic: "/src/assets/DefaultPerson.png",
    workExperience: "نامشخص",
    rating: "0",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const hasFetched = useRef(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchPostData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:8080/api/Counselor/GetById?Id=2", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        const userData = data.value;

        let profilePicUrl = "/src/assets/DefaultPerson.png";
        if (userData?.picUrl) {
          try {
            const imageResponse = await fetch(
              `http://localhost:8080/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(userData.picUrl)}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              profilePicUrl = URL.createObjectURL(blob);
            } else {
              console.error("Failed to fetch image, using default:", imageResponse.statusText);
            }
          } catch (imageError) {
            console.error("Error fetching profile picture, using default:", imageError);
          }
        } else {
          console.warn("No picUrl provided, using default image.");
        }

        setPostData({
          username: userData.fullName,
          province: userData.province,
          entranceExamYear: userData.entranceExamYear,
          uniMajor: userData.uniMajor || "نامشخص",
          uniName: userData.uniName,
          hsMajorTitle: userData.hsMajorTitle || "نامشخص",
          content:
            userData.aboutMe ||
            ".مشاور کنکور بودن کار دلیه. من تو تک تک ثانیه های سال کنکور در کنارتونم و به عنوان کسی که اختلاف سنی زیادی باهاتون نداره کاملا دغدغه هاتون رو درک میکنم. ...",
          profilePic: profilePicUrl,
          workExperience: userData.workExperience || "3 سال",
          rating: userData.rating || "4.8",
        });
      } catch (error) {
        console.error("خطا در ارتباط با سرور", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, []);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = () => {
    // Add your submission logic here (e.g., API call)
    console.log("Request submitted for counselor:", postData.username);
    setOpenDialog(false);
  };

  const typographyStyles = {
    color: "black",
    fontWeight: "bold",
  };

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        padding: isMobile ? "10px" : "20px",
        boxSizing: "border-box",
        backgroundColor: "#f5f5f5",
        direction: "rtl",
      }}
    >
      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "12px",
            backgroundColor: "white",
            maxWidth: "1300px",
            width: "100%",
            margin: "0 auto",
            overflow: "hidden",
          }}
        >
          {/* Main Content */}
          <Box
            sx={{
              flex: 1,
              padding: isMobile ? "15px" : "30px",
              minWidth: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{ ...typographyStyles, textAlign: "right" }}
                >
                  {postData.username}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <StarIcon sx={{ color: "#f4c417" , paddingBottom: "5px" }} />
                  <Typography
                    variant={isMobile ? "subtitle1" : "body1"}
                    sx={{ ...typographyStyles, textAlign: "left" }}
                  >
                    {postData.rating}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ ...typographyStyles, textAlign: "right" }}
                >
                  رشته {postData.hsMajorTitle}
                </Typography>
                <Typography
                  variant={isMobile ? "subtitle1" : "body1"}
                  sx={{ ...typographyStyles, textAlign: "left" }}
                >
                  تجربه کار: {postData.workExperience}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  {postData.content}
                </Typography>
              </Box>
            </Box>

            {/* Consultation Request */}
            <Box
              sx={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: isMobile ? "15px" : "20px",
                backgroundColor: "#fdfaf4",
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                mt: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#444",
                  fontWeight: "600",
                  textAlign: "right",
                  flex: 1,
                  minWidth: "200px",
                  fontSize: isMobile ? "0.9rem" : "1rem",
                }}
              >
                اگر علاقه‌مند هستی با این مشاور کار کنی، درخواستت رو ثبت کن تا هماهنگی‌های لازم انجام بشه.
              </Typography>

              <ConfirmButton name="ارسال درخواست" type="button" onClick={handleOpenDialog} />
            </Box>
          </Box>

          {/* Sidebar */}
          <Box
            sx={{
              width: isMobile ? "100%" : "230px",
              backgroundColor: "#f4c417",
              borderRadius: isMobile ? "12px 12px 0 0" : "0 0 px 0px 0",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              justifyContent: isMobile ? "space-between" : "flex-start",
              alignItems: isMobile ? "flex-start" : "flex-start",
              padding: isMobile ? "15px" : "20px",
              gap: isMobile ? "10px" : "15px",
            }}
          >
            <img
              src={postData.profilePic}
              alt="Profile"
              onError={(e) => {
                e.currentTarget.src = "/src/assets/DefaultPerson.png";
              }}
              style={{
                width: isMobile ? "120px" : "220px",
                height: isMobile ? "120px" : "220px",
                borderRadius: "50%",
                objectFit: "cover",
                marginLeft: isMobile ? "auto" : "0",
                alignSelf: "center",
                marginBottom: isMobile ? "0" : "16px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                flex: isMobile ? 1 : "unset",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: isMobile ? "140px" : "auto",
                }}
              >
                <LocationOnIcon sx={{ color: "#555" }} />
                <Typography
                  variant="body1"
                  sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                >
                  {postData.province}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: isMobile ? "140px" : "auto",
                }}
              >
                <EventIcon sx={{ color: "#555" }} />
                <Typography
                  variant="body1"
                  sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                >
                  کنکور {postData.entranceExamYear}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: isMobile ? "140px" : "auto",
                }}
              >
                <DomainIcon sx={{ color: "#555" }} />
                <Typography
                  variant="body1"
                  sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                >
                  {postData.uniName}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: isMobile ? "140px" : "auto",
                }}
              >
                <SchoolIcon sx={{ color: "#555" }} />
                <Typography
                  variant="body1"
                  sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}
                >
                  {postData.uniMajor}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#fff", 
            borderRadius: "16px", 
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)", 
            padding: "16px", 
            maxWidth: isMobile ? "90%" : "400px", 
            width: "100%",
          },
          direction: "rtl", 
        }}
      >
        <DialogTitle
          sx={{
            fontSize: isMobile ? "1.2rem" : "1.5rem", 
            fontWeight: "bold",
            textAlign: "center", 
            color: "#333", 
            pb: 1, 
          }}
        >
          تأیید درخواست
        </DialogTitle>
        <DialogContent
          sx={{
            px: isMobile ? 2 : 4, 
            py: 2, 
          }}
        >
          <DialogContentText
            sx={{
              color: "#555", 
              fontSize: isMobile ? "0.9rem" : "1rem", 
              lineHeight: 1.6, 
              textAlign: "center", 
            }}
          >
            آیا مطمئن هستید که می‌خواهید درخواست مشاوره با {postData.username} را ثبت کنید؟
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "space-between", 
            px: isMobile ? 2 : 4, 
            pb: 2,
            gap: 2, 
          }}
        >
          <SecondaryButton
            name="انصراف"
            backgroundColor="#d32f2f" 
            onClick={handleCloseDialog}
            width={isMobile ? "100px" : "120px"} 
            height="40px"
            fontSize={isMobile ? "14px" : "16px"} 
            borderRadius="8px"
          />
          <SecondaryButton
            name="تأیید"
            backgroundColor="#1976d2" 
            onClick={handleConfirm}
            width={isMobile ? "100px" : "120px"} 
            height="40px"
            fontSize={isMobile ? "14px" : "16px"}
            borderRadius="8px"
          />
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CounselorDisplay;