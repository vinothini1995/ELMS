import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import Layout from "./Layout";
import axios from "axios"; // ⬅️ Import axios

const AddLeaveType = () => {
  const [leaveType, setLeaveType] = useState({
      leaveType:"",
      description:"",
      createdDate:"",
  });
   const [error, setError] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  const validateForm = () => {
    const newErrors = {};
    if (!leaveType.leaveType.trim()) newErrors.leaveType = "LeaveType  is required";
    if (!leaveType.description.trim()) newErrors.description = "Description is required";
    // if (!department.shortName.trim()) newErrors.shortName = "Short Name is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleChange = (e) => {
    setLeaveType({ ...leaveType, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" }); // Clear field error on change
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      setSuccessMessage("");

      const response = await axios.post("http://localhost:5000/api/leave/leavetype", leaveType, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage(response.data.message || "LeaveType added successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      setLeaveType({ leaveType:"",
        description:"",
        createdDate:"",}); // Clear form
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
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#3f51b5" }}>
          Add Leave Type
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

        <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
          <form onSubmit={handleSubmit}>
            {/* Leave Type Input */}
            <TextField
              label="Leave Type"
              variant="outlined"
              fullWidth
              name="leaveType" // <-- Add this
              required
              value={leaveType.leaveType}
              onChange={handleChange}
              error={!!error.leaveType}
              helperText={error.leaveType}
              sx={{ mb: 2 }}
            />

            {/* Description Input */}
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description" // <-- Add this

              required
              multiline
              rows={3}
              error={!!error.description}
              helperText={error.description}
             value={ leaveType.description}
              onChange={handleChange}
              sx={{ mb: 2 }}
            />

            {/* Submit Button */}
            <Button type="submit" variant="contained"               disabled={isSubmitting}
 color="primary" fullWidth>
              {isSubmitting ? "Submitting..." : "Add leaveType"}
              </Button>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddLeaveType;
