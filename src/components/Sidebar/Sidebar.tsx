import React, { useState } from "react";
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

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
}

const sidebarItems: SidebarItem[] = [
  { label: "داشبورد", icon: <DashboardIcon /> },
  { label: "کاربران", icon: <PeopleIcon /> },
  { label: "چت با مشاور", icon: <MessageIcon /> },
  { label: "فایل‌ها", icon: <FolderIcon /> },
  { label: "آمار", icon: <BarChartIcon /> },
];

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("داشبورد");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); 

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleItemClick = (label: string) => {
    setActiveItem(label);
  };

  const headerHeight = isMobile ? "56px" : "68.5px";

  return (
    <>
      {/* Global Wrapper to Control Scroll */}
      <Box
        sx={{
          height: "100vh",
          overflow: "hidden",
          margin: 0,
          padding: 0,
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 1rem",
            height: headerHeight, 
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "#F7F6FB",
            zIndex: 1200,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        ></Box>

        {/* Sidebar Drawer */}
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          anchor="right"
          open={isMobile ? open : true}
          onClose={isMobile ? handleDrawerToggle : undefined}
          sx={{
            width: isMobile ? (open ? "75%" : 68) : 68,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isMobile ? (open ? "75%" : 68) : open ? 224 : 68,
              backgroundColor: "#057abe",
              color: "rgb(165, 179, 217)",
              padding: "0.5rem 0",
              boxSizing: "border-box",
              transition: "width 0.3s ease-in-out",
              overflow: "hidden",
              top: headerHeight,
              height: `calc(100vh - ${headerHeight})`, 
              zIndex: 1100,
            },
          }}
        >
          {/* Close Button for Mobile */}
          {isMobile && open && (
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                position: "absolute",
                top: "1rem",
                left: "1rem",
                color: "#F7F6FB",
                backgroundColor: "transparent",
                zIndex: 1200,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          )}

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
                color: "#F7F6FB",
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
                onClick={() => {
                  handleItemClick(item.label);
                  if (isMobile && open) {
                    setOpen(false);
                  }
                }}
                sx={{
                  padding: "0.5rem 1rem",
                  cursor: "pointer",
                  marginBottom: "1.5rem",
                  color:
                    activeItem === item.label
                      ? "#F7F6FB"
                      : "rgb(161, 191, 241)",
                  "&:hover": { color: "#F7F6FB" },
                  position: "relative",
                  height: "40px",
                  ...(activeItem === item.label && {
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      right: 0,
                      width: "4px",
                      height: "32px",
                      backgroundColor: "rgb(212, 212, 212)",
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
                    zIndex: 1100,
                  }}
                >
                  <ListItemText primary={item.label} />
                </Box>
                <ListItemIcon
                  sx={{
                    color: "inherit",
                    minWidth: "40px",
                    position: "absolute",
                    right: "0.6rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 1100,
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
                color: "rgb(161, 191, 241)",
                "&:hover": { color: "#F7F6FB" },
                position: "relative",
                height: "40px",
              }}
              onClick={() => {
                if (isMobile && open) {
                  setOpen(false);
                }
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  right: "4.3rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  whiteSpace: "nowrap",
                  zIndex: 1100,
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
                  right: "0.6rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 1100,
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
            marginRight: isMobile ? 0 : open ? "224px" : "68px",
            marginLeft: 0,
            marginTop: headerHeight, 
            padding: "1rem",
            backgroundColor: "#F7F6FB",
            height: `calc(100vh - ${headerHeight})`, 
            overflow: "hidden", 
            transition: isMobile ? "none" : "margin-right 0.3s ease-in-out",
            position: "relative",
            zIndex: 1000,
            boxSizing: "border-box",
          }}
        >
          <IconButton
            onClick={handleDrawerToggle}
            sx={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              color: "#057abe",
              backgroundColor: "#F7F6FB",
              zIndex: 1300,
              "&:hover": {
                backgroundColor: "#F7F6FB",
                boxShadow: "none",
              },
              "&:focus, &:active": {
                backgroundColor: "#F7F6FB",
                boxShadow: "none",
                outline: "none",
              },
              "& .MuiTouchRipple-root": {
                display: "none",
              },
            }}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;