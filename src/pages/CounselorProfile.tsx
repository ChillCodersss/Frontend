import React from "react";
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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ConfirmButton from "@/components/common/ConfirmButton";
import InputBox from "@/components/common/inputbox";

const CounselorProfile = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "rgb(236, 246, 248)",
        direction: "rtl",
      }}
    >
      {/* Header */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
          width: "240px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "240px",
            boxSizing: "border-box",
            backgroundColor: "rgba(255, 255, 255, 0.7)",
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
          padding: "48px",
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
            padding: "40px 80px 40px 80px",
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
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "18px",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <h1>پروفایل من</h1>
            <Avatar sx={{ width: "100px", height: "100px" }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
          </Box>

          {/* Fields Container - Tighter spacing */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "40px",
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
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="شماره تماس"
                  name="phone"
                  direction="ltr"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "40px",
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
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="دانشگاه"
                  name="university"
                  direction="rtl"
                  value={formData.university}
                  onChange={handleChange}
                />
              </Box>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "40px",
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
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="سال ورود به دانشگاه"
                  name="universityYear"
                  direction="ltr"
                  value={formData.universityYear}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "40px",
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
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <InputBox
                  label="استان"
                  name="province"
                  direction="rtl"
                  value={formData.province}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: "40px",
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
                  paddingLeft: "4px",
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
                rows={6}
                fullWidth
                variant="outlined"
                margin="none"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "white",
                    boxShadow: {
                      xs: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                      sm: "0px 2px 4px rgba(0, 0, 0, 0.25)",
                    },
                    transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.5)",
                      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(0, 0, 0, 0.23)",
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.25)",
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
              justifyContent: "flex-start",
              marginTop: "32px",
            }}
          >
            <ConfirmButton
              name="تغییر اطلاعات"
              variant="contained"
              color="primary"
              onClick={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CounselorProfile;
