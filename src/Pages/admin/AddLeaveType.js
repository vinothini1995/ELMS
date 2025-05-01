import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "./Layout";
import axios from "axios";

const AddLeaveType = () => {
  const [leaveType, setLeaveType] = useState({
    leaveType: "",
    description: "",
    createdDate: "",
  });
  const [error, setError] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const validateForm = () => {
    const newErrors = {};
    if (!leaveType.leaveType.trim()) newErrors.leaveType = "Leave Type is required";
    if (!leaveType.description.trim()) newErrors.description = "Description is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setLeaveType({ ...leaveType, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
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

      setSuccessMessage(response.data.message || "Leave Type added successfully");
      setTimeout(() => {
        setSuccessMessage("");
      }, 2000);
      setLeaveType({
        leaveType: "",
        description: "",
        createdDate: "",
      });
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
      <Box
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
          ml: { sm: "250px", xs: 0 },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#3f51b5",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Add Leave Type
        </Typography>

        {successMessage && (
          <Typography color="success.main" sx={{ mt: 1, textAlign: "center" }}>
            {successMessage}
          </Typography>
        )}
        {error.server && (
          <Typography color="error.main" sx={{ mt: 1, textAlign: "center" }}>
            {error.server}
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 3,
              width: "100%",
              maxWidth: { xs: "100%", sm: 500 },
              mx: "auto",
            }}
          >
            <form onSubmit={handleSubmit}>
              <TextField
                label="Leave Type"
                variant="outlined"
                fullWidth
                name="leaveType"
                required
                value={leaveType.leaveType}
                onChange={handleChange}
                error={!!error.leaveType}
                helperText={error.leaveType}
                sx={{ mb: 2 }}
              />

              <TextField
                label="Description"
                variant="outlined"
                fullWidth
                name="description"
                required
                multiline
                rows={3}
                value={leaveType.description}
                onChange={handleChange}
                error={!!error.description}
                helperText={error.description}
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Add Leave Type"}
              </Button>
            </form>
          </Paper>
        </Box>
      </Box>
    </>
  );
};

export default AddLeaveType;
