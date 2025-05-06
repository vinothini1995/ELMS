import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Container,
  Paper,

  Box,
} from "@mui/material";
import { styled } from "@mui/system";
import { EmployeeContext } from "./employee/EmployeeContext";

// Styled Components
const FormContainer = styled(Paper)({
  padding: "30px",
  maxWidth: "400px",
  margin: "auto",
  textAlign: "center",
  borderRadius: "10px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
});

const LoginButton = styled(Button)({
  backgroundColor: "#3f51b5",
  color: "#fff",
  fontWeight: "bold",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(EmployeeContext); // 👈 Add this

  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://elms-backend-f63b.onrender.com/api/auth/login", { email, password });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store JWT
        setToken(response.data.token); // ✅ Trigger useEffect in context

        localStorage.setItem("role", response.data.role); // Store user role

        // Redirect based on role
        if (response.data.role === "admin") {
          navigate("/AdminDashboard");
        } else {
          navigate("/EmployeeProfile");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

// Inside the return statement
return (
  <Box sx={{ flexGrow: 1 }}>
    {/* Navbar */}
    <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
          Employee Leave Management System
        </Typography>
        <Tabs
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ "& .MuiTab-root": { fontWeight: "bold", color: "#fff" } }}
        >
          <Tab label="Employee Login" />
          <Tab label="Admin Login" />
        </Tabs>
      </Toolbar>
    </AppBar>

    {/* Employee Login Form */}
    {activeTab === 0 && (
      <Container component="main" sx={{ mt: 6 }}>
        <FormContainer elevation={3}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Employee Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Registered Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <LoginButton type="submit" variant="contained" fullWidth>
              Login
            </LoginButton>
          </form>
        </FormContainer>
      </Container>
    )}

    {/* Admin Login Form */}
    {activeTab === 1 && (
      <Container component="main" sx={{ mt: 6 }}>
        <FormContainer elevation={3}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Admin Email"
              variant="outlined"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Admin Password"
              type="password"
              variant="outlined"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                {error}
              </Typography>
            )}
            <LoginButton type="submit" variant="contained" fullWidth>
              Login
            </LoginButton>
          </form>
        </FormContainer>
      </Container>
    )}
  </Box>
);

};

export default LoginPage;
