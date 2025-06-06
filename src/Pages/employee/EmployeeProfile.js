import React, {useContext } from "react";
import { 
  Box, Typography, TextField, Button, MenuItem, Grid, Paper, Container 
} from "@mui/material";
import EmployeeLayout from "./EmployeeLayout";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { EmployeeContext } from "./EmployeeContext";
const EmployeeProfile = () => {
  // State for form fields
  const { profile, setProfile, fetchProfile } = useContext(EmployeeContext);


  // Handle form input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const empId = decoded.id;
  
    axios.put(`http://localhost:5000/api/emp/employee/${empId}`, profile)
      .then(() => {
        alert("Profile Updated Successfully!");
        fetchProfile(); // Refresh profile in context
      })
      .catch(err => {
        console.error("Failed to update profile", err);
        alert("Something went wrong while updating.");
      });
  };
  
  

  return (
    <>
      <EmployeeLayout />
      <Container maxWidth="md" sx={{ mt: 6, ml: { md: '250px', xs: '0' } }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
            Update Your Profile
          </Typography>

          <Paper sx={{ p: 4, width: "100%" }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Employee Code (Read-only) */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Employee Code"
                    name="emp_code"
                    value={profile.emp_code}
                    InputProps={{ readOnly: true }}
                    sx={{ mb: 2 }}

                  />
                </Grid>

                {/* First Name & Last Name */}
                <Grid item xs={12} >
                  <TextField
                    fullWidth
                    label="Employee Name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}

                  />
                </Grid>
            

                {/* Gender */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Gender"
                    name="gender"
                    value={profile.gender}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}

                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid>

                {/* Date of Birth */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Date of Birth"
                    name="birthDate"
                    value={profile.birthDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                    sx={{ mb: 2 }}

                  />
                </Grid>

                {/* Email & Contact No */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}

                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact No"
                    type="tel"
                    name="contact"
                    value={profile.contact}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}

                  />
                </Grid>

                {/* City & Country */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={profile.city}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}

                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Country"
                    name="country"
                    value={profile.country}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}

                  />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    required
                    sx={{ mb: 2 }}

                  />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button variant="contained" color="primary" type="submit">
                    Update Profile
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

export default EmployeeProfile;
