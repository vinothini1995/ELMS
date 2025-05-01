import React, { useState, useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Drawer, IconButton, List,
  ListItem, ListItemIcon, ListItemText, Box, Avatar, Divider,
  Collapse, useTheme, useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { EmployeeContext } from "./EmployeeContext";

const drawerWidth = 250;

const menuItems = [
  { text: "My Profile", icon: <AccountCircleIcon />, path: "/EmployeeProfile" },
  { text: "Change Password", icon: <LockIcon />, path: "/EmpChangePassword" },
  {
    text: "Leaves", icon: <EventNoteIcon />, subMenu: [
      { text: "Apply Leave", path: "/EmpApplyLeave" },
      { text: "Leave History", path: "/EmpLeaveHistory" }
    ]
  },
  { text: "Logout", icon: <LogoutIcon />, path: "/" }
];

const EmployeeLayout = () => {
  const { profile } = useContext(EmployeeContext);
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleToggleSubMenu = (text) => {
    setOpenSubMenus(prev => ({ ...prev, [text]: !prev[text] }));
  };

  const drawer = (
    <Box sx={{ width: drawerWidth, bgcolor: "#3f51b5", color: "white", height: "100%" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mb: 1 }} src="/employee.jpg" />
        <Typography variant="h6">{profile.emp_code}</Typography>
        <Typography variant="h6">{profile.name}</Typography>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.5)" }} />
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem
              button
              onClick={item.subMenu ? () => handleToggleSubMenu(item.text) : () => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subMenu && (openSubMenus[item.text] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.subMenu && (
              <Collapse in={openSubMenus[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem) => (
                    <ListItem
                      button
                      key={subItem.text}
                      sx={{ pl: 4 }}
                      onClick={() => {
                        navigate(subItem.path);
                        if (isMobile) setMobileOpen(false);
                      }}
                    >
                      <ListItemText primary={subItem.text} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {/* AppBar */}
      <AppBar position="fixed" sx={{
        bgcolor: "#3f51b5",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: "bold" }}>
            Employee Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile and desktop */}
      <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box"
            }
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default EmployeeLayout;
