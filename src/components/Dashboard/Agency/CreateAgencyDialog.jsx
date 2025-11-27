import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAdminData } from "../../../context/AdminDataContext";

const CreateAgencyDialog = ({ open, onClose }) => {
  const axiosPrivate = useAxiosPrivate();
  const { refreshAgencies } = useAdminData();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    phone: "",
    email: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const res = await axiosPrivate.post("/admin/agencies", formData);

      if (res.data?.success) {
        refreshAgencies(); // Refresh the list
        onClose(); // Close the dialog
        setFormData({ name: "", description: "", phone: "", email: "" });
      }
    } catch (error) {
      console.error("❌ Error creating agency:", error);
      alert(error.response?.data?.message || "Failed to create agency");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold" }}>Create Agency</DialogTitle>

      <DialogContent>

        {/* Agency Name */}
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>Agency Name</Typography>
          <TextField
            name="name"
            fullWidth
            variant="outlined"
            placeholder="Enter agency name"
            value={formData.name}
            onChange={handleChange}
          />
        </Box>

        {/* Description */}
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            Description
          </Typography>
          <TextField
            name="description"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Enter agency description"
            value={formData.description}
            onChange={handleChange}
          />
        </Box>

        {/* Phone */}
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>Phone</Typography>
          <TextField
            name="phone"
            fullWidth
            variant="outlined"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
          />
        </Box>

        {/* Email */}
        <Box sx={{ mt: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>Email</Typography>
          <TextField
            name="email"
            fullWidth
            variant="outlined"
            placeholder="Enter agency email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>

      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        {/* Cancel Button */}
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          sx={{ textTransform: "none" }}
          disabled={submitting}
        >
          ❌ Cancel
        </Button>

        {/* Create Button */}
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ff8c00",
            textTransform: "none",
            "&:hover": { backgroundColor: "#e67a00" },
          }}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <CircularProgress size={22} sx={{ color: "white" }} />
          ) : (
            "Create"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateAgencyDialog;
