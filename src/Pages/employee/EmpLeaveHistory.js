import React, { useState ,useEffect} from "react";
import { 
  Box, Typography, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Paper, Container, Chip, 
} from "@mui/material";
import EmployeeLayout from "./EmployeeLayout";
import axios from "axios";
import { useContext } from "react";
import { EmployeeContext } from "./EmployeeContext";
const EmpLeaveHistory = () => {
  const { profile } = useContext(EmployeeContext);

  // Sample Leave History Data
  // const leaveHistory = [
  //   {
  //     id: 1,
  //     leaveType: "Sick Leave",
  //     from: "2024-03-01",
  //     to: "2024-03-03",
  //     description: "Fever and cold",
  //     postingDate: "2024-02-28",
  //     adminRemark: "Approved",
  //     status: "Approved",
  //   },
  //   {
  //     id: 2,
  //     leaveType: "Casual Leave",
  //     from: "2024-03-10",
  //     to: "2024-03-12",
  //     description: "Personal work",
  //     postingDate: "2024-03-05",
  //     adminRemark: "Pending Review",
  //     status: "Pending",
  //   },
  //   {
  //     id: 3,
  //     leaveType: "Annual Leave",
  //     from: "2024-04-15",
  //     to: "2024-04-20",
  //     description: "Vacation trip",
  //     postingDate: "2024-04-10",
  //     adminRemark: "Rejected due to workload",
  //     status: "Rejected",
  //   },
  // ];
const[leave,setLeave]=useState([])
  // Function to render status with colors
  const getStatusChip = (status) => {
    switch (status) {
      case "Approved":
        return <Chip label="Approved" color="success" />;
      case "Pending":
        return <Chip label="Pending" color="warning" />;
      case "Not Approved":
        return <Chip label="Not Approved" color="error" />;
      default:
        return <Chip label="Unknown" />;
    }
  };
  useEffect(() => {
    const fetchEmployeeLeave = async () => {
      if (profile?.emp_code) {
        try {
          const response = await axios.get(`http://localhost:5000/api/employeeleave/leave/${profile.emp_code}`);
          setLeave(response.data);
        } catch (err) {
          console.error("Error fetching leave history", err);
        }
      }
    };
  
    fetchEmployeeLeave();
  }, [profile.emp_code]);
  
  return (
    <>
      <EmployeeLayout />
            <Container maxWidth="md" sx={{ mt: 6, ml: { md: '250px', xs: '0' } }}>
      
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
            Leave History
          </Typography>


        {/* <Box sx={{ overflowX: "auto" }}> */}
        <TableContainer component={Paper} >
        <Table  >     
             <TableHead>
          <TableRow>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>S.No</TableCell>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>Type of Leave</TableCell>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>From</TableCell>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>To</TableCell>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>Description</TableCell>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>Posting Date</TableCell>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>Admin Remark</TableCell>
            <TableCell style={{color:'black',fontSize:'16px',fontWeight:'bold'}}>Status</TableCell>
          </TableRow>
        </TableHead>
            <TableBody>
              {leave.map((leave, index) => (
                <TableRow key={leave.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>
                  <TableCell>{new Date(leave.fromDate).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>{new Date(leave.toDate).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>{leave.description}</TableCell>
                  <TableCell>{new Date(leave.postingDate).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>{leave.adminRemark || "-"}</TableCell>
                  <TableCell>{getStatusChip(leave.status || "Pending")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* </Box> */}
        </Box>

        </Container>

    </>
  );
};
export default EmpLeaveHistory;
