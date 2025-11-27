import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Snackbar,
  Alert
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RestoreIcon from "@mui/icons-material/Restore";
import AddIcon from "@mui/icons-material/Add";

import CreateCategoryDialog from "./CreateCategoryDialog";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Category = () => {
  const axiosPrivate = useAxiosPrivate();

  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Fetch all categories
  const loadCategories = async () => {
    try {
      const res = await axiosPrivate.get("/admin/categories");
      if (res.data) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error("❌ Failed to load categories", err);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Soft delete category
  const handleDelete = async (id) => {
    try {
      const res = await axiosPrivate.delete(`/admin/categories/${id}?soft=true`);

      if (res.data.success) {
        setSnackbar({
          open: true,
          message: "Category deleted (soft delete)",
          severity: "success"
        });
        loadCategories();
      }
    } catch (err) {
      console.error("❌ Error deleting category", err);
      setSnackbar({
        open: true,
        message: "Failed to delete",
        severity: "error"
      });
    }
  };

  // Restore category
  const handleRestore = async (id) => {
    try {
      const res = await axiosPrivate.put(`/admin/categories/${id}/restore`);

      if (res.data.success) {
        setSnackbar({
          open: true,
          message: "Category restored",
          severity: "success"
        });
        loadCategories();
      }
    } catch (err) {
      console.error("❌ Restore error", err);
      setSnackbar({
        open: true,
        message: "Restore failed",
        severity: "error"
      });
    }
  };

  return (
    <Box>
      {/* HEADER */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          pl: 2
        }}
      >
        <Typography variant="h5" fontWeight="bold" pb={3} pt={3}>
          Categories
        </Typography>

        <Button
          disableElevation
          variant="contained"
          color="inherit"
          onClick={handleOpen}
          startIcon={<AddIcon />}
          sx={{
            py: 1,
            fontWeight: "bold",
            backgroundColor: "#f6f6f6",
            textTransform: "none"
          }}
        >
          Create
        </Button>
      </Box>

      {/* CREATE DIALOG */}
      <CreateCategoryDialog
        open={open}
        onClose={handleClose}
        reload={loadCategories}
      />

      {/* TABLE */}
      <Box sx={{ bgcolor: "white", borderRadius: 1, p: 4, m: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Category Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {categories.map((cat, i) => (
              <TableRow key={cat._id}>
                <TableCell>{i + 1}</TableCell>

                <TableCell>{cat.name}</TableCell>

                <TableCell>
                  {cat.deleted ? (
                    <Chip label="Deleted" color="error" size="small" />
                  ) : (
                    <Chip label="Active" color="success" size="small" />
                  )}
                </TableCell>

                <TableCell>
                  {!cat.deleted ? (
                    <IconButton color="error" onClick={() => handleDelete(cat._id)}>
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <IconButton color="primary" onClick={() => handleRestore(cat._id)}>
                      <RestoreIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      {/* SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Category;
