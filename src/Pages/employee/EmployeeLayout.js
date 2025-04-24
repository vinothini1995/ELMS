import React, { useState,useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { 
  AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemIcon, 
  ListItemText, Box, Avatar, Divider,Collapse
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { EmployeeContext } from "./EmployeeContext";
import { useContext } from "react";

const drawerWidth = 250;

const menuItems = [
  { text: "My Profile", icon: <AccountCircleIcon />, path: "/EmployeeProfile" },
  { text: "Change Password", icon: <LockIcon />, path: "/EmpChangePassword" },
  { text: "Leaves", icon: <EventNoteIcon />,subMenu:[
    {text:"Apply Leave",path:"/EmpApplyLeave"},
    {text:"Leave History",path:"/EmpLeaveHistory"}
  ]},
  { text: "Logout", icon: <LogoutIcon />, path: "/" }
];
 
const EmployeeLayout = () => {
  const { profile } = useContext(EmployeeContext);

      
  const navigate = useNavigate();
  const [openSubMenus, setOpenSubMenus] = useState({});
  const handleToggle = (text) => {
    setOpenSubMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer variant="permanent" sx={{ width: drawerWidth, flexShrink: 0 }}>
        <Box sx={{ width: drawerWidth, bgcolor: "#3f51b5", color: "white", height: "100%" }}>
          {/* Employee Profile Section */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", py: 3 }}>
            <Avatar sx={{ width: 80, height: 80, mb: 1 }} src="/employee.jpg" />
            <Typography variant="h6">{profile.emp_code}</Typography>
            <Typography variant="h6">{profile.name}</Typography>

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
              Employee Dashboard
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

export default EmployeeLayout;
