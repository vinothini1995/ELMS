import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, Box, Collapse, Avatar, Divider 
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
      {text:"Approved Leaves",path:"/ApprovedLeaves"},
      {text:"Not Approved Leaves",path:"/NotApproved"}
    ]
  },
  { text: "Change Password", icon: <LockIcon />, path: "/ChangePassword" },
  { text: "Logout", icon: <LogoutIcon />, path: "/" }
];

const Layout = () => {
  const navigate = useNavigate();
  const [openSubMenus, setOpenSubMenus] = useState({});

  const handleToggle = (text) => {
    setOpenSubMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Box sx={{ width: drawerWidth, bgcolor: "#3f51b5", color: "white", height: "100vh" ,overflowY:"auto"}}>
          {/* Admin Profile Section */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mb: 1 }} src="/admin.jpg" />
            <Typography variant="h6">Admin ID: 001</Typography>
          </Box>
          <Divider sx={{ bgcolor: "rgba(255,255,255,0.5)" }} />

          {/* Sidebar Menu */}
          <List>
            {menuItems.map((item) => (
              <React.Fragment key={item.text}>
                <ListItem 
                  button 
                  onClick={item.subMenu ? () => handleToggle(item.text) : () => navigate(item.path)}
                >
                  <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {item.subMenu && (openSubMenus[item.text] ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>

                {/* Submenu Items */}
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
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Navbar */}
        <AppBar position="fixed" sx={{ bgcolor: "#3f51b5", width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
              Employee Leave Management System
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Page Content */}
        <Box sx={{ mt: 10 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
