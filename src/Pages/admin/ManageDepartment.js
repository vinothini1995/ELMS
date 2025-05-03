import React, { useState, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "./Layout";
import axios from "axios";

const ManageDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [editDept, setEditDept] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);


  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/dept/departments");
        setDepartments(response.data);
      } catch (err) {
        console.error("Error fetching departments", err);
      }
    };

    fetchDepartments();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/dept/department/${deleteId}`);
      setDepartments(departments.filter((dept) => dept.id !== deleteId));
      setOpenDeleteDialog(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleEditOpen = (dept) => {
    setEditDept({ ...dept });
    setOpenEditModal(true);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
    setEditDept(null);
  };

  const handleEditChange = (e) => {
    setEditDept({ ...editDept, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/dept/department/${editDept.id}`, editDept);
      setDepartments((prev) =>
        prev.map((dept) => (dept.id === editDept.id ? editDept : dept))
      );
      handleEditClose();
    } catch (err) {
      console.error("Update failed:", err);
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
          ml: { sm: "250px" }, // Sidebar space only on larger screens
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
          Manage Departments
        </Typography>

        <TableContainer
          component={Paper}
          sx={{
            overflowX: "auto", // allows horizontal scroll on small screens
            maxWidth: "100%",
          }}
        >
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department Code</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Department Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Short Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((dept, index) => (
                <TableRow key={dept.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{dept.code}</TableCell>
                  <TableCell>{dept.name}</TableCell>
                  <TableCell>{dept.shortName}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <IconButton onClick={() => handleEditOpen(dept)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteClick(dept.id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
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

      {/* Edit Department Modal */}
      <Dialog open={openEditModal} onClose={handleEditClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Department Code"
            name="code"
            value={editDept?.code || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Department Name"
            name="name"
            value={editDept?.name || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Short Name"
            name="shortName"
            value={editDept?.shortName || ""}
            onChange={handleEditChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageDepartment;
