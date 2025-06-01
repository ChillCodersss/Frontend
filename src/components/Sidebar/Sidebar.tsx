import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  AttachMoney as AttachMoneyIcon 
} from "@mui/icons-material";
import { getUserInfo, removeToken } from "@/services/auth";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface SidebarProps {
  children: React.ReactNode;
}

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("");
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Define sidebar items for each role
  const counselorSidebarItems: SidebarItem[] = [
    { label: "دانش آموزان من", icon: <PeopleIcon />, path: "/dashboard/students" },
    { label: "درخواست های من", icon: <EmailIcon  />, path: "/dashboard/counselorrequests" },
    { label: "چت های من ", icon: <MessageIcon />, path: "/dashboard/chat-student" },
    { label: "پرداختی ها", icon: <AttachMoneyIcon />, path: "/dashboard/incoms" },
  ];

  const studentSidebarItems: SidebarItem[] = [
    { label: "مشاوران من", icon: <PersonIcon />, path: "/dashboard/studentscounselors" },
    { label: "چت با مشاور", icon: <MessageIcon />, path: "/dashboard/chat-counselor" },
    { label: "پرداختی ها", icon: <AttachMoneyIcon />, path: "/dashboard/payments " },
  ];

  // Fetch user role on mount
  useEffect(() => {
    const info = getUserInfo();
    if (info) {
      setRole(info.role);
      setActiveItem(window.location.pathname);
    }
  }, []);

  const sidebarItems = role === "Counselor" ? counselorSidebarItems : role === "Student" ? studentSidebarItems : [];

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (item: SidebarItem) => {
    setActiveItem(item.path);
    navigate(item.path);
    if (isMobile && open) {
      setOpen(false);
    }
  };

  const headerHeight = isMobile ? "58px" : "64px";
  const sidebarWidth = open ? 204 : 68;

  return (
    <Box sx={{ display: "flex", direction: "rtl" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        anchor="right"
        open={isMobile ? open : true}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? (open ? "75%" : 0) : sidebarWidth,
            backgroundColor: "rgb(111, 189, 234)",
            color: "rgb(165, 179, 217)",
            padding: "0.5rem 0",
            boxSizing: "border-box",
            transition: "width 0.3s ease-in-out",
            top: headerHeight,
            height: `calc(100vh - ${headerHeight})`,
            overflowX: "hidden",
          },
        }}
      >
        {/* Toggle Button Inside Drawer */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            padding: "0.5rem 1rem",
            backgroundColor: "rgb(111, 189, 234)",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              color: "#057abe",
              backgroundColor: "rgb(111, 189, 234)",
              "&:hover": { backgroundColor: "#e0e0e0" },
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0.5rem 1rem",
            marginBottom: "0.2rem",
            justifyContent: "center",
            minHeight: "24px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "rgb(8, 3, 31)",
              visibility: open ? "visible" : "hidden",
              whiteSpace: "nowrap",
              fontWeight: "700",
            }}
          >
            پنل کاربری
          </Typography>
        </Box>

        {/* Sidebar Items */}
        <List>
          {sidebarItems.map((item) => (
            <ListItem
              key={item.label}
              onClick={() => handleItemClick(item)}
              sx={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                marginBottom: "1.5rem",
                color:
                  activeItem === item.path
                    ? "rgb(126, 124, 134)"
                    : "rgb(4, 32, 80)",
                "&:hover": { color: " #F7F6FB" },
                position: "relative",
                height: "40px",
                ...(activeItem === item.path && {
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    right: 0,
                    width: "4px",
                    height: "32px",
                    backgroundColor: "rgb(129, 121, 121)",
                  },
                }),
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "4.3rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                  visibility: open ? "visible" : "hidden",
                }}
              >
                <ListItemText primary={item.label} />
              </Box>
              <ListItemIcon
                sx={{
                  color: "inherit",
                  minWidth: "40px",
                  position: "absolute",
                  right: "1.5rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {item.icon}
              </ListItemIcon>
            </ListItem>
          ))}
        </List>

        <Box sx={{ flexGrow: 1 }} />

        <List>
          <ListItem
            sx={{
              padding: "0.5rem 1rem",
              color: "rgb(4, 32, 80)",
              "&:hover": { color: "#F7F6FB" },
              position: "relative",
              height: "40px",
            }}
            onClick={() => {
              removeToken();
              if (isMobile && open) {
                setOpen(false);
              }
              navigate("/");
            }}
          >
            <Box
              sx={{
                position: "absolute",
                right: "4.3rem",
                top: "50%",
                transform: "translateY(-50%)",
                whiteSpace: "nowrap",
                visibility: open ? "visible" : "hidden",
              }}
            >
              <ListItemText
                primary="خروج"
                sx={{ textAlign: "right", cursor: "pointer" }}
              />
            </Box>
            <ListItemIcon
              sx={{
                color: "inherit",
                minWidth: "40px",
                position: "absolute",
                right: "1.5rem",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: "1rem",
          backgroundColor: "rgb(255, 255, 255)",
          marginRight: isMobile ? 0 : `${sidebarWidth}px`,
          transition: "margin-right 0.3s ease-in-out",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Mobile Toggle Button */}
        {isMobile && !open && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "fixed",
              top: "4rem",
              right: "0.75rem",
              color: "#057abe",
              backgroundColor: "rgba(183, 178, 178, 0.45)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0)" },
              zIndex: 1300,
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;