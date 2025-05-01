import React, { useState, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';



const NotApproved = () => {
  const navigate=useNavigate();
  const handleViewDetails = (id) => {
    // You can pass ID or full data via state
    navigate(`/NotApprovedDetails/${id}`);
  };
  const getStatusChip = (status) => {
    if (status === 'Not Approved') return <Chip label="Not Approved" color="error" />;
    return <Chip label={status} />;
  };
  const [notApprovedLeaves, setNotApprovedLeaves] = useState([]);

  useEffect(() => {
    const fetchNotApprovedLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employeeleave/leave");
        const notApproved = response.data.filter((leave) => leave.status === 'Not Approved');
        setNotApprovedLeaves(notApproved);
      } catch (error) {
        console.error("Error fetching not approved leaves", error);
      }
    };

    fetchNotApprovedLeaves();
  }, []);

  return (
    <>
      <Layout />
      <Container maxWidth="xl">
        <Box sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
          ml: { sm: "250px" }, // Sidebar space only on larger screens
        }}>
          <Typography variant="h5" sx={{
                      mb: 2,
                      fontWeight: "bold",
                      color: "#3f51b5",
                      textAlign: { xs: "center", sm: "left" },
                    }}>
            Not Approved Leave Requests
          </Typography>

          <TableContainer component={Paper}>
            <Table >
              <TableHead>
                <TableRow>
                  <TableCell><strong>S.No</strong></TableCell>
                  <TableCell><strong>Employee Name</strong></TableCell>
                  <TableCell><strong>Leave Type</strong></TableCell>
                  <TableCell><strong>Leave Dates</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notApprovedLeaves.map((leave, index) => (
                  <TableRow key={leave.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{leave.name}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{`${new Date(leave.fromDate).toLocaleDateString('en-GB')} to ${new Date(leave.toDate).toLocaleDateString('en-GB')}`}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Box>

      </Container>
    </>
  );
};

export default NotApproved;
