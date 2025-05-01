import React, { useState,useEffect } from "react";
import { 
  Box, Typography, TextField, Button, MenuItem, Grid, Paper, Container 
} from "@mui/material";
import EmployeeLayout from "./EmployeeLayout";
import axios from "axios";
import { useContext } from "react";
import { EmployeeContext } from "./EmployeeContext"; // adjust the path as needed


const EmpApplyLeave = () => {
  const { profile } = useContext(EmployeeContext);

  // State for form fields
  const [leave, setLeave] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    description: "",
    name: "", // <-- get it from context
    emp_code:"",
    id:"",
    
  });
  useEffect(() => {
    if (profile?.name) {
      setLeave((prev) => ({ ...prev, name: profile.name }));
    }
  }, [profile.emp_code]);
  useEffect(() => {
    if (profile?.emp_code) {
      setLeave((prev) => ({ ...prev, emp_code: profile.emp_code}));
    }
  }, [profile.name]);
  const[error,setError]=useState({});
  const[successMessage,setSuccessMessage]=useState("");
  const[isSubmitting,setIsSubmitting]=useState(false);
  const [leaveTypes, setLeaveTypes] = useState([]);
  useEffect(()=>{
    const fetchLeaveTypes=async()=>{
      try{
    const response=await axios.get("http://localhost:5000/api/leave/leavetypes");
    console.log("Fetched Leave Types:", response.data); // 👈 Add this

    setLeaveTypes(response.data);
     }
      catch(err){
    console.error("Error fetching Leavetypes",err);
    }
    }
    
      fetchLeaveTypes();
    },[]);
  const validateForm = () => {
    const errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // remove time portion
  
    const fromDate = new Date(leave.fromDate);
  
    if (!leave.fromDate || !leave.toDate || !leave.leaveType || !leave.description) {
      errors.form = "All fields are required";
    }
  
    if (leave.fromDate && fromDate < today) {
      errors.fromDate = "From Date cannot be in the past";
    }
  
    setError(errors);
  
    return Object.keys(errors).length === 0;
  };
  
  // Handle form input change
  const handleChange = (e) => {
    setLeave({ ...leave, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const response = await axios.post("http://localhost:5000/api/employeeleave/empleave", leave, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage(response.data.message || "Leave applied successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      setLeave({   fromDate: "",
        toDate: "",
        leaveType: "",
        description: ""}); // Clear form
      setError({});
    } catch (error) {
      if (error.response) {
        setError({ server: error.response.data.error || "Server error occurred" });
      } else {
        setError({ server: "Network error. Could not reach the server." });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <EmployeeLayout />
      <Container maxWidth="sm">
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Apply for Leave
          </Typography>
 {successMessage && (
          <Typography color="success.main" sx={{ mt: 1 }}>
            {successMessage}
          </Typography>
        )}
        {error.server && (
          <Typography color="error.main" sx={{ mt: 1 }}>
            {error.server}
          </Typography>
        )}
        {error.fromDate && (
  <Typography color="error" variant="body2">
    {error.fromDate}
  </Typography>
)}

          <Paper sx={{ p: 4, width: "100%", maxWidth: 500 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* From Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="From Date"
                    name="fromDate"
                    value={leave.fromDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                {/* To Date */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="To Date"
                    name="toDate"
                    value={leave.toDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>

                {/* Leave Type Dropdown */}
                <Grid item xs={12}>
                <TextField
  select
  fullWidth
  label="Leave Type"
  name="leaveType"
  value={leave.leaveType}
  onChange={handleChange}
  required
>
  {leaveTypes.map((type, index) => (
    <MenuItem key={type.id || index} value={type.leaveType}>
      {type.leaveType}
    </MenuItem>
  ))}
</TextField>


                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={leave.description}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    required
                  />
                </Grid>

                {/* Apply Button */}
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="primary" type="submit">
                    Apply Leave
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default EmpApplyLeave;
