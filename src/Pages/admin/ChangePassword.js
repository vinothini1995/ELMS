import React, { useState } from "react";
import axios from "axios";
import { Paper, TextField, Button, Typography, Box, Alert } from "@mui/material";
import { styled } from "@mui/system";
import Layout from "./Layout";

// Styled Component for Form
const FormContainer = styled(Paper)({
  padding: "30px",
  maxWidth: "400px",
  margin: "auto",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
});

const ChangePassword = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    email: "", // Add email field to identify the user
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for messages
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Validation: Ensure new password matches confirm password
    if (formData.newPassword !== formData.confirmPassword) {
      setErrorMessage("New passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/pw/changepassword", {
        email: formData.email, // Add email to identify the user
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      setSuccessMessage(response.data.message);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
      setFormData({ email: "", oldPassword: "", newPassword: "", confirmPassword: "" });
    }
     catch (error) {
      setErrorMessage(error.response?.data?.message || "Failed to change password.");
    }
  };

  return (
    <>
      <Layout />
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <FormContainer elevation={3}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Change Password
          </Typography>

          {/* Success Message */}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          {/* Error Message */}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              type="email"
              variant="outlined"
              fullWidth
              required
              value={formData.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Enter Old Password"
              name="oldPassword"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formData.oldPassword}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Enter New Password"
              name="newPassword"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formData.newPassword}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Confirm New Password"
              name="confirmPassword"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              type="submit"
              sx={{ bgcolor: "#3f51b5", color: "#fff", fontWeight: "bold", "&:hover": { bgcolor: "#303f9f" } }}
            >
              Change Password
            </Button>
          </form>
        </FormContainer>
      </Box>
    </>
  );
};

export default ChangePassword;
