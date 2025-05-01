import React,{useState,useEffect} from 'react';

import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,

  Divider,
} from '@mui/material';
import Layout from './Layout';
import axios from 'axios';

const NotApprovedDetails = () => {
  
  // Sample data (replace with real data from location.state)
  const { id } = useParams();
  
  const [leaveData, setLeaveData] = useState(null);
  useEffect(() => {
    const fetchLeaveDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/pendingleaves/leave/details/${id}`);
        setLeaveData(res.data);
      } catch (err) {
        console.error("Error fetching leave details:", err);
      }
    };

    if (id) fetchLeaveDetails();
  }, [id]);
  return (
    <>
      <Layout />
      <Container maxWidth="md" sx={{ mt: 6, ml: { md: '250px', xs: '0' } }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Leave Request Details
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {
  leaveData && (
    <Grid container spacing={3}>
      {/* Left Column */}
      <Grid item xs={12} sm={6}>
        <DetailItem label="Employee Name" value={leaveData.name} />
        <DetailItem label="Emp Code" value={leaveData.emp_code} />
        <DetailItem label="Email" value={leaveData.email} />
        <DetailItem label="Gender" value={leaveData.gender} />
        <DetailItem label="Contact No" value={leaveData.contact} />
      </Grid>

      {/* Right Column */}
      <Grid item xs={12} sm={6}>
        <DetailItem label="Leave Type" value={leaveData.leaveType} />
        <DetailItem label="Leave Date" value={`${new Date(leaveData.fromDate).toLocaleDateString("en-GB")} TO ${new Date(leaveData.toDate).toLocaleDateString("en-GB")}`} />
        <DetailItem label="Posting Date" value={new Date(leaveData.postingDate).toLocaleDateString("en-GB")} />
        <DetailItem label="Admin Remark" value={leaveData.adminRemark || 'N/A'} />
        <DetailItem label="Status" value={leaveData.status || 'Pending'} />

      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
          Leave Description:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          {leaveData.description}
        </Typography>
      </Grid>

    </Grid>
  )
}

 </Paper>
      </Container>
    </>
  );
};

// Reusable field component
const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="subtitle2" sx={{ fontWeight: 500, color: 'text.secondary' }}>
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);

export default NotApprovedDetails;
