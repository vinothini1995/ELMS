import React, { useState, useContext } from "react";
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
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, useTheme } from "@mui/system";
import { EmployeeContext } from "./employee/EmployeeContext";

// Styled Components
const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 400,
  margin: "auto",
  textAlign: "center",
  borderRadius: 10,
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
}));

const LoginButton = styled(Button)({
  backgroundColor: "#3f51b5",
  color: "#fff",
  fontWeight: "bold",
  padding: "12px 0",
  fontSize: "1rem",
  "&:hover": {
    backgroundColor: "#303f9f",
  },
});

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(EmployeeContext);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        localStorage.setItem("role", response.data.role);

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

  const tabLabels = ["Employee Login", "Admin Login"];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navbar */}
      <AppBar position="static" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
            Employee Leave Management System
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List>
                  {tabLabels.map((label, index) => (
                    <ListItem
                      button
                      key={label}
                      onClick={() => {
                        setActiveTab(index);
                        setDrawerOpen(false);
                      }}
                    >
                      <ListItemText primary={label} />
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </>
          ) : (
            <Tabs
              value={activeTab}
              onChange={(e, newValue) => setActiveTab(newValue)}
              textColor="inherit"
              indicatorColor="secondary"
              sx={{ "& .MuiTab-root": { fontWeight: "bold", color: "#fff" } }}
            >
              {tabLabels.map((label, index) => (
                <Tab key={index} label={label} />
              ))}
            </Tabs>
          )}
        </Toolbar>
      </AppBar>

      {/* Login Form Section */}
      <Container component="main" sx={{ mt: { xs: 4, sm: 6 }, px: 2 }}>
        <FormContainer elevation={3}>
          <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
            {activeTab === 0 ? "Employee Login" : "Admin Login"}
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label={activeTab === 0 ? "Registered Email" : "Admin Email"}
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
    </Box>
  );
};

export default LoginPage;
