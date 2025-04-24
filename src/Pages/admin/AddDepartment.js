import React, { useState } from "react";
import { TextField, Button, Typography, Box, Paper } from "@mui/material";
import Layout from "./Layout";
import axios from "axios";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    code: "",
    name: "",
    shortName: "",
  });

  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!department.code.trim()) newErrors.code = "Department Code is required";
    if (!department.name.trim()) newErrors.name = "Department Name is required";
    if (!department.shortName.trim()) newErrors.shortName = "Short Name is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setDepartment({ ...department, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" }); // Clear field error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const response = await axios.post("http://localhost:5000/api/dept/department", department, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage(response.data.message || "Department added successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);
      setDepartment({ code: "", name: "", shortName: "" }); // Clear form
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
      <Box sx={{ flexGrow: 1, p: 3, ml: "250px" }}>
        <Typography variant="h5" sx={{ fontWeight: "bold", color: "#3f51b5" }}>
          Add Department
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

        <Paper sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 3, boxShadow: 3 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Department Code"
              name="code"
              value={department.code}
              onChange={handleChange}
              error={!!error.code}
              helperText={error.code}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Department Name"
              name="name"
              value={department.name}
              onChange={handleChange}
              error={!!error.name}
              helperText={error.name}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Short Name"
              name="shortName"
              value={department.shortName}
              onChange={handleChange}
              error={!!error.shortName}
              helperText={error.shortName}
              sx={{ mb: 2 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add Department"}
            </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};
export default AddDepartment;
