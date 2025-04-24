import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Paper,
} from '@mui/material';

const PendingLeaveDetails = () => {
//   const location = useLocation();
//   const leaveData = location.state?.leaveData;

  // Optional: handle case when leaveData is not available
//   if (!leaveData) {
//     return (
//       <Container>
//         <Typography variant="h6" color="error">
//           No leave data found.
//         </Typography>
//       </Container>
//     );
//   }
const leaveData=[
    "name",
     "id",
    "email",
    "gender",
   " contact",
    "leaveType",
"    fromDate",
    "toDate",
    "appliedDate",
    "status",
   " reason",
    "remark",
]

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Leave Request Details
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography><strong>Employee Name:</strong> {leaveData.name}</Typography>
            <Typography><strong>Emp ID:</strong> {leaveData.id}</Typography>
            <Typography><strong>Email:</strong> {leaveData.email}</Typography>
            <Typography><strong>Gender:</strong> {leaveData.gender || "N/A"}</Typography>
            <Typography><strong>Contact No:</strong> {leaveData.contact}</Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography><strong>Leave Type:</strong> {leaveData.leaveType}</Typography>
            <Typography><strong>Leave Date:</strong> {leaveData.fromDate} to {leaveData.toDate}</Typography>
            <Typography><strong>Posting Date:</strong> {leaveData.appliedDate}</Typography>
            <Typography><strong>Status:</strong> {leaveData.status}</Typography>
            <Typography><strong>Admin Remark:</strong> {leaveData.remark || "N/A"}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography><strong>Leave Description:</strong> {leaveData.reason}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Take Action
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default PendingLeaveDetails;
