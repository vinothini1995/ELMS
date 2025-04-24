import React, { useState,useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box, Chip ,Dialog, DialogTitle, DialogContent,
  DialogActions, Button,TextField,MenuItem
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "./Layout";
import axios from "axios";

const ManageEmployees = () => {
  // Sample Employee Data
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const departments = ["IT", "HR", "Finance", "Marketing", "Operations"];
  const genders = ["Male", "Female", "Other"];

   useEffect(() => {
      const fetchEmployee = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/emp/employees"); // Create this GET endpoint
          console.log("Fetched Employees:", response.data); // 👈 check if each employee has an `id`

          setEmployees(response.data);
        } catch (err) {
          console.error("Error fetching employees", err);
        }
      };
  
      fetchEmployee();
    }, []);
  // Handle delete action

 const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/emp/employee/${deleteId}`);
      setEmployees(employees.filter((emp) => emp.id !== deleteId));
      setOpenDeleteDialog(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };
  const handleEditOpen = (emp) => {
    console.log("Edit modal opened for:", emp);
    setEditEmployee(emp); // `emp` must include `id`
    setOpenEditModal(true);
  };
  
  const handleEditClose = () => {
    setOpenEditModal(false);
    setEditEmployee(null);
  };

  const handleEditChange = (e) => {
    setEditEmployee({ ...editEmployee, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Format birthDate properly
      const formattedEmployee = {
        ...editEmployee,
        birthDate: editEmployee.birthDate.split('T')[0] // Keep only date part
      };
  
      const response = await axios.put(
        `http://localhost:5000/api/emp/employee/${editEmployee.id}`,
        formattedEmployee
      );
      
      console.log("Update successful:", response.data);
      setEmployees(prev => 
        prev.map(emp => emp.id === editEmployee.id ? formattedEmployee : emp)
      );
      handleEditClose();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert(`Update failed: ${err.response?.data?.error || err.message}`);
    }
  };

  return (
    <>
      <Layout />
      <Box sx={{ flexGrow: 1, p: 3, ml: "250px" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", color: "#3f51b5" }}>
          Manage Employees
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            {/* Table Header */}
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Employee Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Employee Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Registered Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            {/* Table Body */}
            <TableBody>
              {employees.map((emp, index) => (
                <TableRow key={emp.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{emp.emp_code}</TableCell>
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Chip
                      label={emp.status}
                      color={emp.status === "Active" ? "success" : "error"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
  {new Date(emp.registeredDate).toLocaleDateString("en-GB")}
</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleEditOpen(emp)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(emp.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>


      <Dialog
        open={openDeleteDialog}
        onClose={handleCancelDelete}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this department?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

        {/* ✨ Edit Modal */}
            <Dialog open={openEditModal} onClose={handleEditClose}>
              <DialogTitle>Edit Employee</DialogTitle>
              <DialogContent>
                <TextField
                  margin="dense"
                  label="Employee Id"
                  name="emp_code"
                  value={editEmployee?.emp_code|| ""}
                  onChange={handleEditChange}
                  fullWidth
                />
                <TextField
                  margin="dense"
                  label="Employee Name"
                  name="name"
                  value={editEmployee?.name || ""}
                  onChange={handleEditChange}
                  fullWidth
                />
                <TextField
                  select
                  margin="dense"
                  label="Gender"
                  name="gender"
                  value={editEmployee?.gender || ""}
                  onChange={handleEditChange}
                  fullWidth
                >
                {genders.map((gender)=>(
                  <MenuItem key={gender} value={gender}>
                    {gender}
                  </MenuItem>
                ))}
                </TextField>

                 <TextField
  select
  margin="dense"
  label="Department"
  name="department"
  value={editEmployee?.department || ""}
  onChange={handleEditChange}
  fullWidth
>
  {departments.map((dept) => (
    <MenuItem key={dept} value={dept}>
      {dept}
    </MenuItem>
  ))}
</TextField>
                 <TextField
                  margin="dense"
                  label="Email"
                  name="email"
                  value={editEmployee?.email || ""}
                  onChange={handleEditChange}
                  fullWidth
                />
                 <TextField
                  margin="dense"
                  label="Contact"
                  name="contact"
                  value={editEmployee?.contact || ""}
                  onChange={handleEditChange}
                  fullWidth
                />
                 <TextField
                  margin="dense"
                  label="BirthDate"
                  name="birthDate"
                  type="date"  // Add type="date" for proper date handling
                  value={editEmployee?.birthDate ? editEmployee.birthDate.split('T')[0] : ""}
                  onChange={handleEditChange}
                  fullWidth
                />
                 <TextField
                  margin="dense"
                  label="Password"
                  name="password"
                  value={editEmployee?.password || ""}
                  onChange={handleEditChange}
                  fullWidth
                />
              
                 <TextField
                  margin="dense"
                  label="City"
                  name="city"
                  value={editEmployee?.city || ""}
                  onChange={handleEditChange}
                  fullWidth
                />
                 <TextField
                  margin="dense"
                  label="Country"
                  name="country"
                  value={editEmployee?.country || ""}
                  onChange={handleEditChange}
                  fullWidth
                />
                 <TextField
                  margin="dense"
                  label="Address"
                  name="address"
                  value={editEmployee?.address || ""}
                  onChange={handleEditChange}
                  fullWidth
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleEditClose}>Cancel</Button>
                <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
              </DialogActions>
            </Dialog>
        
    </>
  );
};

export default ManageEmployees;
