import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
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
import { ToastContainer, toast } from "react-toastify";
import { getToken } from "@/services/auth"; 
import "react-toastify/dist/ReactToastify.css";
import "./toast.css"; // Adjust path if different (e.g., src/styles/toast.css)

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
  rate: string;
}

interface ApiResponse {
  isSuccess: boolean;
  isFailure: boolean;
  message: string;
  error: {
    code: string;
    message: string;
  } | null;
  value: boolean;
}

const CounselorDisplay: React.FC = () => {
  const { id } = useParams<{ id?: string }>(); // Optional id for TypeScript
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
    rate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const hasFetched = useRef(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchPostData = async () => {
      if (hasFetched.current || !id) return;
      hasFetched.current = true;
      
      setIsLoading(true);
      try {
        const token = getToken()
        const response = await fetch(`http://62.60.213.13/api/Counselor/GetById?Id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch counselor data: ${response.status}`);
        }

        const data = await response.json();
        const userData = data.value || {};

        let profilePicUrl = "/src/assets/DefaultPerson.png";
        if (userData?.picUrl) {
          try {
            const imageResponse = await fetch(
              `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(userData.picUrl)}`,
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
              console.warn("Failed to fetch image, using default:", imageResponse.statusText);
            }
          } catch (imageError) {
            console.warn("Error fetching profile picture, using default:", imageError);
          }
        }

        setPostData({
          username: userData.fullName || "",
          province: userData.province || "",
          entranceExamYear: userData.entranceExamYear || "",
          uniMajor: userData.uniMajor || "نامشخص",
          uniName: userData.uniName || "",
          hsMajorTitle: userData.hsMajorTitle || "نامشخص",
          content:
            userData.aboutMe ||
            "مشاور کنکور بودن کار دلیه. من تو تک تک ثانیه های سال کنکور در کنارتونم و به عنوان کسی که اختلاف سنی زیادی باهاتون نداره کاملا دغدغه هاتون رو درک میکنم. ...",
          profilePic: profilePicUrl,
          workExperience: userData.workExperience || "3 سال",
          rate: userData.rate,
        });
      } catch (error: any) {
        console.error("Error fetching counselor data:", error);
        toast.error("خطا در بارگذاری اطلاعات مشاور", {
          position: "bottom-right",
          autoClose: 5000,
          rtl: true,
        });
        setPostData(prev => ({
          ...prev,
          content: "خطا در بارگذاری اطلاعات مشاور",
        }));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, [id]);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    if (!id) {
      toast.error("شناسه مشاور نامعتبر است", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
      return;
    }

    // Convert id from string to integer
    const convertedId = parseInt(id, 10);
    if (isNaN(convertedId)) {
      toast.error("شناسه مشاور باید یک عدد معتبر باشد", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", convertedId.toString());
      const token = getToken();
      const response = await fetch("http://62.60.213.13/api/RequestCounselor/Create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },        body: formData, 
      });

      const data: ApiResponse = await response.json();

      if (!response.ok || data.isFailure) {
        console.error("API error:", {
          message: data.message,
          errorCode: data.error?.code,
          errorMessage: data.error?.message,
        });
        throw new Error(data.message || "خطا در ارسال درخواست مشاوره");
      }

      toast.success(data.message || "درخواست مشاوره با موفقیت ثبت شد!", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
      setOpenDialog(false);
    } catch (error: any) {
      console.error("Error submitting request:", error);
      toast.error(error.message || "خطا در ثبت درخواست. لطفاً دوباره تلاش کنید.", {
        position: "bottom-right",
        autoClose: 5000,
        rtl: true,
      });
    }
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
                  {postData.username || "نامشخص"}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <StarIcon sx={{ color: "#FFD700", paddingBottom: "5px" }} />
                  <Typography
                    variant={isMobile ? "subtitle1" : "body1"}
                    sx={{ ...typographyStyles, textAlign: "left" }}
                  >
                    {postData.rate}
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

          <Box
            sx={{
              width: isMobile ? "100%" : "230px",
              backgroundColor: "#f4c417",
              borderRadius: isMobile ? "12px 12px 0 0" : "0",
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
                  {postData.province || "نامشخص"}
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
                  کنکور {postData.entranceExamYear || "نامشخص"}
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
                  {postData.uniName || "نامشخص"}
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
                  {postData.uniMajor || "نامشخص"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

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
            آیا مطمئن هستید که می‌خواهید درخواست مشاوره با {postData.username || "مشاور"} را ثبت کنید؟
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

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        //rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Box>
  );
};

export default CounselorDisplay;