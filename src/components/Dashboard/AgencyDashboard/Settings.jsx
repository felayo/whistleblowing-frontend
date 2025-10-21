import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const AgencySettings = () => {
  const [formData, setFormData] = useState({
    firstName: "Coker",
    lastName: "Smith",
    agency: "LASAA",
    email: "",
    phone: "",
    oldPassword: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // TODO: connect with API
  };
  return (
    <Box sx={{ p: 4 }}>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 1,
          p: 4,
          border: "1px solid #e0e0e0",
        }}>
        {/* Profile Picture Upload */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: "grey.500",
              fontSize: 24,
              mr: 2,
            }}>
            {formData.firstName[0]}
            {formData.lastName[0]}
          </Avatar>
          <IconButton color="primary" component="label">
            <PhotoCamera />
            <input hidden accept="image/*" type="file" />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Form Fields */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Agency"
                name="agency"
                fullWidth
                value={formData.agency}
                onChange={handleChange}
                disabled
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Phone"
                name="phone"
                type="tel"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Old Password"
                name="oldPassword"
                type="password"
                fullWidth
                value={formData.oldPassword}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="New Password"
                name="newPassword"
                type="password"
                fullWidth
                value={formData.newPassword}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Save Button */}
          <Box textAlign="center" mt={4}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#f57c00",
                px: 5,
                py: 1,
                borderRadius: 2,
                "&:hover": { backgroundColor: "#ef6c00" },
              }}>
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AgencySettings;
