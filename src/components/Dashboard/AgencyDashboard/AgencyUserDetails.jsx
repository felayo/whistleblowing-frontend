import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAgencyReport } from "../../../context/AgencyReportContext";
import { axiosPrivate } from "../../../api/axios";

const AgencyUserDetails = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const { user, fetchUser, loading, error } = useAgencyReport();
    console.log("Fetched user in AgencyUserDetails:", user);

  // -----------------------------------
  // FORM STATE
  // -----------------------------------
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    active: "",
  });

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Trigger Snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  // Handle input change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Load form when user is fetched
  useEffect(() => {
    if (user) {
      setForm({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        active: user.active ? "active" : "inactive",
      });
    }
  }, [user]);

  // Fetch user on mount
  useEffect(() => {
    if (userId) fetchUser(userId);
  }, [userId]);


  // -----------------------------------
  // SAVE USER UPDATE
  // -----------------------------------
  const handleSave = async () => {
    try {
      const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        username: form.username,
        email: form.email,
        phone: form.phone,
        role: form.role,
        active: form.active === "active",
      };

      await axiosPrivate.put(`/admin/users/${userId}`, payload);

      showSnackbar("User updated successfully");

      fetchUser(userId);
    } catch (err) {
      console.error("Update error:", err);
      showSnackbar("Failed to update user", "error");
    }
  };

  // -----------------------------------
  // UI STATES
  // -----------------------------------
  if (loading || !user) {
    return (
      <Box p={4} display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={4}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {user.firstname} {user.lastname}
      </Typography>

      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          p: 4,
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Avatar */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
          <Avatar
            sx={{
              bgcolor: "#ff8c00",
              width: 80,
              height: 80,
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {user.firstname?.charAt(0)}
            {user.lastname?.charAt(0)}
          </Avatar>
        </Box>

        {/* First & Last Name */}
        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
          <TextField
            label="First Name"
            name="firstname"
            value={form.firstname}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Last Name"
            name="lastname"
            value={form.lastname}
            onChange={handleChange}
            fullWidth
          />
        </Box>

        {/* Username */}
        <TextField
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Agency (disabled) */}
        <TextField
          label="Agency"
          fullWidth
          value={user.agency?.name || ""}
          disabled
          sx={{ mb: 3 }}
        />

        {/* Email */}
        <TextField
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Phone */}
        <TextField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Role */}
        <TextField
          label="Role"
          select
          name="role"
          value={form.role}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="agency">Agency</MenuItem>
          <MenuItem value="editor">Editor</MenuItem>
        </TextField>

        {/* Active Status */}
        <TextField
          label="Active Status"
          select
          name="active"
          value={form.active}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 4 }}
        >
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        {/* ACTION BUTTONS */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => alert("You are not permitted to perform this action, contact Administrator")}
          >
            Delete
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "#ff8c00", px: 4 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Box>

      {/* SUCCESS SNACKBAR */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AgencyUserDetails;
