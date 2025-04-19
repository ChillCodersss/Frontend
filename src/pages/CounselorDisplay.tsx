import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DomainIcon from '@mui/icons-material/Domain';
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import SecondaryButton from "@/components/common/SecondaryButton";
import { useTheme } from "@mui/material/styles";
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
    profilePic: "https://via.placeholder.com/200x250",
  });

  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);
  const isMobile = useMediaQuery('(max-width:600px)');

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
        setPostData({
          username: `${userData.firstName} ${userData.lastName}`,
          province: userData.province,
          entranceExamYear: userData.entranceExamYear,
          uniMajor: userData.uniMajor || "نامشخص",
          uniName: userData.uniName,
          hsMajorTitle: userData.hsMajorTitle || "نامشخص",
          content: userData.aboutMe ||"مشاور کنکور بودن کار دلیه. من تو تک تک ثانیه های سال کنکور در کنارتونم و به عنوان کسی که اختلاف سنی زیادی باهاتون نداره کاملا دغدغه هاتون رو درک میکنم. با اینکه تجربه خیلی زیادی ندارم به علت علاقه ای که از اول به این حوزه داشتم تک تک نکاتی که از مشاور های خودم و اساتیدم یاد گرفتم رو تو ذهنم دارم و علاوه بر اون از فضای کنکور بعد از آزمون خودم دور نشدم و کاملا آشنا به کنکور نظام جدیدم. برنامه ای که بهتون میدم منظم تر از هر برنامه ای هستش که میتونید تصور کنید و کاملا فکر پشتش هستش و به هیچ وجه خط فکری نامنظم و شلوغ پلوغ تو سال کنکورتون در کنار من ندارید و تکلیف خودتون رو میدونید. از اونجایی که برنامتون با نظمه پس باید سعی کنید اجرا با نظم هم داشته باشید و تک تک روز های اجراتون بررسی میشه. علاوه به کنکور حتما حواسم به امتحان های نهایتتون هم هست و اصلا برای این مسئله احساس نگرانی قرار نیست بکنید. در نهایت هم سعی میکنم تو تماس ها و ارتباط های مستمرمون همه تجربیات خودم و کنکوری ها خفنی که تو محیط های دیگه باهاشون ارتباط داشتم رو در اختیارتون بذارم تا با خیال راحت به هدفی که دلتون میخواد برسید.",
          profilePic: "https://via.placeholder.com/200x250",
        });
      } catch (error) {
        console.error("خطا در ارتباط با سرور", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPostData();
  }, []);

  return (
    <Box sx={{ 
      position: "relative", 
      minHeight: "100vh", 
      width: "100%",
      padding: isMobile ? "10px" : "20px",
      boxSizing: "border-box",
      backgroundColor: "#f5f5f5",
      direction: "rtl",
    }}>
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
              <Typography
                variant={isMobile ? "h5" : "h4"}
                sx={{
                  fontWeight: "1000",
                  color: "black",
                  marginBottom: "10px",
                  textAlign: "right",
                }}
              >
                {postData.username}
              </Typography>

              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{
                  color: "black",
                  fontWeight: "1100",
                  textAlign: "right",
                  marginBottom: "20px",
                }}
              >
                رشته {postData.hsMajorTitle}
              </Typography>

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

              <SecondaryButton
                name="درخواست مشاوره"
                variant="contained"
                backgroundColor="#F4C417"
                height="40px"
                borderRadius="10px"
                sx={{ 
                  color: "black",
                  width: isMobile ? "100%" : "auto",
                  minWidth: "160px",
                }}
              />
            </Box>
          </Box>

          {/* Sidebar */}
          <Box
            sx={{
              width: isMobile ? "100%" : "230px",
              backgroundColor: "#f4c417",
              borderRadius: isMobile ? "12px 12px 0 0" : "0 12px 12px 0",
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              flexWrap: isMobile ? "wrap" : "nowrap",
              justifyContent: isMobile ? "space-around" : "flex-start",
              alignItems: isMobile ? "center" : "flex-start",
              padding: isMobile ? "15px" : "20px",
              gap: "15px",
            }}
          >
            <img
              src="src/assets/logo.jpg"
              alt="Profile"
              style={{
                width: isMobile ? "120px" : "220px",
                height: isMobile ? "120px" : "220px",
                borderRadius: "10px",
                objectFit: "cover",
                alignSelf: "center",
                marginBottom: isMobile ? "0" : "16px",
              }}
            />

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              minWidth: isMobile ? "140px" : "auto",
            }}>
              <LocationOnIcon sx={{ color: "#555" }} />
              <Typography variant="body1" sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}>
                {postData.province}
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              minWidth: isMobile ? "140px" : "auto",
            }}>
              <EventIcon sx={{ color: "#555" }} />
              <Typography variant="body1" sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}>
                کنکور {postData.entranceExamYear}
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              minWidth: isMobile ? "140px" : "auto",
            }}>
              <DomainIcon sx={{ color: "#555" }} />
              <Typography variant="body1" sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}>
                {postData.uniName}
              </Typography>
            </Box>

            <Box sx={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              minWidth: isMobile ? "140px" : "auto",
            }}>
              <SchoolIcon sx={{ color: "#555" }} />
              <Typography variant="body1" sx={{ color: "#555", fontWeight: "700", fontSize: isMobile ? "0.8rem" : "0.9rem" }}>
                {postData.uniMajor}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default CounselorDisplay;