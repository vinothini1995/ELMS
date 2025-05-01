import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Container,
} from '@mui/material';
import Layout from '../admin/Layout';


const getStatusChip = (status) => {
  switch (status) {
    case 'Pending':
      return <Chip label="Pending" color="warning" />;
    case 'Approved':
      return <Chip label="Approved" color="success" />;
    case 'Not Approved':
      return <Chip label="Not Approved" color="error" />;
    default:
      return <Chip label={status || "Waiting For Approval"} />;
  }
};


const PendingLeaves = () => {
  const navigate = useNavigate();
    const[leave,setLeave]=useState([])
    
    
  const handleViewDetails = (id) => {
    // You can pass ID or full data via state
    navigate(`/PendingLeaveDetails/${id}`);
  };
  useEffect(() => {
    const fetchEmployeeLeave = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employeeleave/leave"); 
 // Filter only pending leaves
 const pendingLeaves = response.data.filter(leave => leave.status === 'Pending');
 setLeave(pendingLeaves);
      } catch (err) {
        console.error("Error fetching employeeleavehistory", err);
      }
    };

    fetchEmployeeLeave();
  }, []);
  return (
    <>
      <Layout />
      <Container maxWidth="xl">
        <Box   sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
          ml: { sm: "250px" }, // Sidebar space only on larger screens
        }}>
          <Typography variant="h5"  sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#3f51b5",
            textAlign: { xs: "center", sm: "left" },
          }}>
            Pending Leave Requests
          </Typography>

          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell><strong>S.No</strong></TableCell>
                  <TableCell><strong>Employee Name</strong></TableCell>
                  <TableCell><strong>Leave Type</strong></TableCell>
                  <TableCell><strong>Pending Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
  {leave.length === 0 ? (
    <TableRow>
      <TableCell colSpan={6} align="center">
        No pending leave requests
      </TableCell>
    </TableRow>
  ) : (
    leave.map((leave, index) => (
      <TableRow key={leave.id}>
        <TableCell>{index + 1}</TableCell>
        <TableCell>{leave.name}</TableCell>
        <TableCell>{leave.leaveType}</TableCell>
        <TableCell>{new Date(leave.postingDate).toLocaleDateString('en-GB')}</TableCell>
        <TableCell>{getStatusChip(leave.status)}</TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleViewDetails(leave.id)}
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>
    ))
  )}
</TableBody>

            </Table>
          </TableContainer>
          </Box>

      </Container>
    </>
  );
};

export default PendingLeaves;
