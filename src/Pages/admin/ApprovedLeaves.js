import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
  Button,
  Chip,
  Container,
} from '@mui/material';
import Layout from '../admin/Layout';

const getStatusChip = (status) => {
  if (status === 'Approved') return <Chip label="Approved" color="success" />;
  return <Chip label={status} />;
};

const ApprovedLeaves = () => {
  const navigate = useNavigate();

  const [approvedLeaves, setApprovedLeaves] = useState([]);

  useEffect(() => {
    const fetchApprovedLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employeeleave/leave");
        const approved = response.data.filter((leave) => leave.status === 'Approved');
        setApprovedLeaves(approved);
      } catch (error) {
        console.error("Error fetching approved leaves", error);
      }
    };

    fetchApprovedLeaves();
  }, []);
  const handleViewDetails = (id) => {
    // You can pass ID or full data via state
    navigate(`/ApprovedLeaveDetails/${id}`);
  };
  return (
    <>
      <Layout />
      <Container maxWidth="xl">
        <Box  sx={{
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
            Approved Leave Requests
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
                {approvedLeaves.map((leave, index) => (
                  <TableRow key={leave.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{leave.name}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{`${new Date(leave.fromDate).toLocaleDateString('en-GB')} to ${new Date(leave.toDate).toLocaleDateString('en-GB')}`}</TableCell>
                    <TableCell>{getStatusChip(leave.status)}</TableCell>
                    <TableCell>          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => handleViewDetails(leave.id)}
          >
            View Details
          </Button></TableCell>
          
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

export default ApprovedLeaves;
