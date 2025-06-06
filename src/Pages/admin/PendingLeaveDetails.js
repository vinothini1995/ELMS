import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Modal,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Divider,
  Button,
} from '@mui/material';
import Layout from './Layout';
import axios from 'axios';

const PendingLeaveDetails = () => {
    const navigate = useNavigate();
  
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
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [adminRemark, setAdminRemark] = useState('');
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
    

  const handleSubmitAction = async () => {
    try {
      await axios.put(`http://localhost:5000/api/pendingleaves/leave/update/${id}`, {
        status: selectedStatus,
        adminRemark: adminRemark
      });
  
      setModalOpen(false);
  
      // Navigate back to pending list after action
      navigate('/PendingLeaves');
  
    } catch (err) {
      console.error("Error updating leave status:", err);
    }
  };
  

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
      <Button variant='contained' onClick={handleOpenModal}>TAKE ACTION</Button>

<Modal open={modalOpen} onClose={handleCloseModal}>
  <Box sx={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  }}>
    <Typography variant="h6" sx={{ mb: 2 }}>Update Leave Status</Typography>

    <FormControl fullWidth sx={{ mb: 2 }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={selectedStatus}
        label="Status"
        onChange={(e) => setSelectedStatus(e.target.value)}
      >
        <MenuItem value="Approved">Approved</MenuItem>
        <MenuItem value="Not Approved">Not Approved</MenuItem>
      </Select>
    </FormControl>

    <TextField
      fullWidth
      label="Admin Remark"
      multiline
      rows={3}
      value={adminRemark}
      onChange={(e) => setAdminRemark(e.target.value)}
      sx={{ mb: 2 }}
    />

    <Button variant="contained" onClick={handleSubmitAction}>
      Submit
    </Button>
  </Box>
</Modal>
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

export default PendingLeaveDetails;
