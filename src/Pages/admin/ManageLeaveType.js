import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, Box, Dialog, DialogTitle, DialogContent,
  DialogActions, Button, TextField
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "./Layout";
import axios from "axios";

const ManageLeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [editleaveTypes, setEditleaveTypes] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/leave/leavetypes");
        setLeaveTypes(response.data);
      } catch (err) {
        console.error("Error fetching Leave types", err);
      }
    };
    fetchLeaveTypes();
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/leave/leavetype/${deleteId}`);
      setLeaveTypes(leaveTypes.filter((leave) => leave.id !== deleteId));
      setOpenDeleteDialog(false);
      setDeleteId(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleEditOpen = (leave) => {
    setEditleaveTypes({ ...leave });
    setOpenEditModal(true);
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleEditClose = () => {
    setOpenEditModal(false);
    setEditleaveTypes(null);
  };

  const handleEditChange = (e) => {
    setEditleaveTypes({ ...editleaveTypes, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!editleaveTypes.leaveType || !editleaveTypes.description || !editleaveTypes.createdDate) {
      alert("All fields are required.");
      return;
    }

    const formattedLeave = {
      ...editleaveTypes,
      createdDate: editleaveTypes.createdDate.substring(0, 10),
    };

    try {
      await axios.put(
        `http://localhost:5000/api/leave/leavetype/${editleaveTypes.id}`,
        formattedLeave
      );

      setLeaveTypes((prev) =>
        prev.map((leave) =>
          leave.id === editleaveTypes.id ? formattedLeave : leave
        )
      );

      handleEditClose();
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <>
      <Layout />
      <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 }, ml: { sm: "250px", xs: 0 } }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontWeight: "bold",
            color: "#3f51b5",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Manage Leave Types
        </Typography>

        <Box sx={{ overflowX: "auto" }}>
          <TableContainer component={Paper} sx={{ minWidth: 600 }}>
            <Table>
              <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold" }}>S.No</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Leave Type</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Created Date</TableCell>
                  <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaveTypes.map((leave, index) => (
                  <TableRow key={leave.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.description}</TableCell>
                    <TableCell>
                      {new Date(leave.createdDate).toLocaleDateString("en-GB")}
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <IconButton onClick={() => handleEditOpen(leave)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(leave.id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      {/* Delete Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this leave type?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={openEditModal}
        onClose={handleEditClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Leave Type</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Leave Type"
            name="leaveType"
            value={editleaveTypes?.leaveType || ""}
            onChange={handleEditChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Leave Description"
            name="description"
            value={editleaveTypes?.description || ""}
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

export default ManageLeaveType;
