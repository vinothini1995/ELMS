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
  Container,
  Chip,
  Button
} from "@mui/material";
import { useNavigate } from 'react-router-dom';

const DashboardLeave = () => {
  const navigate = useNavigate();

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

  const [allLeaves, setAllLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employeeleave/leave");
        const sortedLeaves = [
          ...response.data.filter(leave => leave.status === 'Approved'),
          ...response.data.filter(leave => leave.status === 'Not Approved'),
          ...response.data.filter(leave => leave.status === 'Pending')
        ];
        setAllLeaves(sortedLeaves);
      } catch (err) {
        console.error("Error fetching leaves", err);
      }
    };

    fetchLeaves();
  }, []);

  const handleViewDetails = (id, status) => {
    if (status === 'Approved') {
      navigate(`/ApprovedLeaveDetails/${id}`);
    } else if (status === 'Not Approved') {
      navigate(`/NotApprovedDetails/${id}`);
    } else {
      navigate(`/PendingLeaveDetails/${id}`);
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            mt: 4,
            ml: { xs: 0, md: '250px' },
            overflowX: 'auto',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              textAlign: { xs: 'center', sm: 'center', md: 'left' }
            }}
          >
            Recent Leave Details
          </Typography>

          <TableContainer component={Paper} sx={{ width: '100%', overflowX: 'auto' }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell><strong>S.No</strong></TableCell>
                  <TableCell><strong>Employee Name</strong></TableCell>
                  <TableCell><strong>Leave Type</strong></TableCell>
                  <TableCell><strong>Posting Date</strong></TableCell>
                  <TableCell><strong>Status</strong></TableCell>
                  <TableCell><strong>Action</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allLeaves.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">No Leave Records Found</TableCell>
                  </TableRow>
                ) : (
                  allLeaves.map((leave, index) => (
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
                          onClick={() => handleViewDetails(leave.id, leave.status)}
                        >
                          View
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

export default DashboardLeave;
