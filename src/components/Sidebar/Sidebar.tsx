import React, { useState } from "react";
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
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Message as MessageIcon,
  Folder as FolderIcon,
  BarChart as BarChartIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { removeToken } from "@/services/auth";

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  children: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: "داشبورد", icon: <DashboardIcon /> },
  { label: "کاربران", icon: <PeopleIcon /> },
  { label: "چت با مشاور", icon: <MessageIcon /> },
  { label: "فایل‌ها", icon: <FolderIcon /> },
  { label: "آمار", icon: <BarChartIcon /> },
];

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("کاربران");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (label: string) => {
    setActiveItem(label);
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
            top: headerHeight, // Start below the Header
            height: `calc(100vh - ${headerHeight})`, // Span remaining height
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
              onClick={() => handleItemClick(item.label)}
              sx={{
                padding: "0.5rem 1rem",
                cursor: "pointer",
                marginBottom: "1.5rem",
                color:
                  activeItem === item.label
                    ? "rgb(126, 124, 134)"
                    : "rgb(4, 32, 80)",
                "&:hover": { color: " #F7F6FB" },
                position: "relative",
                height: "40px",
                ...(activeItem === item.label && {
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
              navigate("/Landing");
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
        {isMobile && (
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#057abe",
              backgroundColor: "rgb(111, 189, 234)",
              "&:hover": { backgroundColor: " #e0e0e0" },
              zIndex: 1200, // Ensure it appears above other content
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