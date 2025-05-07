import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Paper,
  Typography
} from '@mui/material';

import PeopleIcon from '@mui/icons-material/People';
import ApartmentIcon from '@mui/icons-material/Apartment';
import EventNoteIcon from '@mui/icons-material/EventNote';
import Layout from "./Layout";
import DashboardLeave from "./DashboardLeave";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalDepartments: 0,
    totalLeaveTypes: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/states/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };
    fetchStats();
  }, []);

  const statData = [
    { title: "Total Employees", value: stats.totalEmployees, icon: <PeopleIcon fontSize="large" />, color: "#3f51b5" },
    { title: "Total Departments", value: stats.totalDepartments, icon: <ApartmentIcon fontSize="large" />, color: "#f57c00" },
    { title: "Total Leave Types", value: stats.totalLeaveTypes, icon: <EventNoteIcon fontSize="large" />, color: "#388e3c" },
  ];

  return (
    <>
      <Layout />
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          ml: { xs: 0, md: "250px" }
        }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: { xs: 2, sm: 3 } }}
        >
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {statData.map((stat, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 3,
                  bgcolor: stat.color,
                  color: "#fff",
                  borderRadius: "10px",
                  boxShadow: 3,
                  height: "100%",
                }}
              >
                <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography>{stat.title}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      <DashboardLeave />
    </>
  );
};

export default AdminDashboard;
