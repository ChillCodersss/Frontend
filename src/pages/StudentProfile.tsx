import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Avatar,
  TextField,
  Autocomplete,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { getToken } from "@/services/auth";
import InputBox from "@/components/common/inputbox";
import SecondaryButton from "@/components/common/SecondaryButton";
import Header from "@/components/Header/Header";

interface FormData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  major: string;
  gradeLevel: string;
  lastGradeGPA: string;
  aboutMe: string;
  studentPhoneNumber: string;
  parentPhoneNumber: string;
  birthDate: string;
  schoolName: string;
  province: string;
  profilePicUrl: string;
  profileImage: string;
}

const majorMap: { [key: number]: string } = {
  1: "ریاضی",
  2: "تجربی",
  3: "انسانی",
};
const reverseMajorMap: { [key: string]: number } = {
  ریاضی: 1,
  تجربی: 2,
  انسانی: 3,
};

const StudentProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [isEditMode, setIsEditMode] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState<string[]>([]);
  const [provinceInputValue, setProvinceInputValue] = useState("");
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  // Static birthdate
  const staticBirthDate = "2000-01-01";

  const [initialFormData, setInitialFormData] = useState<FormData>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    major: "",
    gradeLevel: "",
    lastGradeGPA: "",
    aboutMe: "",
    studentPhoneNumber: "",
    parentPhoneNumber: "",
    birthDate: staticBirthDate,
    schoolName: "",
    province: "",
    profilePicUrl: "",
    profileImage: "",
  });

  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    birthDate: staticBirthDate,
  });

  // Function to check if there are any changes
  const hasChanges = () => {
    const formDataKeys = Object.keys(formData) as (keyof FormData)[];
    return (
      formDataKeys.some((key) => formData[key] !== initialFormData[key]) ||
      profilePicFile !== null
    );
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://62.60.213.13/api/Student/Profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log("API Response:", data);

        const mappedData: FormData = {
          id: data.value.id || 0,
          firstName: data.value.firstName || "",
          lastName: data.value.lastName || "",
          email: data.value.email || "",
          major: majorMap[reverseMajorMap[data.value.majorTitle]] || "",
          gradeLevel: data.value.gradeLevel || "",
          lastGradeGPA: data.value.lastGradeGPA?.toString() || "",
          aboutMe: data.value.aboutMe || "",
          studentPhoneNumber: data.value.studentPhoneNumber || "",
          parentPhoneNumber: data.value.parentPhoneNumber || "",
          birthDate: staticBirthDate, // Use static birthdate
          schoolName: data.value.schoolName || "",
          province: data.value.province || "",
          profilePicUrl: data.value.profilePicUrl || "",
          profileImage: "",
        };

        let profilePicUrl = "";
        if (data.value.profilePicUrl) {
          try {
            const imageResponse = await fetch(
              `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(
                data.value.profilePicUrl
              )}`,
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
              console.error("Failed to fetch image:", imageResponse.statusText);
            }
          } catch (imageError) {
            console.error("Error fetching profile picture:", imageError);
          }
        }
        setFormData({ ...mappedData, profileImage: profilePicUrl });
        setInitialFormData({ ...mappedData, profileImage: profilePicUrl });
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMajorChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      major: value,
    }));
  };

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            profileImage: (event.target?.result as string) || "",
          }));
          setProfilePicFile(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    try {
      const token = getToken();
      if (!token) {
        return;
      }

      const gradeLevelMap = {
        دهم: 1,
        یازدهم: 2,
        دوازدهم: 3,
      };

      const gradeLevelValue =
        gradeLevelMap[formData.gradeLevel as keyof typeof gradeLevelMap] || 0;
      const majorValue = formData.major ? reverseMajorMap[formData.major] : 0;
      const lastGradeGPAValue = parseFloat(formData.lastGradeGPA) || 0.0;

      // Use static birthdate in ISO-8601 format
      const formattedBirthDate = new Date(staticBirthDate).toISOString();

      const requestData = {
        Id: formData.id,
        Email: formData.email || "",
        GradeLevel: gradeLevelValue,
        Major: majorValue,
        LastGradeGPA: lastGradeGPAValue,
        AboutMe: formData.aboutMe || "",
        StudentPhoneNumber: formData.studentPhoneNumber || "",
        ParentPhoneNumber: formData.parentPhoneNumber || "",
        SchoolName: formData.schoolName || "",
        Province: formData.province || "",
        BirthDate: formattedBirthDate,
      };

      console.log("Request payload:", requestData);

      const formDataPayload = new FormData();
      formDataPayload.append("Id", formData.id.toString());
      formDataPayload.append("Email", requestData.Email);
      formDataPayload.append("GradeLevel", requestData.GradeLevel.toString());
      formDataPayload.append("Major", requestData.Major.toString());
      formDataPayload.append(
        "LastGradeGPA",
        requestData.LastGradeGPA.toString()
      );
      formDataPayload.append("AboutMe", requestData.AboutMe);
      formDataPayload.append(
        "StudentPhoneNumber",
        requestData.StudentPhoneNumber
      );
      formDataPayload.append(
        "ParentPhoneNumber",
        requestData.ParentPhoneNumber
      );
      formDataPayload.append("SchoolName", requestData.SchoolName);
      formDataPayload.append("Province", requestData.Province);
      formDataPayload.append("BirthDate", requestData.BirthDate);

      if (profilePicFile) {
        formDataPayload.append("ProfilePic", profilePicFile);
      }

      const response = await fetch(
        "http://62.60.213.13/api/Student/UpdateProfile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataPayload,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);

        if (errorData.errors) {
          const validationErrors = Object.entries(errorData.errors)
            .map(
              ([field, errors]) =>
                `${field}: ${(errors as string[]).join(", ")}`
            )
            .join("\n");
          throw new Error(`خطاهای اعتبارسنجی:\n${validationErrors}`);
        }

        throw new Error(
          errorData.title || errorData.message || "خطا در بروزرسانی پروفایل"
        );
      }

      const data = await response.json();
      console.log("Update response:", data);

      if (data.isSuccess) {
        let profilePicUrl = formData.profileImage;
        if (data.value?.profilePicUrl) {
          try {
            const imageResponse = await fetch(
              `http://62.60.213.13/api/MediaFiles/StramImg?FileUrl=${encodeURIComponent(
                data.value.profilePicUrl
              )}`,
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
            }
          } catch (imageError) {
            console.error("خطا در دریافت تصویر پروفایل:", imageError);
          }
        }

        setFormData((prev) => ({
          ...prev,
          profileImage: profilePicUrl,
        }));

        setInitialFormData((prev) => ({
          ...prev,
          profileImage: profilePicUrl,
        }));

        setProfilePicFile(null);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("خطا در ذخیره پروفایل:", error);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData({ ...initialFormData, birthDate: staticBirthDate });
    setProvinceInputValue("");
    setProvinceOptions([]);
    setProfilePicFile(null);
  };

  const noopChange = () => {};

  useEffect(() => {
    const fetchProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const token = getToken();
        if (!token) {
          console.error("No token for province fetch");
          return;
        }

        const response = await fetch(
          `http://62.60.213.13/api/Provinces/Dropdown?input=${encodeURIComponent(
            provinceInputValue || ""
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (data.isSuccess) {
          setProvinceOptions(data.value || []);
        }
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setLoadingProvinces(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      if (provinceInputValue.length > 0) {
        fetchProvinces();
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [provinceInputValue]);

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", padding: "40px" }}>
        Loading profile...
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: "center", padding: "40px", color: "error.main" }}>
        {error}
      </Box>
    );
  }

  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          backgroundImage: "url('/src/assets/ProfileBackground.png')",
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          direction: "rtl",
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            padding: isMobile
              ? "0px 16px 24px 16px"
              : isTablet
              ? "0px 36px 24px"
              : "0px 40px 40px 40px",
            backgroundColor: "rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(0px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            position: "relative",
            zIndex: 0,
          }}
        >
          <Toolbar />
          <Box
            sx={{
              borderRadius: "16px",
              padding: isMobile ? "24px" : isTablet ? "32px" : "40px 80px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              maxWidth: "800px",
              margin: "0 auto",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(100px)",
            }}
          >
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
                <input
                  type="file"
                  id="profile-pic-input"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfilePicChange}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                    label="نام و نام خانوادگی"
                    name="fullName"
                    direction="rtl"
                    value={`${formData.firstName} ${formData.lastName}`}
                    onChange={noopChange}
                    readOnly={true}
                  />
                </Box>
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
              </Box>

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
                    label="شماره تماس دانش آموز"
                    name="studentPhoneNumber"
                    direction="ltr"
                    value={formData.studentPhoneNumber}
                    onChange={handleChange}
                    readOnly={!isEditMode}
                  />
                </Box>
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
              </Box>

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
                    label="نام مدرسه"
                    name="schoolName"
                    direction="rtl"
                    value={formData.schoolName}
                    onChange={handleChange}
                    readOnly={!isEditMode}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  {isEditMode ? (
                    <Box>
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
                        استان
                      </Box>
                      <Autocomplete
                        value={formData.province}
                        onChange={(_event, newValue) => {
                          setFormData((prev) => ({
                            ...prev,
                            province: newValue || "",
                          }));
                        }}
                        inputValue={provinceInputValue}
                        onInputChange={(_event, newInputValue) => {
                          setProvinceInputValue(newInputValue);
                        }}
                        options={provinceOptions}
                        loading={loadingProvinces}
                        freeSolo
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            placeholder="جستجوی استان..."
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                                borderRadius: "8px",
                                height: "35px",
                                padding: "8px 40px 8px 14px !important",
                                "& .MuiOutlinedInput-input": {
                                  textAlign: "right",
                                  direction: "rtl",
                                  height: "19px",
                                  "&::placeholder": {
                                    opacity: 0,
                                    transition: "opacity 0.2s ease-in-out",
                                  },
                                },
                                "&:hover .MuiOutlinedInput-input::placeholder":
                                  {
                                    opacity: 0.5,
                                  },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "rgb(204, 207, 209)",
                                  borderWidth: "2px",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderColor: "#1976d2",
                                    borderWidth: "2.3px",
                                  },
                              },
                            }}
                          />
                        )}
                        popupIcon={<ArrowDropDownIcon />}
                        clearIcon={<CloseIcon />}
                        forcePopupIcon={true}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            left: 0,
                            right: "auto",
                            display: "flex",
                            flexDirection: "row",
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "100%",
                            alignItems: "center",
                          },
                          "& .MuiAutocomplete-clearIndicator": {
                            position: "absolute",
                            right: "0px",
                            padding: "2px",
                            paddingLeft: "0px",
                          },
                          "& .MuiAutocomplete-popupIndicator": {
                            position: "absolute",
                            left: "8px",
                            padding: "2px",
                          },
                        }}
                        slotProps={{
                          popper: {
                            sx: {
                              "& .MuiPaper-root": {
                                direction: "rtl",
                                textAlign: "right",
                              },
                              "& .MuiAutocomplete-listbox": {
                                direction: "rtl",
                                textAlign: "right",
                              },
                              "& .MuiAutocomplete-option": {
                                direction: "rtl",
                                textAlign: "right",
                                padding: "8px 16px",
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <InputBox
                      label="استان"
                      name="province"
                      direction="rtl"
                      value={formData.province}
                      onChange={noopChange}
                      readOnly={true}
                    />
                  )}
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: isMobile ? "16px" : "40px",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  {isEditMode ? (
                    <Box>
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
                        رشته تحصیلی
                      </Box>
                      <Autocomplete
                        value={formData.major || ""}
                        onChange={(_event, newValue) => {
                          handleMajorChange(newValue || "");
                        }}
                        options={Object.values(majorMap)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            variant="outlined"
                            placeholder="انتخاب رشته..."
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                backgroundColor: "white",
                                borderRadius: "8px",
                                height: "35px",
                                padding: "8px 40px 8px 14px !important",
                                "& .MuiOutlinedInput-input": {
                                  textAlign: "right",
                                  direction: "rtl",
                                  height: "19px",
                                },
                              },
                            }}
                          />
                        )}
                        popupIcon={<ArrowDropDownIcon />}
                        clearIcon={<CloseIcon />}
                        sx={{
                          "& .MuiAutocomplete-endAdornment": {
                            left: 0,
                            right: "auto",
                            display: "flex",
                            flexDirection: "row",
                            position: "absolute",
                            top: "50%",
                            transform: "translateY(-50%)",
                            height: "100%",
                            alignItems: "center",
                          },
                          "& .MuiAutocomplete-clearIndicator": {
                            position: "absolute",
                            right: "0px",
                            padding: "2px",
                            paddingLeft: "0px",
                          },
                          "& .MuiAutocomplete-popupIndicator": {
                            position: "absolute",
                            left: "8px",
                            padding: "2px",
                          },
                        }}
                        slotProps={{
                          popper: {
                            sx: {
                              "& .MuiPaper-root": {
                                direction: "rtl",
                                textAlign: "right",
                              },
                              "& .MuiAutocomplete-listbox": {
                                direction: "rtl",
                                textAlign: "right",
                              },
                              "& .MuiAutocomplete-option": {
                                direction: "rtl",
                                textAlign: "right",
                                padding: "8px 16px",
                              },
                            },
                          },
                        }}
                      />
                    </Box>
                  ) : (
                    <InputBox
                      label="رشته تحصیلی"
                      name="major"
                      direction="rtl"
                      value={formData.major || ""}
                      onChange={noopChange}
                      readOnly={true}
                    />
                  )}
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
                    readOnly={!isEditMode}
                  />
                </Box>
              </Box>

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
                        borderColor: "#1976d2",
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
                    backgroundColor="#3f51b5"
                    onClick={handleSave}
                    fontSize={isMobile ? "0.9rem" : "1rem"}
                    width={isMobile ? "100%" : "200px"}
                    height={"40px"}
                    borderRadius="20px"
                    disabled={!hasChanges()}
                  />
                  <SecondaryButton
                    name="انصراف"
                    variant="contained"
                    backgroundColor="rgb(229, 111, 111)"
                    onClick={handleCancel}
                    fontSize={isMobile ? "0.9rem" : "1rem"}
                    width={isMobile ? "100%" : "200px"}
                    height={"40px"}
                    borderRadius="20px"
                  />
                </>
              ) : (
                <SecondaryButton
                  name="تغییر اطلاعات"
                  backgroundColor="#3f51b5"
                  fontSize={isMobile ? "0.9rem" : "1rem"}
                  width={isMobile ? "100%" : "200px"}
                  height={"40px"}
                  borderRadius="20px"
                  onClick={handleEdit}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default StudentProfile;