import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import InputBox from "@/components/common/inputbox";
import SecondaryButton from "@/components/common/SecondaryButton";
import { getToken } from "@/services/auth";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 

const CounselorProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [isEditMode, setIsEditMode] = useState(false);
  const [provinceOptions, setProvinceOptions] = useState<string[]>([]);
  const [provinceInputValue, setProvinceInputValue] = useState("");
  const [loadingProvinces, setLoadingProvinces] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [counselorId, setCounselorId] = useState<number | null>(null);
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  const [initialFormData, setInitialFormData] = useState({
    Name: "",
    phone: "",
    email: "",
    university: "",
    major: "",
    entranceExamYear: "",
    countryRank: "",
    province: "",
    workExperience: "",
    description_text: "",
    profileImage: "",
  });

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);

      const token = getToken();
      if (!token) {
        toast.error("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://62.60.213.13/api/Counselor/Profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.isSuccess && data.value) {
          const mappedData = {
            Name: `${data.value.firstName || ""} ${data.value.lastName || ""}`.trim(),
            phone: data.value.phoneNumber || "",
            email: data.value.email || "",
            university: data.value.uniName || "",
            major: data.value.uniMajor || "",
            entranceExamYear: data.value.entranceExamYear || "",
            countryRank: data.value.countryRanking || "",
            province: data.value.province || "",
            workExperience: data.value.employmenthistory || "",
            description_text: data.value.aboutMe || "",
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
                    // Authorization: `Bearer ${token}`,
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
          } else {
            console.warn("No profilePicUrl provided.");
          }

          setFormData({ ...mappedData, profileImage: profilePicUrl });
          setInitialFormData({ ...mappedData, profileImage: profilePicUrl });
          setCounselorId(data.value.id || null);
        } else {
          toast.error(data.message || "Failed to load profile data.");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Error fetching profile data. Please try again."); 
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

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            profileImage: event.target?.result as string,
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = async () => {
    const token = getToken();
    if (!token) {
      toast.error("No authentication token found. Please log in.");
      return;
    }

    if (!counselorId) {
      toast.error("Counselor ID is missing. Cannot update profile."); 
      return;
    }

    try {
      const formDataPayload = new FormData();
      formDataPayload.append("Id", counselorId.toString());
      formDataPayload.append("Province", formData.province || "");
      formDataPayload.append("AboutMe", formData.description_text || "");
      formDataPayload.append("Email", formData.email || "");
      formDataPayload.append("PhoneNumber", formData.phone || "");
      formDataPayload.append("Employmenthistory", formData.workExperience || "");
      if (profilePicFile) {
        formDataPayload.append("ProfilePic", profilePicFile);
      }

      const response = await fetch("http://62.60.213.13/api/Counselor/Update", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataPayload,
      });

      const data = await response.json();

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
                  // Authorization: `Bearer ${token}`,
                },
              }
            );

            if (imageResponse.ok) {
              const blob = await imageResponse.blob();
              profilePicUrl = URL.createObjectURL(blob);
            } else {
              console.error("Failed to fetch updated image:", imageResponse.statusText);
            }
          } catch (imageError) {
            console.error("Error fetching updated profile picture:", imageError);
          }
        }

        const mappedData = {
          Name: formData.Name,
          phone: data.value?.phoneNumber || formData.phone,
          email: data.value?.email || formData.email,
          university: data.value?.uniName || formData.university,
          major: data.value?.uniMajor || formData.major,
          entranceExamYear: data.value?.entranceExamYear || formData.entranceExamYear,
          countryRank: data.value?.countryRanking || formData.countryRank,
          province: data.value?.province || formData.province,
          workExperience: data.value?.employmenthistory || formData.workExperience,
          description_text: data.value?.aboutMe || formData.description_text,
          profileImage: profilePicUrl,
        };

        setFormData(mappedData);
        setInitialFormData(mappedData);
        setProfilePicFile(null);
        setIsEditMode(false);
        toast.success("تغییرات اعمال شد!"); 
      } else {
        toast.error(data.message.split("|")[0] || "Failed to save profile.");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setFormData(initialFormData);
    setProfilePicFile(null);
    setProvinceInputValue("");
    setProvinceOptions([]);
  };

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
      fetchProvinces();
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

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "rgb(255, 255, 255)",
        direction: "rtl",
      }}
    >
      {/* Add ToastContainer to render toasts */}
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
      />

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
                  name="Name"
                  direction="rtl"
                  value={formData.Name}
                  onChange={handleChange}
                  readOnly={true}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="شماره تماس"
                  name="phone"
                  direction="ltr"
                  value={formData.phone}
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
                  label="دانشگاه"
                  name="university"
                  direction="rtl"
                  value={formData.university}
                  onChange={handleChange}
                  readOnly={true}
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
                  label="رشته تحصیلی"
                  name="major"
                  direction="rtl"
                  value={formData.major}
                  onChange={handleChange}
                  readOnly={true}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="سال کنکور"
                  name="entranceExamYear"
                  direction="ltr"
                  value={formData.entranceExamYear}
                  onChange={handleChange}
                  readOnly={true}
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
                  label="رتبه کشوری"
                  name="countryRank"
                  direction="ltr"
                  value={formData.countryRank}
                  onChange={handleChange}
                  readOnly={true}
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
                      onChange={(event, newValue) => {
                        setFormData((prev) => ({
                          ...prev,
                          province: newValue || "",
                        }));
                      }}
                      inputValue={provinceInputValue}
                      onInputChange={(event, newInputValue) => {
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
                              "&:hover .MuiOutlinedInput-input::placeholder": {
                                opacity: 0.5,
                              },
                              "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "rgb(204, 207, 209)",
                                borderWidth: "2px",
                              },
                              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
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
                    onChange={handleChange}
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
                <InputBox
                  label="سابقه کار"
                  name="workExperience"
                  direction="rtl"
                  value={formData.workExperience}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
            </Box>

            {/* Motivational Text Box */}
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
                متن معرفی
              </Box>
              <TextField
                name="description_text"
                value={formData.description_text || ""}
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

export default CounselorProfile;