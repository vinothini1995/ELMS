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

// const sampleData = [
//   {
//   fromDate: "",
//   toDate: "",
//   leaveType: "",
//   description: "",
//   }
// ];

const getStatusChip = (status) => {
  switch (status) {
    case 'Pending':
      return <Chip label="Pending" color="warning" />;
    default:
      return <Chip label="Waiting for approval" />;
  }
};

const PendingLeaves = () => {
  const navigate = useNavigate();
    const[leave,setLeave]=useState([])
    
    
  const handleViewDetails = (row) => {
    // You can pass ID or full data via state
    navigate(`/PendingLeaveDetails/${row.id}`, { state: { leaveData: row } });
  };
  useEffect(() => {
    const fetchEmployeeLeave = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employeeleave/leave"); 
        setLeave(response.data);
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
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3 }}>
            Pending Leave Requests
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, p: 3, ml: "250px" }}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 900 }}>
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
              {leave.map((leave, index) => (
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
                        onClick={() => handleViewDetails(leave)}
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

export default PendingLeaves;
