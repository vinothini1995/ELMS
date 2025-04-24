import React, { useState } from "react";

import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel, Paper, Grid, Container } from "@mui/material";
import Layout from "./Layout";
import axios from "axios";
const AddEmployees = () => {
  const [employee, setEmployee] = useState({
    emp_code: "",
    name:"",
    gender: "",
    department: "",
    email: "",
    contact: "",
    birthDate: "",
    password: "",
    city: "",
    country: "",
    address: "",
    registeredDate:"",
  });
const[error,setError]=useState({});
const[successMessage,setSuccessMessage]=useState("");
const[isSubmitting,setIsSubmitting]=useState(false);
  const departments = ["IT", "HR", "Finance", "Marketing", "Operations"];
  const genders = ["Male", "Female", "Other"];
const validateForm=()=>{
  const newErrors = {};
if(!employee.emp_code.trim())newErrors.emp_code="employee code is required";
if(!employee.name.trim())newErrors.name="Name  is required";
if(!employee.gender.trim())newErrors.gender="gender is required";
if(!employee.department.trim())newErrors.department="department is required";
if(!employee.email.trim())newErrors.email="email is required";
if(!employee.contact.trim())newErrors.contact="contact is required";
if (!/^\S+@\S+\.\S+$/.test(employee.email)) newErrors.email = "Invalid email format";
if (!/^\d{10}$/.test(employee.contact)) newErrors.contact = "Contact must be 10 digits";
if(!employee.birthDate.trim())newErrors.birthDate="birthdate is required";
if(!employee.password.trim())newErrors.password="password is required";
if(!employee.city.trim())newErrors.city="city is required";
if(!employee.country.trim())newErrors.country="country is required";
if(!employee.address.trim())newErrors.address="address is required";
setError(newErrors);
return Object.keys(newErrors).length === 0;
}
  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const response = await axios.post("http://localhost:5000/api/emp/employee", employee, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage(response.data.message || "Employee added successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      setEmployee({   emp_code: "",
        name: "",
        gender: "",
        department: "",
        email: "",
        contact: "",
        birthDate: "",
        password: "",
        city: "",
        country: "",
        address: ""}); // Clear form
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
      <Layout />
      <Container maxWidth="md">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 ,ml:10}}>
          <Paper sx={{ p: 4, width: "100%" }}>
            <Typography variant="h5" sx={{ mb: 3, textAlign: "center", fontWeight: "bold", color: "#3f51b5" }}>
              Add Employee
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

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Employee Code */}
                <Grid item xs={12}>
                  <TextField fullWidth label="Employee Code" name="emp_code" value={employee.emp_code}  error={!!error.emp_code}
              helperText={error.emp_code} onChange={handleChange} required />
                </Grid>

                <Grid item xs={12}>
                  <TextField fullWidth label="Employee Name" name="name"  error={!!error.name}
              helperText={error.name} value={employee.name} onChange={handleChange} required />
                </Grid>

                {/* Gender & Department */}
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Gender</InputLabel>
                    <Select name="gender" value={employee.gender}  error={!!error.gender}
              helperText={error.gender} onChange={handleChange}>
                      {genders.map((gender, index) => (
                        <MenuItem key={index} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth required>
                    <InputLabel>Department</InputLabel>
                    <Select name="department" value={employee.department}  error={!!error.department}
              helperText={error.department} onChange={handleChange}>
                      {departments.map((dept, index) => (
                        <MenuItem key={index} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {/* Email */}
                <Grid item xs={12}>
                  <TextField fullWidth type="email" label="Email" name="email"  error={!!error.email}
              helperText={error.email} value={employee.email} onChange={handleChange} required />
                </Grid>

                {/* Contact Number */}
                <Grid item xs={12}>
                  <TextField fullWidth type="tel" label="Contact Number" name="contact"  error={!!error.contact}
              helperText={error.contact} value={employee.contact} onChange={handleChange} required />
                </Grid>

                {/* Birthdate */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Birth Date"
                    name="birthDate"
                    error={!!error.birthDate}
                    helperText={error.birthDate}
                    InputLabelProps={{ shrink: true }}
                    value={employee.birthDate}
                    onChange={handleChange}
                    required
                  />
                </Grid>

                {/* Password & Confirm Password */}
                <Grid item xs={12} >
                  <TextField fullWidth type="password" label="Password" name="password" value={employee.password} onChange={handleChange} required />
                </Grid>
              

                {/* City & Country */}
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="City" name="city"  error={!!error.city}
              helperText={error.city} value={employee.city} onChange={handleChange} required />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label="Country" name="country"  error={!!error.country}
              helperText={error.country} value={employee.country} onChange={handleChange} required />
                </Grid>

                {/* Address */}
                <Grid item xs={12}>
                  <TextField fullWidth multiline rows={3} label="Address" name="address"  error={!!error.address}
              helperText={error.address} value={employee.address} onChange={handleChange} required />
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12}>
                  <Button type="submit" variant="contained" color="primary" fullWidth disabled={isSubmitting}
                  >
              {isSubmitting ? "Submitting..." : "Add Employee"}
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

export default AddEmployees;
