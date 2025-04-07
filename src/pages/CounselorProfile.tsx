import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  Typography,
  Autocomplete,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CloseIcon from "@mui/icons-material/Close";
import InputBox from "@/components/common/inputbox";
import SecondaryButton from "@/components/common/SecondaryButton";
import EditIcon from "@mui/icons-material/Edit";

const CounselorProfile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [provinceOptions, setProvinceOptions] = React.useState<string[]>([]);
  const [provinceInputValue, setProvinceInputValue] = React.useState("");
  const [loadingProvinces, setLoadingProvinces] = React.useState(false);

  const [formData, setFormData] = React.useState({
    Name: "",
    phone: "",
    email: "",
    university: "",
    major: "",
    universityYear: "",
    countryRank: "",
    province: "",
    workExperience: "",
    description_text: "",
    profileImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Fetch provinces when input changes
  useEffect(() => {
    const fetchProvinces = async () => {
      if (provinceInputValue.length > 0) {
        setLoadingProvinces(true);
        try {
          const response = await fetch(
            `http://localhost:8080/api/Provinces/Dropdown?input=${encodeURIComponent(
              provinceInputValue
            )}`
          );
          const data = await response.json();
          if (data.isSuccess) {
            setProvinceOptions(data.value);
          }
        } catch (error) {
          console.error("Error fetching provinces:", error);
        } finally {
          setLoadingProvinces(false);
        }
      } else {
        setProvinceOptions([]);
      }
    };

    const debounceTimer = setTimeout(() => {
      fetchProvinces();
    }, 300); // Debounce to avoid too many API calls

    return () => clearTimeout(debounceTimer);
  }, [provinceInputValue]);

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
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            sx={{ marginRight: "16px" }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={toggleSidebar}
        sx={{
          width: isMobile ? "80vw" : "240px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isMobile ? "80vw" : "240px",
            boxSizing: "border-box",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            borderLeft: "1px solid rgba(255, 255, 255, 0.3)",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Dashboard", "Appointments", "Clients", "Messages"].map(
              (text) => (
                <ListItem
                  key={text}
                  component="div"
                  sx={{
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
          </List>
          <Divider />
          <List>
            {["Settings", "Logout"].map((text) => (
              <ListItem
                key={text}
                component="div"
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

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
                  cursor: isEditMode ? "poiner" : "default",
                  transition: "filter 0.3s ease",
                  "&:hover": {
                    filter: isEditMode ? "blur(20px) brightness(0.5)" : "none",
                  },
                }}
                src={formData.profileImage}
                onClick={() =>
                  isEditMode &&
                  document.getElementById("profile-image-input")?.click()
                }
              >
                {!formData.profileImage && (
                  <AccountCircleIcon fontSize="large" />
                )}
              </Avatar>
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
                  document.getElementById("profile-image-input")?.click()
                }
              />
              {isEditMode && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    borderRadius: "50%",
                  }}
                ></Box>
              )}
            </Box>
            <input
              type="file"
              id="profile-image-input"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </Box>

          {/* Fields Container - Tighter spacing */}
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
                  label="رشته تحصیلی"
                  name="major"
                  direction="rtl"
                  value={formData.major}
                  onChange={handleChange}
                  readOnly={!isEditMode}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="سال ورود به دانشگاه"
                  name="universityYear"
                  direction="ltr"
                  value={formData.universityYear}
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
                  label="رتبه کشوری"
                  name="countryRank"
                  direction="ltr"
                  value={formData.countryRank}
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
                              borderRadius: "0px",
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
                    borderRadius: "0px",
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
                />
                <SecondaryButton
                  name="انصراف"
                  variant="contained"
                  backgroundColor="rgb(229, 111, 111)"
                  onClick={handleCancel}
                  fontSize={isMobile ? "0.9rem" : "1rem"}
                  width={isMobile ? "100%" : "200px"}
                  height={"40px"}
                />
              </>
            ) : (
              <SecondaryButton
                name="تغییر اطلاعات"
                backgroundColor="rgb(0, 140, 190)"
                fontSize={isMobile ? "0.9rem" : "1rem"}
                width={isMobile ? "100%" : "200px"}
                height={"40px"}
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
