import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";

type ConfirmButtonProps = {
  name: string;
  onClick: () => void;
};

const ConfirmButton: React.FC<ConfirmButtonProps> = ({ name, onClick }) => (
  <Button
    variant="contained"
    onClick={onClick}
    sx={{
      backgroundColor: '#1976d2',
      color: 'white',
      fontWeight: 'bold',
      borderRadius: '8px',
      padding: '8px 16px',
      '&:hover': { backgroundColor: '#1565c0' },
    }}
  >
    {name}
  </Button>
);

const StudentDisplayPopup = () => {
  const { id } = useParams();
  const [studentData, setStudentData] = useState({
    firstName: "امیرمحمد",
    lastName: "عزیزی",
    email: "amirazizigh@gmail.com",
    majorTitle: "ریاضی",
    gradeLevel: "دهم",
    lastGradeGPA: 19,
    aboutMe: "الان چهار ساله که مشاور کنکورم چون میخوام به دانش آموزایی که شرایط مشابه منو داشتن بگم که در آخر تلاش پیوسته حتی میتونه یه سد بزرگ کنکور رو بشکونه. حالا تو این مسیر تمام تجربیات و نتایج آزمون و خطاهامو برات میگم تا تو دیگه وقتتو براشون تلف نکنی و یه راست از نتیجشون استفاده بکنی و از رقبات که هیچ ، حتی از من هم جلو بزنی ! البته من یه فرقی با اکثر مشوارا دارم . این که فقط وضعیت درسیتو بررسی نمیکنم . لایف استایل کنکوری باید داشته باشی که کمتر در معرض مریضی و افسردگی قرار بگیری که در اکثر مواقع تو پر انرژی ترین ورژن خودت باشی ! پس در واقع مشاوره ما علاوه بر تحصیلی ، روانشناسی و رفاقتی هم هست طوری که بعد کنکورم در ارتباطیم . راستی من دارم برای کنکور ارشد میخونم و میتونیم خیلی اوقات باهم درس بخونیم … فوق العادست ! اگر آماده ای بیا تا شروع کنیم",
    studentPhoneNumber: "09013385313",
    parentPhoneNumber: "09013385313",
    birthDate: "19/2/1383",
    schoolName: "شریعتی",
    province: "تهران",
    profilePicName: "/src/assets/DefaultPerson.png",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const hasFetched = useRef(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchStudentData = async () => {
      if (hasFetched.current || !id) return;
      hasFetched.current = true;

      setIsLoading(true); 
      try { 
        const response = await fetch( 
          `http://localhost:8080/api/Student/GetById?Id=${id}`, 
          { 
            method: "GET", 
            headers: { "Content-Type": "application/json" }, 
          } 
        ); 

        if (!response.ok) { 
          throw new Error("Failed to fetch student data"); 
        } 

        const data = await response.json(); 
        const userData = data.value; 

        let profilePicUrl = "/src/assets/DefaultPerson.png"; 
        if (userData?.profilePicName) { 
          try { 
            const imageResponse = await fetch( 
              `http://localhost:8080/api/MediaFiles/StreamImg?FileUrl=${encodeURIComponent( 
                userData.profilePicName 
              )}`, 
              { method: "GET", headers: { "Content-Type": "application/json" } } 
            ); 

            if (imageResponse.ok) { 
              const blob = await imageResponse.blob(); 
              profilePicUrl = URL.createObjectURL(blob); 
            } else { 
              console.error( 
                "Failed to fetch image, using default:", 
                imageResponse.statusText 
              ); 
            } 
          } catch (imageError) { 
            console.error( 
              "Error fetching profile picture, using default:", 
              imageError 
            ); 
          } 
        } 

        setStudentData({ 
          firstName: userData.firstName || "", 
          lastName: userData.lastName || "", 
          email: userData.email || "", 
          majorTitle: userData.majorTitle || "نامشخص", 
          gradeLevel: userData.gradeLevel || "نامشخص", 
          lastGradeGPA: userData.lastGradeGPA || 0, 
          aboutMe: 
            userData.aboutMe || 
            "دانش‌آموز هنوز توضیحاتی درباره خود اضافه نکرده است.", 
          studentPhoneNumber: userData.studentPhoneNumber || "نامشخص", 
          parentPhoneNumber: userData.parentPhoneNumber || "نامشخص", 
          birthDate: userData.birthDate 
            ? new Date(userData.birthDate).toLocaleDateString("fa-IR") 
            : "نامشخص", 
          schoolName: userData.schoolName || "نامشخص", 
          province: userData.province || "نامشخص", 
          profilePicName: profilePicUrl, 
        }); 
      } catch (error) { 
        console.error("خطا در ارتباط با سرور", error); 
        setStudentData((prev) => ({ 
          ...prev, 
          aboutMe: "خطا در بارگذاری اطلاعات دانش‌آموز", 
        })); 
      } finally { 
        setIsLoading(false); 
      } 
    }; 

    if (openPopup) { 
      fetchStudentData(); 
    }
  }, [id, openPopup]);

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const typographyStyles = {
    color: "black",
    fontWeight: "bold",
  };

  return (
    <Box sx={{ padding: "20px", textAlign: "center" }}>
      <ConfirmButton name="نمایش اطلاعات دانش‌آموز" onClick={handleOpenPopup} />
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            maxWidth: isMobile ? "90%" : "800px",
            width: "100%",
            overflow: "hidden",
          },
          direction: "rtl",
        }}
      >
        <DialogTitle sx={{ display: "none" }} />
        <DialogContent sx={{ padding: 0 }}>
          {isLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                backgroundColor: "white",
                width: "100%",
                height: isMobile ? "auto" : "500px",
              }}
            >
              {/* Profile Section (Fixed) */}
              <Box
                sx={{
                  width: isMobile ? "100%" : "230px",
                  backgroundColor: "#f4c417",
                  borderRadius: isMobile ? "12px 12px 0 0" : "12px 0 0 12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: isMobile ? "15px" : "20px",
                  gap: "10px",
                  flexShrink: 0,
                }}
              >
                <img
                  src={studentData.profilePicName}
                  alt="Profile"
                  onError={(e) => {
                    e.currentTarget.src = "/src/assets/DefaultPerson.png";
                  }}
                  style={{
                    width: isMobile ? "120px" : "180px",
                    height: isMobile ? "120px" : "180px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Typography
                  variant={isMobile ? "h5" : "h4"}
                  sx={{ ...typographyStyles, textAlign: "center" }}
                >
                  {studentData.firstName} {studentData.lastName}
                </Typography>
                <Typography
                  variant={isMobile ? "subtitle1" : "h6"}
                  sx={{ ...typographyStyles, textAlign: "center" }}
                >
                  رشته: {studentData.majorTitle}
                </Typography>
              </Box>

              {/* Details Section (Scrollable) */}
              <Box
                sx={{
                  flex: 1,
                  padding: isMobile ? "15px" : "30px",
                  minWidth: "200px",
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    ...typographyStyles,
                    textAlign: "right",
                    mb: 3,
                    color: "#1976d2",
                  }}
                >
                  اطلاعات دیگر
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    mb: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-icons" style={{ color: "#555" }}>
                      پایه تحصیلی:
                    </span>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        fontWeight: "700",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {studentData.gradeLevel}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-icons" style={{ color: "#555" }}>
                      محل زندگی:
                    </span>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        fontWeight: "700",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {studentData.province}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-icons" style={{ color: "#555" }}>
                      نام مدرسه:
                    </span>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        fontWeight: "700",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {studentData.schoolName}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-icons" style={{ color: "#555" }}>
                      تاریخ تولد:
                    </span>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        fontWeight: "700",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {studentData.birthDate}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-icons" style={{ color: "#555" }}>
                      معدل سال گذشته:
                    </span>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        fontWeight: "700",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {studentData.lastGradeGPA}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-icons" style={{ color: "#555" }}>
                      شماره دانش‌آموز:
                    </span>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        fontWeight: "700",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {studentData.studentPhoneNumber}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}>
                    <span className="material-icons" style={{ color: "#555" }}>
                      شماره ولی:
                    </span>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#555",
                        fontWeight: "700",
                        fontSize: isMobile ? "0.8rem" : "0.9rem",
                      }}
                    >
                      {studentData.parentPhoneNumber}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    ...typographyStyles,
                    marginBottom: "8px",
                    fontSize: isMobile ? "1rem" : "1.1rem",
                  }}
                >
                  درباره من:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    fontSize: isMobile ? "0.9rem" : "1rem",
                  }}
                >
                  {studentData.aboutMe}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default StudentDisplayPopup;