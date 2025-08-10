import React, { useState, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { getToken } from "@/services/auth";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SecondaryButton from "../common/SecondaryButton";
import defaultphoto from "@/assets/DefaultPerson.png"


interface Props {
  studentId: string;
}

const StudentDisplayPopup: React.FC<Props> = ({ studentId }) => {
  const [studentData, setStudentData] = useState({
    firstName: "",
    lastName: "",
    email: "نامشخص",
    majorTitle: "نامشخص",
    gradeLevel: "نامشخص",
    lastGradeGPA: 0,
    aboutMe: "دانش‌آموز هنوز توضیحاتی درباره خود اضافه نکرده است.",
    studentPhoneNumber: "نامشخص",
    parentPhoneNumber: "نامشخص",
    birthDate: "نامشخص",
    schoolName: "نامشخص",
    province: "نامشخص",
    picUrl: "/src/assets/DefaultPerson.png",

  });
  const [isLoading, setIsLoading] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const hasFetched = useRef(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const fetchStudentData = async () => {
      if (hasFetched.current) return;
      hasFetched.current = true;

      setIsLoading(true);
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await fetch(
          `http://62.60.213.13/api/Student/GetById?Id=${studentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch student data: ${response.statusText}`);
        }

        const data = await response.json();
        const userData = data.value;

        const [firstName, ...lastNameParts] = (userData.fullName || "").split(" ");
        const lastName = lastNameParts.join(" ") || "";

        let picUrl = "/src/assets/DefaultPerson.png";
        if (userData?.picUrl) {
          try {
            const imageResponse = await fetch(
              `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(
                userData.picUrl
              )}`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              picUrl = URL.createObjectURL(blob);
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
        } else {
          console.warn("No picUrl provided, using default image.");
        }

        setStudentData({
          firstName: firstName || "",
          lastName: lastName || "",
          email: userData.email || "نامشخص",
          majorTitle: userData.major || "نامشخص",
          gradeLevel: userData.gradeLevel || "نامشخص",
          lastGradeGPA: userData.lastGradeGPA || 0,
          aboutMe:
            userData.aboutMe ||
            "دانش‌آموز هنوز توضیحاتی درباره خود اضافه نکرده است.",
          studentPhoneNumber: userData.studentPhoneNumber || "نامشخص",
          parentPhoneNumber: userData.parentPhoneNumber || "نامشخص",
          birthDate: userData.birthDate || "نامشخص",
          schoolName: userData.schoolName || "نامشخص",
          province: userData.province || "نامشخص",
          picUrl: picUrl,
        });
      } catch (error) {
        console.error("خطا در ارتباط با سرور", error);
        setStudentData((prev) => ({
          ...prev,
        }));
      } finally {
        setIsLoading(false);
      }
    };

    if (openPopup) {
      fetchStudentData();
    }
  }, [openPopup, studentId]);

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
      <SecondaryButton
                    name="نمایش اطلاعات"
                    variant="contained"
                    onClick={handleOpenPopup}
                    fontSize={isMobile ? "0.75rem" : "1rem"}
                    backgroundColor="rgb(63, 81, 181)"
                    width={isMobile ? "80px" : "120px"}
                    height={"40px"}
                    borderRadius="8px"
                  />
      <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            maxWidth: isMobile ? "95vw" : "800px",
            width: "100%",
            overflowX: "hidden",
            margin: 0,
          },
          direction: "rtl",
        }}
      >
        <DialogTitle sx={{ display: "none" }} />
        <DialogContent
          sx={{
            padding: 0,
            overflowX: "hidden",
          }}
        >
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
                overflowX: "hidden",
              }}
            >
              <Box
                sx={{
                  width: isMobile ? "100%" : "230px",
                  backgroundColor: "#1976d2",
                  borderRadius: isMobile ? "12px 12px 0 0" : "0px 0 0 0px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: isMobile ? "15px 20px" : "20px",
                  gap: "10px",
                  flexShrink: 0,
                  boxSizing: "border-box",
                  position: "relative",
                }}
              >
                <IconButton
                  onClick={handleClosePopup}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    color: "white",
                    zIndex: 1,
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={studentData.picUrl}
                  alt="Profile"
                  onError={(e) => {
                    e.currentTarget.src = defaultphoto;
                  }}
                  style={{
                    width: isMobile ? "120px" : "180px",
                    height: isMobile ? "120px" : "180px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Box
                  sx={{
                    width: "100%",
                    textAlign: "center",
                    px: 1,
                  }}
                >
                  <Typography
                    variant={isMobile ? "h5" : "h4"}
                    sx={{
                      ...typographyStyles,
                      wordBreak: "break-word",
                      fontSize: "25px",
                      color: "white"
                    }}
                  >
                    {studentData.firstName} {studentData.lastName}
                  </Typography>
                  <Typography
                    variant={isMobile ? "subtitle1" : "h6"}
                    sx={{
                      ...typographyStyles,
                      wordBreak: "break-word",
                      marginTop: "10px",
                      color: "white"
                    }}
                  >
                    رشته {studentData.majorTitle}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  padding: isMobile ? "15px" : "30px",
                  minWidth: 0,
                  display: "flex",
                  flexDirection: "column",
                  overflowY: "auto",
                  overflowX: "hidden",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    marginBottom: "16px",
                  }}
                >
                  {[
                    { label: "پایه تحصیلی:", value: studentData.gradeLevel },
                    { label: "محل زندگی:", value: studentData.province },
                    { label: "نام مدرسه:", value: studentData.schoolName },
                    { label: "تاریخ تولد:", value: studentData.birthDate },
                    {
                      label: "معدل سال گذشته:",
                      value: studentData.lastGradeGPA,
                    },
                    {
                      label: "شماره دانش‌آموز:",
                      value: studentData.studentPhoneNumber,
                    },
                    {
                      label: "شماره ولی:",
                      value: studentData.parentPhoneNumber,
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        overflow: "hidden",
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#555",
                          fontWeight: 700,
                          fontSize: isMobile ? "13px" : "14px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.label}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: "#555",
                          fontWeight: 700,
                          fontSize: isMobile ? "13px" : "14px",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    ...typographyStyles,
                    marginBottom: "8px",
                    fontSize: isMobile ? "16px" : "18px",
                  }}
                >
                  درباره من:
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    marginBottom: "20px",
                    fontSize: isMobile ? "14px" : "16px",
                    wordBreak: "break-word",
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