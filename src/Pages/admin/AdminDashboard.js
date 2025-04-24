import React from "react";
import { Box, Grid, Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Layout from "./Layout";

// Dummy Data for Dashboard Stats
const stats = [
  { title: "Total Employees", value: 150, icon: <PeopleIcon fontSize="large" />, color: "#3f51b5" },
  { title: "Total Departments", value: 10, icon: <ApartmentIcon fontSize="large" />, color: "#f57c00" },
  { title: "Total Leave Types", value: 5, icon: <EventNoteIcon fontSize="large" />, color: "#388e3c" },
];

// Dummy Data for Latest Leave Applications
const latestLeaves = [
  { id: 1, name: "John Doe", type: "Sick Leave", date: "2024-03-25", status: "Pending" },
  { id: 2, name: "Alice Smith", type: "Casual Leave", date: "2024-03-22", status: "Approved" },
  { id: 3, name: "Michael Lee", type: "Annual Leave", date: "2024-03-20", status: "Rejected" },
];

const AdminDashboard = () => {
  return (
    <>
    <Layout />
      <Box sx={{ flexGrow: 1, p: 3, ml: "250px",  }}>
        {/* Dashboard Heading */}
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Dashboard
        </Typography>

        {/* Dashboard Stats Cards */}
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
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
                }}
              >
                <Box sx={{ mr: 2 }}>{stat.icon}</Box>
                <Box>
                  <Typography variant="h6" fontWeight="bold">{stat.value}</Typography>
                  <Typography>{stat.title}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Latest Leave Applications */}
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 5, mb: 2 }}>
          Latest Leave Applications
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>S.No</TableCell>
                <TableCell>Employee Name</TableCell>
                <TableCell>Leave Type</TableCell>
                <TableCell>Posting Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {latestLeaves.map((leave, index) => (
                <TableRow key={leave.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.type}</TableCell>
                  <TableCell>{leave.date}</TableCell>
                  <TableCell>
                    <Typography sx={{ fontWeight: "bold", color: leave.status === "Approved" ? "green" : leave.status === "Rejected" ? "red" : "orange" }}>
                      {leave.status}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" size="small" startIcon={<VisibilityIcon />}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdminDashboard;
