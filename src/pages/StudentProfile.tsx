import React, { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Avatar,
  TextField,
  Autocomplete,
  useMediaQuery,
  useTheme,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import InputBox from "@/components/common/inputbox";
import SecondaryButton from "@/components/common/SecondaryButton";
import EditIcon from "@mui/icons-material/Edit";

const StudentProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [isEditMode, setIsEditMode] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState<string[]>([]);
  const [provinceInputValue, setProvinceInputValue] = useState("");
  const [loadingProvinces, setLoadingProvinces] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    majorTitle: "Computer Science",
    gradeLevel: "12",
    lastGradeGPA: "3.8",
    aboutMe:
      "I am a dedicated student with a passion for learning and technology.",
    studentPhoneNumber: "123-456-7890",
    parentPhoneNumber: "987-654-3210",
    birthDate: "2005-01-01",
    schoolName: "High School",
    profileImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            profileImage: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setProvinceInputValue("");
    setProvinceOptions([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "rgb(255, 255, 255)",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(10px)",
          color: "black",
        }}
      >
        <Toolbar></Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: isMobile ? "24px 16px" : isTablet ? "36px 24px" : "48px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 0,
        }}
      >
        <Toolbar />
        {/* Profile Content Box */}
        <Box
          sx={{
            borderRadius: "16px",
            padding: isMobile ? "24px" : isTablet ? "32px" : "40px 80px",
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            maxWidth: "800px",
            margin: "0 auto",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(4px)",
          }}
        >
          {/* Profile Header */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
              padding: "16px",
              borderRadius: "8px",
              gap: isMobile ? "16px" : 0,
            }}
          >
            <h1 style={{ margin: isMobile ? "16px 0 0 0" : 0 }}>
              {isEditMode ? "تغییر پروفایل" : "پروفایل من"}
            </h1>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Avatar
                sx={{
                  width: isMobile ? "150px" : "150px",
                  height: isMobile ? "150px" : "150px",
                  cursor: isEditMode ? "pointer" : "default",
                  transition: "filter 0.3s ease",
                }}
                src={formData.profileImage}
                onClick={() =>
                  isEditMode &&
                  document.getElementById("profile-pic-input")?.click()
                }
              >
                {!formData.profileImage && (
                  <AccountCircleIcon fontSize="large" />
                )}
              </Avatar>
              {isEditMode && (
                <EditIcon
                  sx={{
                    color: "black",
                    fontSize: "20px",
                    cursor: "pointer",
                    position: "absolute",
                    bottom: "5px",
                    right: "5px",
                    backgroundColor: "rgba(203, 203, 203, 0.67)",
                    borderRadius: "50%",
                    padding: "4px",
                    backdropFilter: "blur(4px)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                  }}
                  onClick={() =>
                    document.getElementById("profile-pic-input")?.click()
                  }
                />
              )}
            </Box>
            <input
              type="file"
              id="profile-pic-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
          </Box>

          {/* Fields Container */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Name Fields */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: isMobile ? "16px" : "40px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="نام"
                  name="firstName"
                  direction="rtl"
                  value={formData.firstName}
                  onChange={handleChange}
                  readOnly={true}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="نام خانوادگی"
                  name="lastName"
                  direction="rtl"
                  value={formData.lastName}
                  onChange={handleChange}
                  readOnly={true}
                />
              </Box>
            </Box>

            {/* Contact Information */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: isMobile ? "16px" : "40px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="ایمیل"
                  name="email"
                  direction="ltr"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="شماره تماس دانش آموز"
                  name="studentPhoneNumber"
                  direction="ltr"
                  value={formData.studentPhoneNumber}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
            </Box>

            {/* Parent Contact and School */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: isMobile ? "16px" : "40px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="شماره تماس والدین"
                  name="parentPhoneNumber"
                  direction="ltr"
                  value={formData.parentPhoneNumber}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="نام مدرسه"
                  name="schoolName"
                  direction="rtl"
                  value={formData.schoolName}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
            </Box>

            {/* Academic Information */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: isMobile ? "16px" : "40px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="رشته تحصیلی"
                  name="majorTitle"
                  direction="rtl"
                  value={formData.majorTitle}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="پایه تحصیلی"
                  name="gradeLevel"
                  direction="ltr"
                  value={formData.gradeLevel}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
            </Box>

            {/* GPA and Birth Date */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: isMobile ? "16px" : "40px",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="آخرین معدل"
                  name="lastGradeGPA"
                  direction="ltr"
                  value={formData.lastGradeGPA}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="تاریخ تولد"
                  name="birthDate"
                  direction="ltr"
                  value={formData.birthDate}
                  onChange={handleChange}
                  readOnly={true}
                />
              </Box>
            </Box>

            {/* About Me */}
            <Box sx={{ width: "100%" }}>
              <Box
                component="label"
                sx={{
                  display: "block",
                  fontSize: { xs: "0.9rem", sm: "1rem", md: "1.1rem" },
                  fontWeight: "500",
                  marginBottom: "7px",
                  marginRight: "5px",
                  color: "black",
                  textAlign: "right",
                  direction: "rtl",
                }}
              >
                درباره من
              </Box>
              <TextField
                name="aboutMe"
                value={formData.aboutMe || ""}
                onChange={handleChange}
                multiline
                rows={isMobile ? 4 : 6}
                fullWidth
                variant="outlined"
                margin="none"
                disabled={!isEditMode}
                inputProps={{ readOnly: !isEditMode }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    borderRadius: "8px",
                    transition: "border-color 0.3s ease",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgb(204, 207, 209)",
                      borderWidth: "2px",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: " #1976d2",
                      borderWidth: "2.3px",
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    textAlign: "right",
                    direction: "rtl",
                  },
                }}
              />
            </Box>
          </Box>

          {/* Edit Button */}
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "flex-start",
              gap: 2,
              marginTop: "32px",
            }}
          >
            {isEditMode ? (
              <>
                <SecondaryButton
                  name="ذخیره تغییرات"
                  variant="contained"
                  backgroundColor="rgb(0, 140, 190)"
                  onClick={handleSave}
                  fontSize={isMobile ? "0.9rem" : "1rem"}
                  width={isMobile ? "100%" : "200px"}
                  height={"40px"}
                  borderRadius={{ xs: "0px", sm: "0px", md: "0px" }}
                />
                <SecondaryButton
                  name="انصراف"
                  variant="contained"
                  backgroundColor="rgb(229, 111, 111)"
                  onClick={handleCancel}
                  fontSize={isMobile ? "0.9rem" : "1rem"}
                  width={isMobile ? "100%" : "200px"}
                  height={"40px"}
                  borderRadius={{ xs: "0px", sm: "0px", md: "0px" }}
                />
              </>
            ) : (
              <SecondaryButton
                name="تغییر اطلاعات"
                backgroundColor="rgb(0, 140, 190)"
                fontSize={isMobile ? "0.9rem" : "1rem"}
                width={isMobile ? "100%" : "200px"}
                height={"40px"}
                borderRadius={{ xs: "0px", sm: "0px", md: "0px" }}
                onClick={handleEdit}
              />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudentProfile;
