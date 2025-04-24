import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import axios from "axios"; // Import axios

const UserRegistration = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
    role: "employee", // Default role is employee
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Validate form before submitting
  const validateForm = () => {
    let newErrors = {};
    
    if (!user.name.trim()) newErrors.lastName = " Name is required";
    if (!user.email.includes("@")) newErrors.email = "Enter a valid email";
    if (user.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (!user.mobile.match(/^\d{10}$/)) newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!user.address.trim()) newErrors.address = "Address is required";
    if (!user.role) newErrors.role = "Role selection is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/register", user);
        setSuccessMessage("Registration Successful!");
        setUser({ 
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          address: "",
          role: "employee"});

        setErrors({});
        // ✅ Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
        console.log(response.data);
      } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        setErrors({ server: error.response?.data?.message || "Server error, please try again." });
      }
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <Paper sx={{ padding: 3, maxWidth: 500, width: "100%" }} elevation={3}>
        <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
          User Registration
        </Typography>
        {successMessage && <Typography color="success">{successMessage}</Typography>}
        
        {errors.server && <Typography color="error">{errors.server}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
          

            <Grid item xs={12}>
              <TextField
                label=" Name"
                name="name"
                value={user.name}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={user.password}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>

          

            <Grid item xs={12}>
              <TextField
                label="Mobile Number"
                name="mobile"
                type="tel"
                value={user.mobile}
                onChange={handleChange}
                fullWidth
                required
                error={!!errors.mobile}
                helperText={errors.mobile}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Address"
                name="address"
                value={user.address}
                onChange={handleChange}
                fullWidth
                required
                multiline
                rows={2}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>

            {/* Role Selection */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
              {errors.role && <Typography color="error">{errors.role}</Typography>}
            </Grid>

            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Button variant="contained" color="primary" type="submit">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UserRegistration;
