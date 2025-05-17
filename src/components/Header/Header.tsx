import * as React from "react";
import { useNavigate } from "react-router";
import {
  Link,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Tooltip,
  Button,
} from "@mui/material";
import { getToken, getUserInfo, removeToken } from "@/services/auth";
// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
// Styles
import { headerNavLink, loginButton } from "./HeaderStyles";
// Logo
import logo from "@/assets/logo.png";

interface HeaderProps {
  isWhiteMode?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isWhiteMode = false }) => {
  const navigate = useNavigate();
  const [profilePicUrl, setProfilePicUrl] = React.useState<string>("");
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const pages = [
    { label: "درباره ما", path: "/about-us" },
    { label: "استخدام", path: "/Recruitment" },
    { label: "خدمات", path: "/#" },
    { label: "مشاوران ما", path: "/OurCounselor" },
  ];

  const settings = [
    {
      label: "داشبورد",
      icon: <DashboardIcon />,
      clickFunction: () => {
        navigate("/dashboard");
      },
    },
    {
      label: "پروفایل",
      icon: <AccountCircleIcon />,
      clickFunction: () => {
        const info = getUserInfo();
        if (!info) return;
        if (info.role === "Counselor") {
          navigate("/CounselorProfile");
        } else if (info.role === "Student") {
          navigate("/StudentProfile");
        }
      },
    },
    {
      label: "تغییر رمز عبور",
      icon: <LockIcon />,
      clickFunction: () => {
        navigate("/change-password");
      },
    },
    {
      label: "خروج",
      icon: <ExitToAppIcon />,
      clickFunction: () => {
        removeToken();
        navigate("/Landing");
        window.location.reload();
      },
    },
  ];

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isMenuOpen = Boolean(anchorElNav);

  React.useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();
      if (!token) return;

      const info = getUserInfo();
      if (!info) return;

      setIsLoggedIn(true);

      try {
        const response = await fetch(
          info.role === "Counselor"
            ? "http://62.60.213.13/api/Counselor/Profile"
            : "http://62.60.213.13/api/Student/Profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.isSuccess && data.value.profilePicUrl) {
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
              const url = URL.createObjectURL(blob);
              setProfilePicUrl(url);
            } else {
              console.error("Failed to fetch image:", imageResponse.statusText);
            }
          } catch (imageError) {
            console.error("Error fetching profile picture:", imageError);
          }
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUser();

    return () => {
      if (profilePicUrl) {
        URL.revokeObjectURL(profilePicUrl);
      }
    };
  }, []);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: isWhiteMode ? "#ffffff" : "#057abe",
        color: isWhiteMode ? "#057abe" : "#ffffff",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="باز کردن تنظیمات">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, width: 40, height: 40 }}
                >
                  <Avatar
                    alt="profile picture"
                    src={profilePicUrl}
                    sx={{ width: "45px", height: "45px" }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "40px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.label}
                    onClick={() => {
                      handleCloseUserMenu();
                      setting.clickFunction();
                    }}
                    sx={{ justifyContent: "space-between" }}
                  >
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting.label}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button
              sx={{
                ...loginButton,
                color: isWhiteMode ? "#057abe" : "#ffffff",
                borderColor: isWhiteMode ? "#057abe" : "#ffffff",
                "&:hover": {
                  color: isWhiteMode ? "#ffffff" : "#057abe",
                  backgroundColor: isWhiteMode ? "#057abe" : "#ffffff",
                },
              }}
              onClick={() => {
                navigate("/login");
              }}
            >
              ورود
            </Button>
          )}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-end" },
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.label}
                sx={{
                  ...headerNavLink,
                  color: isWhiteMode ? "#057abe" : "#ffffff",
                  "&::before": {
                    ...headerNavLink["&::before"],
                    backgroundColor: isWhiteMode ? "#057abe" : "#ffffff",
                    transform:
                      window.location.pathname === page.path
                        ? "scaleX(1)"
                        : "scaleX(0)",
                  },
                }}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.path);
                }}
              >
                {page.label}
              </Link>
            ))}
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              ml: 2,
              display: {
                xs: "flex",
                md: "none",
                justifyContent: "flex-end",
                alignItems: "center",
              },
              flexGrow: 1,
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            مشاوریوم
          </Typography>
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              ml: 1,
              justifyContent: "flex-end",
            }}
          >
            <img
              src={logo}
              alt="Logo"

              style={{
                width: "58px",
                height: "58px",
              }}
            />
          </Box>
          {/* Mobile Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", justifyContent: "flex-end" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={isMenuOpen ? handleCloseNavMenu : handleOpenNavMenu}
              color="inherit"
              sx={{
                transition: "transform 0.3s ease-in-out",
                transform: isMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              {isMenuOpen ? <CloseIcon /> : <MoreVertIcon />}
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => {
                    handleCloseNavMenu();
                    navigate(page.path);
                  }}
                  sx={{ justifyContent: "center" }}
                >
                  <Typography sx={{ textAlign: "center" }}>
                    {page.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/Landing"
            sx={{
              ml: 2,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              },
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            مشاوریوم
          </Typography>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              ml: 1,
              justifyContent: "flex-end",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "58px",
                height: "58px",
              }}
            />
          </Box>
        </Toolbar>
        </Container>
      </AppBar>
  );
};

export default Header;