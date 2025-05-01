import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon,
  ListItemText, Box, Collapse, Avatar, Divider, IconButton, useTheme, useMediaQuery
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import MenuIcon from "@mui/icons-material/Menu";

const drawerWidth = 250;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/AdminDashboard" },
  {
    text: "Department", icon: <ApartmentIcon />, subMenu: [
      { text: "Add Department", path: "/AddDepartment" },
      { text: "Manage Department", path: "/ManageDepartment" }
    ]
  },
  {
    text: "Leave Type", icon: <AppRegistrationIcon />, subMenu: [
      { text: "Add Leave Type", path: "/AddLeaveType" },
      { text: "Manage Leave Type", path: "/ManageLeaveType" }
    ]
  },
  {
    text: "Employees", icon: <PeopleIcon />, subMenu: [
      { text: "Add Employee", path: "/AddEmployees" },
      { text: "Manage Employees", path: "/ManageEmployees" }
    ]
  },
  {
    text: "Leave Management", icon: <EventNoteIcon />, subMenu: [
      { text: "ALL Leaves", path: "/AllLeaves" },
      { text: "Pending Leaves", path: "/PendingLeaves" },
      { text: "Approved Leaves", path: "/ApprovedLeaves" },
      { text: "Not Approved Leaves", path: "/NotApproved" }
    ]
  },
  { text: "Change Password", icon: <LockIcon />, path: "/ChangePassword" },
  { text: "Logout", icon: <LogoutIcon />, path: "/" }
];

const Layout = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [openSubMenus, setOpenSubMenus] = useState({});
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggle = (text) => {
    setOpenSubMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const drawerContent = (
    <Box sx={{ width: drawerWidth, bgcolor: "#3f51b5", color: "white", height: "100vh", overflowY: "auto" }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3 }}>
        <Avatar sx={{ width: 80, height: 80, mb: 1 }} src="/admin.jpg" />
        <Typography variant="h6">Admin</Typography>
      </Box>
      <Divider sx={{ bgcolor: "rgba(255,255,255,0.5)" }} />
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem button onClick={item.subMenu ? () => handleToggle(item.text) : () => navigate(item.path)}>
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
              {item.subMenu && (openSubMenus[item.text] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            {item.subMenu && (
              <Collapse in={openSubMenus[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subMenu.map((subItem) => (
                    <ListItem button key={subItem.text} sx={{ pl: 4 }} onClick={() => navigate(subItem.path)}>
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
      {/* Mobile Drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': { width: drawerWidth, bgcolor: "#3f51b5", color: "white" }
          }}
        >
          {drawerContent}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box', bgcolor: "#3f51b5", color: "white" }
          }}
        >
          {drawerContent}
        </Drawer>
      )}

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#3f51b5",
          width: { xs: "100%", md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(!mobileOpen)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Employee Leave Management System
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ mt: 10 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
