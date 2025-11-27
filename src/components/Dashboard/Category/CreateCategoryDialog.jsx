import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CreateCategoryDialog = ({ open, onClose, reload }) => {
  const axiosPrivate = useAxiosPrivate();

  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  // Snackbar
  const [successOpen, setSuccessOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      setErrorMessage("Category name is required");
      setErrorOpen(true);
      return;
    }

    try {
      setLoading(true);

      await axiosPrivate.post("/admin/categories", {
        name: categoryName.trim(),
      });

      setLoading(false);
      setSuccessOpen(true);

      // 🔥 REFRESH CATEGORY LIST IN PARENT
      if (typeof reload === "function") {
        reload();
      }
      
      setCategoryName(""); // reset form
      onClose(); // Close dialog after success
    } catch (error) {
      setLoading(false);

      setErrorMessage(
        error?.response?.data?.message || "Failed to create category"
      );
      setErrorOpen(true);
    }
  };

  return (
    <>
      {/* --- Dialog --- */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>Create Category</DialogTitle>

        <DialogContent>
          <Box>
            <Typography sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
              Category Name
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            color="inherit"
            sx={{ textTransform: "none" }}
          >
            ❌ Cancel
          </Button>

          <Button
            variant="contained"
            disabled={loading}
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#ff8c00",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e67a00" },
            }}
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* --- Success Snackbar --- */}
      <Snackbar
        open={successOpen}
        autoHideDuration={3000}
        onClose={() => setSuccessOpen(false)}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSuccessOpen(false)}
        >
          Category created successfully!
        </Alert>
      </Snackbar>

      {/* --- Error Snackbar --- */}
      <Snackbar
        open={errorOpen}
        autoHideDuration={4000}
        onClose={() => setErrorOpen(false)}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => setErrorOpen(false)}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateCategoryDialog;
