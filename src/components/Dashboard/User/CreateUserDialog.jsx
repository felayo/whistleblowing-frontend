import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useAdminData } from "../../../context/AdminDataContext";

const CreateUsersDialog = ({ open, onClose, agencies = [] }) => {
  const axiosPrivate = useAxiosPrivate();
  const { refreshUsers } = useAdminData();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    role: "",
    agency: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value !== "agency" ? { agency: "" } : {})
    }));
  };

  const resetForm = () => {
    setFormData({
      email: "",
      username: "",
      password: "",
      firstname: "",
      lastname: "",
      phone: "",
      role: "",
      agency: ""
    });
  };

  const handleSubmit = async () => {
    if (!formData.username || !formData.password || !formData.role) {
      alert("Username, password, and role are required.");
      return;
    }

    if (formData.role === "agency" && !formData.agency) {
      alert("Please select an agency.");
      return;
    }

    try {
      const res = await axiosPrivate.post("/admin/users", formData);
      console.log("✅ User created:", res.data);
      if (res.data?.success) {
        setSnackbarOpen(true);
        refreshUsers(); // refresh list
        resetForm();
        onClose();
      }
    } catch (err) {
      console.error("❌ Error creating user:", err);
      alert("Failed to create user");
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: "bold" }}>Create User</DialogTitle>

        <DialogContent dividers>

          {/* First Name */}
          <Box sx={{ mt: 1 }}>
            <Typography sx={{ fontWeight: "bold" }}>First Name</Typography>
            <TextField
              fullWidth
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="Enter first name"
            />
          </Box>

          {/* Last Name */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Last Name</Typography>
            <TextField
              fullWidth
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Enter last name"
            />
          </Box>

          {/* Username */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Username *</Typography>
            <TextField
              fullWidth
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
            />
          </Box>

          {/* Password */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Password *</Typography>
            <TextField
              fullWidth
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </Box>

          {/* Email */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Email</Typography>
            <TextField
              fullWidth
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </Box>

          {/* Phone */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Phone</Typography>
            <TextField
              fullWidth
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </Box>

          {/* Role */}
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ fontWeight: "bold" }}>Role *</Typography>
            <TextField
              select
              fullWidth
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="agency">Agency</MenuItem>
            </TextField>
          </Box>

          {/* Agency Select (Only if role = agency) */}
          {formData.role === "agency" && (
            <Box sx={{ mt: 2 }}>
              <Typography sx={{ fontWeight: "bold" }}>Agency *</Typography>
              <TextField
                select
                fullWidth
                name="agency"
                value={formData.agency}
                onChange={handleChange}
              >
                {agencies.map((ag) => (
                  <MenuItem key={ag._id} value={ag._id}>
                    {ag.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}

        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{ textTransform: "none" }}
          >
            ❌ Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#ff8c00",
              textTransform: "none",
              "&:hover": { backgroundColor: "#e67a00" },
            }}
          >
            + Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* SUCCESS SNACKBAR */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2500}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          User created successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default CreateUsersDialog;
